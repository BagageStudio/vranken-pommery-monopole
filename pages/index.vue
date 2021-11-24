<template>
    <div class="container">
        <button class="snipcart-checkout">Clique ici c'est magique</button>
        <h1 class="h1">Vranken Pommery Monopole</h1>
        <div>
            <div v-for="brand in brands" :key="brand.id">
                <h2 class="h2">{{ brand.title }}</h2>
                <div v-for="cuvee in brand.cuvees" :key="cuvee.id" class="cuvees">
                    <h3 class="h3">{{ cuvee.title }}</h3>
                    <div v-for="category in cuvee.categories" :key="category.id" class="categories">
                        <h4 class="h4">{{ category.title }}</h4>
                        <div v-for="product in category.products" :key="product.id" class="products">
                            <h5>{{ product.title }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { homeQuery } from '~/api/dato';
import { getHierarchyFromProducts } from '~/app/data';
export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};
        let products = [];

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const {
                data: { allProducts }
            } = await $dato.post('/', { query: homeQuery, variables: { lang } }).then(({ data }) => data);

            products = allProducts;
            // finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data..seo, lang });
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        const brands = getHierarchyFromProducts(products);

        finalData.brands = brands;

        // Getting raw slugs for the current page from Dato
        // const datoLocales = finalData.data._allSlugLocales;
        // await setRouteParams.call(context, datoLocales);

        return finalData;
    }
};
</script>
<style scoped>
button {
    text-transform: uppercase;
    color: white;
    font-size: 20px;
    border: 1px solid white;
}
.cuvees,
.categories,
.products {
    padding-left: 100px;
}
</style>
