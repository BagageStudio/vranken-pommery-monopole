import path from 'path';
import fs from 'fs-extra';
import logger from 'consola';
import axios from 'axios';

import { runPromisesSequence } from '@stereorepo/sac';

// import apolloClient from '../config/apollo';
import { locales } from '../config/i18n';

const initLayoutData = function (moduleOptions) {
    this.nuxt.hook('ready', async () => {
        const { datoApiUrl } = this.nuxt.options.publicRuntimeConfig;

        const options = {
            layoutQuery: null,
            ...this.options.layoutData,
            ...moduleOptions
        };

        let allLayoutsData = {};
        const allGlobalsData = {};
        const handler = async ({ code, iso }) => {
            allGlobalsData[code] = {};
            if (options.layoutQuery) {
                const {
                    data: { data: layoutData }
                } = await axios.post(
                    datoApiUrl,
                    { query: options.layoutQuery, variables: { lang: iso } },
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`
                        }
                    }
                );
                allLayoutsData = { ...allLayoutsData, [code]: layoutData };
            } else {
                logger.info('You forgot to pass the layout data query to the initLayoutData module.');
                logger.info('See: ~/config/layout-data.js');
            }
        };

        // This function allows us to add a timeout between promises (not possible with Promise.all)
        await runPromisesSequence({ array: locales, handler });

        fs.ensureFileSync(path.join('cms', 'data', 'layout-data.json'));
        fs.ensureFileSync(path.join('cms', 'data', 'global-data.json'));
        await fs
            .writeJSON(path.join('cms', 'data', 'layout-data.json'), allLayoutsData)
            .then(() => {
                logger.success('Layout data successfully extracted');
            })
            .catch(err => {
                logger.error('Error writing layoutData file', err);
            });
        await fs
            .writeJSON(path.join('cms', 'data', 'global-data.json'), allGlobalsData)
            .then(() => {
                logger.success('Global data successfully extracted');
            })
            .catch(err => {
                logger.error('Error writing globalSeoData file', err);
            });
    });
};

export default initLayoutData;
