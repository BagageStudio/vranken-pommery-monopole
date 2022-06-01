import path from 'path';
import fs from 'fs-extra';
import logger from 'consola';
import axios from 'axios';
import query from './query';

export default function () {
    this.nuxt.hook('ready', async () => {
        const { datoApiUrl } = this.nuxt.options.publicRuntimeConfig;

        const {
            data: { data }
        } = await axios.post(
            datoApiUrl,
            { query },
            {
                headers: {
                    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`
                }
            }
        );

        const mapping = Object.entries(data).reduce((acc, model) => {
            const pages = model[1];
            // Multiples pages in the model
            if (Array.isArray(pages)) {
                pages.forEach(page => {
                    const modelName = page._modelApiKey;
                    page._allSlugLocales.forEach(slug => {
                        if (!acc[slug.locale]) acc[slug.locale] = {};
                        acc[slug.locale][slug.value] = modelName;
                    });
                });
            } else {
                // One single page in the model
                const modelName = pages._modelApiKey;
                pages._allSlugLocales.forEach(slug => {
                    if (!acc[slug.locale]) acc[slug.locale] = {};
                    acc[slug.locale][slug.value] = modelName;
                });
            }

            return acc;
        }, {});

        fs.ensureFileSync(path.join('api', 'dato', 'helpers', 'slugToModelApiKey.json'));
        await fs
            .writeJSON(path.join('api', 'dato', 'helpers', 'slugToModelApiKey.json'), mapping)
            .then(() => {
                logger.success('Slug to ModelApiKey mapping successfully extracted');
            })
            .catch(err => {
                logger.error('Error writing slug to ModelApiKey mapping file', err);
            });
    });
}
