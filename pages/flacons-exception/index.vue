<template>
    <div>
        <TemplatesFlaconsException :data="data" />
    </div>
</template>

<script>
import { getIso } from '~/api/dato/helpers';

import { flaconsExceptionQuery } from '~/api/dato';
import handleSeo from '~/app/seo';

export default {
    async asyncData(context) {
        const { $dato, error, route } = context;
        const finalData = {};

        // Getting the right locale iso
        const lang = getIso.call(context);

        try {
            const { data } = await $dato
                .post('/', { query: flaconsExceptionQuery, variables: { lang } })
                .then(({ data }) => data);
            finalData.data = data;
            finalData.seo = handleSeo({ route: route.fullPath, seo: finalData.data.flaconsException.seo, lang });
        } catch (e) {
            return error({ statusCode: 404, message: e });
        }

        return finalData;
    },
    data: () => ({
        data: {},
        seo: {}
    })
};
</script>
