<template>
    <div class="container">
        <h1 class="h1">{{ data.cuvee.title }}</h1>
        <div>
            <h2 class="h2">Categories</h2>
            <div v-for="category in data.categories" :key="category.id">
                <h3 class="h3">{{ category.title }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { getIso, getSlug, setRouteParams } from '~/api/dato/helpers';
import { cuveeQuery, categoriesInCuveeQuery } from '~/api/dato';
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
                data: { cuvee }
            } = await $dato.post('/', { query: cuveeQuery, variables: { lang, slug } }).then(({ data }) => data);

            const {
                data: { allCategories: categories }
            } = await $dato
                .post('/', { query: categoriesInCuveeQuery, variables: { lang, id: cuvee.id } })
                .then(({ data }) => data);

            finalData.data = { cuvee, categories };
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.cuvee.seo, lang });
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
