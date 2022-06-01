import { join } from 'path';
import { readdirSync, writeJson } from 'fs-extra';
import logger from 'consola';
import { runPromisesSequence } from '@stereorepo/sac';
import axios from 'axios';

import { getDynamicFiles } from './helpers';
import { NAMESPACE, QUERIES_DIR, CONFIG_FILES, ROUTES_DIR } from './constants';

const maxDatoEntitiesByCall = 100;

let crawlerQuery = null;
let crawlerCountEntitiesQuery = null;
let routeByApiModels = null;
let excludedDynamicRoutes = null;

async function getConfigFiles() {
    const appDir = this.options.dir.app || 'app';

    // Handle crawler query
    const userCrawlerQuery = join(this.options.srcDir, appDir, NAMESPACE, QUERIES_DIR, CONFIG_FILES.CRAWLER_QUERY);
    const userCrawlerCountEntitiesQuery = join(
        this.options.srcDir,
        appDir,
        NAMESPACE,
        QUERIES_DIR,
        CONFIG_FILES.CRAWLER_COUNT_ENTITIES_QUERY
    );

    crawlerQuery = (await getDynamicFiles(userCrawlerQuery)).default;
    crawlerCountEntitiesQuery = (await getDynamicFiles(userCrawlerCountEntitiesQuery)).default;

    // Handle routes file
    const userRouteFile = join(this.options.srcDir, appDir, NAMESPACE, ROUTES_DIR);

    const routesConfig = await getDynamicFiles(userRouteFile);

    routeByApiModels = routesConfig.routeByApiModels;
    excludedDynamicRoutes = routesConfig.excludedDynamicRoutes;
}

const routeResolver = ({ dynamicRootPageName, i18nOptions, localeCode, routeData }) => {
    // The page's _modelApiKey and slug will determine the way to resolve the page
    const { _modelApiKey, slug } = routeData;

    if (!routeByApiModels[_modelApiKey]) return null;

    // Getting the i18n config from the _modelApiKey
    const i18nPageConfig = i18nOptions.pages[routeByApiModels[_modelApiKey].i18nFormat];

    // Early return if the page doesn't possess an i18n config
    if (!i18nPageConfig) return null;

    // Early return if the page's i18n config is set to false
    const i18nPath = i18nPageConfig[localeCode];
    if (!i18nPath) return null;

    // Handling the locale in the final url
    const localePath = localeCode === i18nOptions.defaultLocale ? '' : `/${localeCode}`;

    // If an i18n config is found and the page is not matching with the dynamic root page template
    if (dynamicRootPageName !== routeByApiModels[_modelApiKey].i18nFormat) {
        // If i18nPath is false the i18n page's config is set to false a.k.a. no generation

        const slugPathIndex = i18nPath.indexOf(':');

        // With a slug
        if (slug && slugPathIndex !== -1) {
            const pathStaticPart = i18nPath.slice(0, slugPathIndex);
            return `${localePath}${pathStaticPart}${slug}`;
        }
        // Without a slug
        else if (slugPathIndex === -1) {
            return `${localePath}${i18nPath}`;
        }
    }
    // If there is a slug and no i18n config (a.k.a. dynamic root page)
    else if (slug) {
        return `${localePath}/${slug}`;
    }

    // Return nothing if there's no match at all
    return null;
};

