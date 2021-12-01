<template>
    <div class="container">
        <h1 class="h1">{{ data.title }}</h1>
        <img :src="data.image.url" alt="" />
        <button
            class="snipcart-add-item"
            :data-item-id="data.id"
            :data-item-price="data.price"
            :data-item-image="data.image.url"
            :data-item-name="data.shoppingCartTitle"
            :data-item-description="data.shoppingCartDescription"
        >
            Add to cart
        </button>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { handleShopItem } from '~/api/dato/helpers/data';
import { productQuery } from '~/api/dato';
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
        const { brand, cuvee, category } = route.params;

        const taxonomies = {
            brand,
            cuvee,
            category
        };

        let product = {};

        try {
            const {
                data: { product: data }
            } = await $dato.post('/', { query: productQuery, variables: { lang, slug } }).then(({ data }) => data);
            product = handleShopItem(data);
        } catch (e) {
            return error({ statusCode: 404 });
        }

        if (!checkIfTaxonomiesMatch(product, taxonomies)) {
            return error({ statusCode: 404 });
        }

        // Setting product data
        finalData.data = product;

        // Handling SEO
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
