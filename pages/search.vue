<template>
    <div class="wrapper-page">
        <client-only>
            <div v-if="loading" class="container">
                <div class="loading-zone content-pad">
                    <div class="loader">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
            <div v-else-if="filteredProducts.length">
                <div class="container title">
                    <h1 class="h5 content-pad">
                        {{ filteredProducts.length }} {{ $t('search.title') }} "{{ $route.query.term }}"
                    </h1>
                </div>
                <listProducts :products="filteredProducts" :data="{}" />
            </div>
            <div v-else>no results</div>
        </client-only>
    </div>
</template>

<script>
import { getIso } from '~/api/dato/helpers';
import { allProductsQuery, allProductsCountQuery, homeSEOQuery } from '~/api/dato';
import { handleShopItem } from '~/api/dato/helpers/data';
import handleSeo from '~/app/seo';

export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const {
                data: {
                    _allProductsMeta: { count }
                }
            } = await $dato.post('/', { query: allProductsCountQuery, variables: { lang } }).then(({ data }) => data);

            const numberOfAPICall = Math.ceil(count / 100);

            let products = [];

            for (let index = 0; index < numberOfAPICall; index++) {
                const {
                    data: { allProducts }
                } = await $dato
                    .post('/', { query: allProductsQuery, variables: { lang, skip: index * 100 } })
                    .then(({ data }) => data);

                products = [...products, ...allProducts];
            }

            const {
                data: {
                    home: { seo }
                }
            } = await $dato.post('/', { query: homeSEOQuery, variables: { lang } }).then(({ data }) => data);

            finalData.products = handleShopItem(products);
            finalData.seo = handleSeo({ route: route.fullPath, seo, lang });
        } catch (e) {
            console.log(e);
            return error({ statusCode: 404 });
        }

        return finalData;
    },
    data: () => ({
        filteredProducts: [],
        loading: true
    }),
    head() {
        return {
            ...this.seo
        };
    },
    watch: {
        '$route.query.term'() {
            this.loading = true;
            this.makeSearch();
        }
    },
    created() {
        this.makeSearch();
    },
    methods: {
        makeSearch() {
            if (!process.client) return;
            const term = this.$route.query.term;
            if (!term) return this.$nuxt.error({ statusCode: 404 });
            this.filteredProducts = this.filter(term);
            if (!this.filteredProducts.length)
                return this.$nuxt.error({ statusCode: 404, message: 'Aucun résultat de recherche' });
            this.loading = false;
        },
        filter(term) {
            const normalizedTerm = this.removeAccents(term);
            return this.products.filter(product => {
                const matchTitle = this.removeAccents(product.title).includes(normalizedTerm);
                const matchType = this.removeAccents(product.productType).includes(normalizedTerm);
                const matchCuvee = this.removeAccents(product.cuvee.title).includes(normalizedTerm);
                const matchCategory = this.removeAccents(product.category.title).includes(normalizedTerm);
                const matchBrand = this.removeAccents(product.brand.title).includes(normalizedTerm);
                return matchTitle || matchType || matchCuvee || matchCategory || matchBrand;
            });
        },
        removeAccents(text) {
            return text
                .toLowerCase()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '');
        }
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

.title {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
}

.h5 {
    margin: 0;
}

@media (min-width: $tablet) {
    .title {
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
</style>
