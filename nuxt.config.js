import Sass from 'sass';
import axios from 'axios';
import { defaultLocale, locales, getPagesList } from './config/i18n';
import { layoutQuery } from './api/dato/index';
import { getExtendedRoutes } from './api/dato/helpers/data';

import frTranslation from './locales/fr.json';
import enTranslation from './locales/en.json';

const customSass = {
    implementation: Sass
};

/*
 ** NOTE:
 ** The NODE_ENV will always be equal to 'production' when we generate
 ** the website. Thus, we don't have a dev/production env variable
 ** for the preproduction environnement.
 ** The NETLIFY_ENV variable allow us to set a dev/production variable
 ** totaly decorrelated from the NODE_ENV variable.
 ** SEE: https://www.netlify.com/docs/continuous-deployment/#environment-variables
 */
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8888;
const netlifyEnv = process.env.NETLIFY_ENV;
const websiteUrl = process.env.URL || `http://${host}:${port}`;
const isDevEnv = process.env.NETLIFY_ENV === 'development';
const previewData = netlifyEnv === 'development' || netlifyEnv === 'preview';

export default {
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    generate: {
        // To preview new pages that are not generated yet
        fallback: previewData,
        async routes(add) {
            const routes = await getExtendedRoutes().catch(add);
            add(null, routes);
        }
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'vranken-pommery-monopole',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;1,400;1,500&family=IBM+Plex+Serif:ital@0;1&display=swap'
            }
        ],
        script: [{ src: '/snipcart.js' }]
    },

    publicRuntimeConfig: {
        isDevEnv: process.env.NETLIFY_ENV === 'development',
        preview: previewData,
        // On met le token qui si on est en local (pour pas qu'il soit injecté dans le JS en prod)
        datoApiToken: previewData ? process.env.DATOCMS_API_TOKEN : '',
        datoApiUrl: process.env.GRAPHQL_ENDPOINT,
        snipcartApiKey: process.env.SNIPCART_PUBLIC_API_KEY
    },

    privateRuntimeConfig: {
        datoApiToken: process.env.DATOCMS_API_TOKEN
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/scss/main.scss'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/preview.client.js',
        '~/plugins/globals.js',
        '~/plugins/axios',
        '~/plugins/breakpoints',
        '~/plugins/stereorepo'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // '~/modules/crawler',
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/style-resources',
        '@nuxtjs/robots',
        'nuxt-i18n',
        '~/modules/slugToModelApiKey',
        '~/modules/initLayoutData'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa'
    ],

    router: {
        trailingSlash: true
    },

    styleResources: {
        scss: [
            '~/assets/scss/abstracts/_variables.scss',
            '~/assets/scss/abstracts/_animations.scss',
            '~/assets/scss/abstracts/_functions.scss',
            '~/assets/scss/abstracts/_mixins.scss',
            '~/assets/scss/abstracts/_placeholders.scss'
        ]
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.URL || 'http://localhost:8888',
        proxyHeaders: false,
        credentials: false
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'fr'
        }
    },

    i18n: {
        locales,
        defaultLocale,
        parsePages: false,
        pages: getPagesList(),
        detectBrowserLanguage: false,
        vueI18n: {
            fallbackLocale: defaultLocale,
            messages: {
                fr: frTranslation || {},
                en: enTranslation || {}
            }
        },
        baseUrl: websiteUrl,
        vuex: { syncLocale: true }
    },

    layoutData: {
        layoutQuery
    },

    robots: () => {
        return netlifyEnv === 'production'
            ? { UserAgent: '*', Disallow: ['/404'], Sitemap: `${websiteUrl}/sitemap.xml` }
            : { UserAgent: '*', Disallow: '/' };
    },

    server: {
        host: '0.0.0.0' // pour accèder au site depuis le réseau lan
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extend(config, { loaders }) {
            loaders.scss.additionalData = '@use "sass:math";';
        },
        loaders: {
            scss: customSass
        },
        /*
         ** Transpiling es6 packages
         */
        transpile: [/@stereorepo/, 'gsap']
    },
    vue: {
        config: {
            // Giving access to performances in the inspector
            devtools: process.env.NETLIFY_ENV === 'development',
            performance: process.env.NETLIFY_ENV === 'development'
        }
    }
};
