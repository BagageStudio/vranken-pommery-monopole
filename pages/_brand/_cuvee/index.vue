<template>
    <div class="wrapper-page">
        <listHero :data="data" :siblings-categories="categories" :all-link="data" />
        <listProducts :products="products" :data="data" />
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { handleShopItem } from '~/api/dato/helpers/data';
import { cuveeQuery, categoriesInCuveeQuery, productsInCuveeQuery } from '~/api/dato';
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

        try {
            const {
                data: { cuvee: data }
            } = await $dato.post('/', { query: cuveeQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allCategories: categories }
            } = await $dato
                .post('/', { query: categoriesInCuveeQuery, variables: { lang, id: data.id } })
                .then(({ data }) => data);

            const categoriesId = categories.map(c => c.id);

            const {
                data: { allProducts: products }
            } = await $dato
                .post('/', { query: productsInCuveeQuery, variables: { lang, ids: categoriesId } })
                .then(({ data }) => data);

            finalData.data = handleShopItem(data);
            finalData.categories = handleShopItem(categories);
            finalData.products = handleShopItem(products);
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        if (!checkIfTaxonomiesMatch(finalData.data, taxonomies)) {
            return error({ statusCode: 404 });
        }

        finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });

        await setRouteParams.call(context, finalData.data, true);

        return finalData;
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 400px;
}
</style>
