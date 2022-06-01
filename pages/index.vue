<template>
    <div>
        <HomeHero :data="data" />
        <HomeDiscover :data="data" />
        <HomeExperiences :data="data" />
        <!-- <div class="container">
            <button class="snipcart-checkout">Clique ici c'est magique</button>
            <h1 class="h1">Vranken Pommery Monopole</h1>
            <div>
                <div v-for="brand in brands" :key="brand.id">
                    <h2 class="h2">{{ brand.title }}</h2>
                    <div v-for="cuvee in brand.cuvees" :key="cuvee.id" class="cuvees">
                        <LinkTo shop :link="cuvee">
                            <h3 class="h3">{{ cuvee.title }}</h3>
                        </LinkTo>
                        <div v-for="category in cuvee.categories" :key="category.id" class="categories">
                            <LinkTo shop :link="category">
                                <h4 class="h4">{{ category.title }}</h4>
                            </LinkTo>
                            <div v-for="product in category.products" :key="product.id" class="products">
                                <LinkTo shop :link="product">
                                    <h5>{{ product.title }}</h5>
                                </LinkTo>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { homeQuery } from '~/api/dato';
import { handleShopItem } from '~/api/dato/helpers/data';
import handleSeo from '~/app/seo';
import { getHierarchyFromProducts } from '~/app/data';
export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};
        // let products = [];

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const {
                // data: { allProducts }
                data: { home: homeData }
            } = await $dato.post('/', { query: homeQuery, variables: { lang } }).then(({ data }) => data);

            finalData.data = homeData;

            // products = handleShopItem(allProducts);
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        // const brands = getHierarchyFromProducts(products);

        // finalData.brands = brands;

        // Getting raw slugs for the current page from Dato
        // const datoLocales = finalData.data._allSlugLocales;
        // await setRouteParams.call(context, datoLocales);

        return finalData;
    },
    data() {
        return {
            data: {},
            seo: {}
        };
    },
    head() {
        return {
            ...this.seo
        };
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
