<template>
    <div class="container">
        <h1 class="h1">{{ data.category.title }}</h1>
        <div>
            <h2 class="h2">Products</h2>
            <div v-for="product in data.products" :key="product.id">
                <h3 class="h3">{{ product.title }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { categoryQuery, productsInCategoryQuery } from '~/api/dato';
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
                data: { category }
            } = await $dato.post('/', { query: categoryQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allProducts: products }
            } = await $dato
                .post('/', { query: productsInCategoryQuery, variables: { lang, id: category.id } })
                .then(({ data }) => data);

            finalData.data = { category, products };
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.category.seo, lang });
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

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
