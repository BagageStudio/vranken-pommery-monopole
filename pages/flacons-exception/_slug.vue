<template>
    <div class="wrapper-page">
        <FlaconHero :data="data" :back-link="listLink" :global="global" :contact="contact" />
        <FlaconAbout :data="data.about" :title="`${data.aboutTitle} ${data.year}`" />
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
        const { $dato, error, route, app } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        // Getting the slug
        const slug = getSlug.call(context);

        try {
            const {
                data: { flaconException: data, flaconsException: global, contact }
            } = await $dato
                .post('/', { query: flaconExceptionSingleQuery, variables: { lang, slug } })
                .then(({ data }) => data);
            finalData.data = data;
            finalData.global = global;
            finalData.contact = contact;
        } catch (e) {
            console.log(e);
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text'),
                error: e
            });
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
    },
    head() {
        return {
            ...this.seo
        };
    }
};
</script>

<style lang="scss" scoped></style>
