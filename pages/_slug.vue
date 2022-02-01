<template>
    <div>
        <TemplatesPage v-if="template === 'Page'" :data="data" />
        <TemplatesContact v-else-if="template === 'Contact'" :data="data" />
    </div>
</template>

<script>
import { camalize, pascalize } from '@stereorepo/sac';
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';

import slugToModelApiKey from '~/api/dato/helpers/slugToModelApiKey.json';
import { getQuery } from '~/api/dato';
import handleSeo from '~/app/seo';

export default {
    async asyncData(context) {
        const { $dato, error, route, app } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        // Getting the slug
        const slug = getSlug.call(context);

        // Ici ton _modelApiKey
        finalData.template = slugToModelApiKey[lang][slug];

        try {
            const { data } = await $dato
                .post('/', { query: getQuery(finalData.template), variables: { lang, slug } })
                .then(({ data }) => data);
            finalData.data = data[camalize(finalData.template)];
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
            finalData.template = pascalize(finalData.template);
        } catch (e) {
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text')
            });
        }

        // Getting raw slugs for the current page from Dato
        const datoLocales = finalData.data._allSlugLocales;
        await setRouteParams.call(context, datoLocales);

        return finalData;
    },
    data: () => ({
        data: {},
        seo: {}
    }),
    head() {
        return {
            ...this.seo
        };
    }
};
</script>
