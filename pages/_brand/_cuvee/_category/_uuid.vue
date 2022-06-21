<template>
    <div class="wrapper-page">
        <!-- <LayoutBreadcrumbs :start="data.brand.title" :end="data.title" :links="[cuvee, category]" /> -->
        <ProductHero :data="data" :back-link="category" :contact="contact" />
        <ProductTasting v-if="data.tasting" :data="data.tasting" />
        <ListCategories
            v-if="data.relatedCategories"
            :categories="data.relatedCategories.categories"
            :title="data.relatedCategories.textOnTop"
        />
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams, checkIfTaxonomiesMatch } from '~/api/dato/helpers';
import { handleShopItem } from '~/api/dato/helpers/data';
import { productQuery } from '~/api/dato';
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
        const { brand, cuvee, category } = route.params;

        const taxonomies = {
            brand,
            cuvee,
            category
        };

        let product = {};
        let categoryData = {};
        let cuveeData = {};
        let contactData = {};

        try {
            const {
                data: { product: data, contact }
            } = await $dato.post('/', { query: productQuery, variables: { lang, slug } }).then(({ data }) => data);
            product = handleShopItem(data);
            categoryData = handleShopItem(data.category);
            cuveeData = handleShopItem(data.category.cuvee);
            contactData = contact;
        } catch (e) {
            console.log(e);
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text'),
                error: e
            });
        }

        if (!checkIfTaxonomiesMatch(product, taxonomies)) {
            return error({
                statusCode: 404,
                title: app.i18n.t('404.notFound.title'),
                text: app.i18n.t('404.notFound.text')
            });
        }

        // Setting product data
        finalData.data = product;
        finalData.category = categoryData;
        finalData.cuvee = cuveeData;
        finalData.contact = contactData;

        // Handling SEO
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

<style lang="scss" scoped></style>
