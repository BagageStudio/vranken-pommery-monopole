<template>
    <div class="wrapper-page">
        <!-- <LayoutBreadcrumbs :start="data.brand.title" :end="data.title" :links="[cuvee]" /> -->
        <listHero :data="data" :siblings-categories="siblingsCategories" />
        <listProducts :products="products" :data="data" />
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { categoryQuery, productsInCategoryQuery, siblingsCategoryQuery } from '~/api/dato';
import { handleShopItem } from '~/api/dato/helpers/data';

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
        const { brand, cuvee } = route.params;

        const taxonomies = {
            brand,
            cuvee
        };

        let category = {};
        let cuveeData = {};
        let siblingsCategories = [];

        try {
            const {
                data: { category: data }
            } = await $dato.post('/', { query: categoryQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allProducts: products }
            } = await $dato
                .post('/', { query: productsInCategoryQuery, variables: { lang, id: data.id } })
                .then(({ data }) => data);

            const {
                data: { allCategories: categories }
            } = await $dato
                .post('/', { query: siblingsCategoryQuery, variables: { lang, id: data.cuvee.id } })
                .then(({ data }) => data);

            siblingsCategories = handleShopItem(categories);
            category = handleShopItem(data);
            cuveeData = handleShopItem(data.cuvee);

            finalData.products = handleShopItem(products);
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        if (!checkIfTaxonomiesMatch(category, taxonomies)) {
            return error({ statusCode: 404 });
        }

        finalData.data = category;
        finalData.cuvee = cuveeData;
        finalData.siblingsCategories = siblingsCategories;
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
