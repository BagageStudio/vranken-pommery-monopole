<template>
    <div class="wrapper-page">
        <div class="container">
            <div class="loading-zone content-pad">
                <div class="loader">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getIso } from '~/api/dato/helpers';
import { allProductsQuery } from '~/api/dato';
export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};
        // let products = [];

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const {
                data: { allProducts: products }
            } = await $dato.post('/', { query: allProductsQuery, variables: { lang } }).then(({ data }) => data);

            finalData.data = products;
            // finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        return finalData;
    },
    data: () => ({
        filteredProducts: []
    }),
    created() {
        if (!process.client) return;
        const term = this.$route.query.term;
        if (!term) return this.$nuxt.error({ statusCode: 404 });
    }
};
</script>
<style lang="scss" scoped>
.loading-zone {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 500px;
}

.loader {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid rgba($gold, 0.4);
    border-left-color: $gold;
    transform: translateZ(0);
    animation: load 1.1s infinite linear;
}

@keyframes load {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
