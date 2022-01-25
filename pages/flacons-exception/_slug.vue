<template>
    <div class="wrapper-page">
        <FlaconHero :data="data" :back-link="listLink" />
        <FlaconAbout :data="data.about" :year="data.year" />
        <FlaconSlider v-if="data.sliderDate.length" :data="data.sliderDate" />
        <FlaconRelated v-if="data.relatedFlacons" :data="data.relatedFlacons" />
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { flaconExceptionSingleQuery } from '~/api/dato';
import handleSeo from '~/app/seo';
import { routeByApiModels } from '~/app/crawler/routes';

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
    },
    data() {
        return {
            listLink: this.localePath({
                name: routeByApiModels.flacons_exception.routerFormat
            })
        };
    }
};
</script>

<style lang="scss" scoped></style>
