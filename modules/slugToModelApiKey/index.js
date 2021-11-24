import path from 'path';
import fs from 'fs-extra';
import logger from 'consola';
import dato from '../../api/axios';
import query from './query';

export default function () {
    this.nuxt.hook('ready', async () => {
        const {
            data: { data }
        } = await dato.post('/', { query });

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

        fs.ensureFileSync(path.join('api', 'helpers', 'slugToModelApiKey.json'));
        await fs
            .writeJSON(path.join('api', 'helpers', 'slugToModelApiKey.json'), mapping)
            .then(() => {
                logger.success('Slug to ModelApiKey mapping successfully extracted');
            })
            .catch(err => {
                logger.error('Error writing slug to ModelApiKey mapping file', err);
            });
    });
}
