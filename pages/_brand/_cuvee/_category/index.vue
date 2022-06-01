<template>
    <div class="wrapper-page">
        <listHero :data="data" :siblings-categories="siblingsCategories" :all-link="cuvee" />
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
        const { $dato, error, route, app } = context;
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
                .post('/', { query: siblingsCategoryQuery, variables: { lang, cuvee: data.cuvee.id } })
                .then(({ data }) => data);

            siblingsCategories = handleShopItem(categories);
            category = handleShopItem(data);
            cuveeData = handleShopItem(data.cuvee);

            finalData.products = handleShopItem(products);
        } catch (e) {
            console.log(e);
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text')
            });
        }

        if (!checkIfTaxonomiesMatch(category, taxonomies)) {
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text')
            });
        }

        finalData.data = category;
        finalData.cuvee = cuveeData;
        finalData.siblingsCategories = siblingsCategories;
        finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.seo, lang });

        // Getting raw slugs for the current page from Dato
        await setRouteParams.call(context, finalData.data, true);

        return finalData;
    },
    head() {
        return {
            ...this.seo
        };
    }
};
</script>

<style lang="scss" scoped>
img {
    height: 400px;
}
</style>
