<template>
    <div class="container">
        <h1 class="h1">{{ data.category.title }}</h1>
        <div>
            <h2 class="h2">Products</h2>
            <div v-for="product in data.products" :key="product.id">
                <LinkTo shop :link="product">
                    <h3 class="h3">{{ product.title }}</h3>
                </LinkTo>
            </div>
        </div>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { categoryQuery, productsInCategoryQuery } from '~/api/dato';
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

        try {
            const {
                data: { category: data }
            } = await $dato.post('/', { query: categoryQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allProducts: products }
            } = await $dato
                .post('/', { query: productsInCategoryQuery, variables: { lang, id: data.id } })
                .then(({ data }) => data);

            category = handleShopItem(data);
            finalData.data = { products: handleShopItem(products) };
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        if (!checkIfTaxonomiesMatch(category, taxonomies)) {
            return error({ statusCode: 404 });
        }

        finalData.data.category = category;
        finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.category.seo, lang });

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