async function routeGeneration({ routes }) {
    const modules = [...this.options.modules, ...this.options.buildModules];
    const [[, i18nModuleOptions]] = modules.filter(module => Array.isArray(module) && module[0] === 'nuxt-i18n');

    const i18nOptions = i18nModuleOptions || this.options.i18n;
    if (!i18nOptions) return;

    let blacklist = [];

    // Error handling
    if (excludedDynamicRoutes) {
        if (typeof excludedDynamicRoutes !== 'function')
            logger.error(new Error('excludedDynamicRoutes is not defined as a function'));

        blacklist = excludedDynamicRoutes();
    }

    const pagesDirPath = join(this.options.srcDir, this.options.dir.pages);

    // The pre-existing routes list (before extending routes)
    const existingRoutes = routes.map(({ route }) => route);

    const routesFilePath = join(this.nuxt.options.generate.dir, 'routes.json');

    const routesList = [];

    // Add route to routes.json
    const addRoute = async route => {
        // Adding the new route to the routes list
        routesList.push(route);
        // Writing / rewriting the routes into the json file
        await writeJson(routesFilePath, routesList).catch(err => {
            logger.error(`Writing ${route} route failed`, err);
        });
    };

    // Add each static route to static route.json file
    await runPromisesSequence({
        array: existingRoutes,
        handler: async route => {
            await addRoute(route);
        },
        delay: 5
    });

    // Getting the ~/pages directory's root dynamic page name
    const [dynamicRootPageFilename] = readdirSync(pagesDirPath).filter(file => file.indexOf('_') === 0);
    const dynamicRootPageName = dynamicRootPageFilename ? dynamicRootPageFilename.replace('.vue', '') : null;

    const localesHandler = async ({ code, iso }) => {
        // const { datoApiToken } = this.nuxt.options.privateRuntimeConfig;
        const { datoApiUrl, datoApiToken } = this.nuxt.options.publicRuntimeConfig;
        // Getting the crawler's config gql query results
        const pageCounts = await axios
            .post(
                datoApiUrl,
                {
                    query: crawlerCountEntitiesQuery,
                    variables: { lang: iso }
                },
                {
                    headers: { Authorization: `Bearer ${datoApiToken}` }
                }
            )
            .then(result => {
                return result.data.data;
            });

        const maxRequests = Object.values(pageCounts).reduce((acc, { count }) => {
            const requestsNumber = Math.ceil(count / maxDatoEntitiesByCall);
            return requestsNumber > acc ? requestsNumber : acc;
        }, 1);

        let requestsIndex = 0;
        const requests = [];
        for (requestsIndex; requestsIndex < maxRequests; requestsIndex += 1) {
            const requestResults = await axios
                .post(
                    datoApiUrl,
                    {
                        query: crawlerQuery,
                        variables: {
                            lang: iso,
                            first: maxDatoEntitiesByCall,
                            skip: requestsIndex * maxDatoEntitiesByCall
                        }
                    },
                    {
                        headers: { Authorization: `Bearer ${datoApiToken}` }
                    }
                )
                .then(({ data }) => {
                    if (data.errors) {
                        data.errors.forEach(error => {
                            logger.fatal(new Error(error.message));
                        });
                    } else {
                        return data.data;
                    }
                });

            requests.push(requestResults);
        }

        // Getting all pages api models at the same level in the same array
        const pagesResults = requests.reduce((requestsAcc, request) => {
            return [
                ...requestsAcc,
                ...Object.values(request).reduce((requestAcc, type) => {
                    if (Array.isArray(type)) {
                        requestAcc = [...requestAcc, ...type];
                    } else {
                        requestAcc = [...requestAcc, type];
                    }
                    return requestAcc;
                }, [])
            ];
        }, []);

        // Resolving pages collected with the gql query
        const routesHandler = async routeData => {
            const resolvedRoute = routeResolver({
                dynamicRootPageName,
                i18nOptions,
                localeCode: code,
                routeData
            });

            /**
             * NOTE:
             * - Do not generate the route if it is not resolved.
             * - Do not generate the route if it is already registered in the nuxt routes list.
             * - Do not generate the route if it is already registered in the global module routes list.
             */
            if (!resolvedRoute || existingRoutes.includes(resolvedRoute) || routesList.includes(resolvedRoute))
                return new Promise(resolve => resolve());

            // Check if the route is blacklisted
            if (blacklist) {
                const isBlacklisted = !!blacklist.filter(regex => resolvedRoute.match(regex)).length;
                if (isBlacklisted) return new Promise(resolve => resolve());
            }

            // Add each dynamic route to static route.json file
            await addRoute(resolvedRoute);

            // Add the route to generation list
            routes.push({
                route: resolvedRoute,
                payload: null
            });
        };

        await runPromisesSequence({
            array: pagesResults,
            handler: routesHandler,
            delay: 5
        });
    };

    // Starting to resolve routes depending on all the locales
    logger.info('Generating extended pages');
    await runPromisesSequence({
        array: i18nOptions.locales,
        handler: localesHandler,
        delay: 5
    });
}

export default async function () {
    // Syncing config files
    await getConfigFiles.call(this);

    // Hook generator to extract routes
    this.nuxt.hook('generate:before', generator => {
        // HACK: Removing pages' routes ending slash
        this.nuxt.hook('generate:page', page => {
            page.route = page.route.replace(/\/$/, '');
            return page;
        });

        // 🎣 Add hook when a page is generated
        this.nuxt.hook('generate:extendRoutes', async routes => {
            // Extending the pre-existing routes
            await routeGeneration.call(generator, {
                generator,
                routes
            });
        });
    });
}
