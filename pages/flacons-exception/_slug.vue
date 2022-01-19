<template>
    <div class="wrapper-page">
        <div>oui</div>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { flaconExceptionSingleQuery } from '~/api/dato';
import handleSeo from '~/app/seo';

export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        // Getting the slug
        const slug = getSlug.call(context);

        try {
            const {
                data: { flaconException: data }
            } = await $dato
                .post('/', { query: flaconExceptionSingleQuery, variables: { lang, slug } })
                .then(({ data }) => data);
            finalData.data = data;
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        // Handling SEO
        finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });

        // Getting raw slugs for the current page from Dato
        const datoLocales = finalData.data._allSlugLocales;
        await setRouteParams.call(context, datoLocales);

        return finalData;
    }
};
</script>

<style lang="scss" scoped></style>
