<template>
    <div class="wrapper-page">
        <div class="container">
            <LayoutBreadcrumbs :start="data.brand.title" :end="data.title" />
            <h1 class="h1">{{ data.title }}</h1>
            <div>
                <h2 class="h2">Categories</h2>
                <div v-for="category in categories" :key="category.id">
                    <LinkTo shop :link="category">
                        <h3 class="h3">{{ category.title }}</h3>
                    </LinkTo>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { handleShopItem } from '~/api/dato/helpers/data';
import { cuveeQuery, categoriesInCuveeQuery } from '~/api/dato';
import handleSeo from '~/app/seo';
export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        // Getting the slug
        const slug = getSlug.call(context);

        // Getting the params
        const { brand } = route.params;

        const taxonomies = {
            brand
        };

        let cuvee = {};

        try {
            const {
                data: { cuvee: data }
            } = await $dato.post('/', { query: cuveeQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allCategories: categories }
            } = await $dato
                .post('/', { query: categoriesInCuveeQuery, variables: { lang, id: cuvee.id } })
                .then(({ data }) => data);

            cuvee = handleShopItem(data);
            finalData.categories = handleShopItem(categories);
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        if (!checkIfTaxonomiesMatch(cuvee, taxonomies)) {
            return error({ statusCode: 404 });
        }

        finalData.data = cuvee;
        finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });

        // Getting raw slugs for the current page from Dato
        const datoLocales = finalData.data._allSlugLocales;
        await setRouteParams.call(context, datoLocales);

        return finalData;
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 400px;
}
</style>
