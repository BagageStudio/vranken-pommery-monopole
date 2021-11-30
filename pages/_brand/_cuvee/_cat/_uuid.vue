<template>
    <div class="container">
        <h1 class="h1">{{ data.title }}</h1>
        <img :src="data.image.url" alt="" />
        <button
            class="snipcart-add-item"
            :data-item-id="data.id"
            :data-item-price="data.price"
            :data-item-image="data.image.url"
            :data-item-name="data.title"
        >
            Add to cart
        </button>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
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

        try {
            const {
                data: { product: data }
            } = await $dato.post('/', { query: productQuery, variables: { lang, slug } }).then(({ data }) => data);

            finalData.data = data;
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
        } catch (e) {
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
