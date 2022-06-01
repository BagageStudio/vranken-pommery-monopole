import { getContextData } from './data';

export const getIso = function () {
    const { i18n, store } = getContextData.call(this);
    const { locale } = store.state.i18n;
    const { locales } = i18n;
    const [{ iso }] = locales.filter(({ code }) => {
        return code === locale;
    });
    return iso;
};

export const getSlug = function () {
    const { i18n, route } = getContextData.call(this);
    const { path: routePath } = route;

    return i18n.locales
        .reduce((acc, { code }) => {
            const [firstUrlPart] = acc;
            if (code === firstUrlPart) acc.shift();
            return acc;
        }, routePath.split('/').filter(Boolean))
        .pop();
};

export const getCodeFromIso = (i18n, locale) => {
    const [{ code }] = i18n.locales.filter(({ iso }) => {
        return iso === locale;
    });
    return code;
};

export const checkIfTaxonomiesMatch = (record, taxonomies) => {
    return Object.entries(taxonomies).every(taxo => {
        return record[taxo[0]].slug === taxo[1];
    });
};

export const setRouteParams = async function (datoLocales, shop = false) {
    if (!datoLocales) return;
    const { i18n, store } = getContextData.call(this);

    let slugs = {};

    if (shop) {
        slugs = datoLocales._allSlugLocales.reduce((acc, cur) => {
            const { brand, cuvee, category } = datoLocales;

            acc[cur.locale] = {
                brand: brand._allSlugLocales.find(l => l.locale === cur.locale).value,
                cuvee: cuvee ? cuvee._allSlugLocales.find(l => l.locale === cur.locale).value : cur.value,
                category: category ? category._allSlugLocales.find(l => l.locale === cur.locale).value : cur.value,
                uuid: cur.value
            };

            return acc;
        }, {});
    } else {
        // Remapping Dato slugs by iso
        datoLocales = datoLocales.reduce((acc, { locale, value }) => ({ ...acc, [locale]: value }), {});

        /**
         * Setting slugs for nuxt-i18n.
         * If the slug doesn't exist (a.k.a. no translation) we return an empty string.
         * This is the only way to prevent the lang switcher from leading to a 404.
         * SEE: https://i18n.nuxtjs.org/lang-switcher#dynamic-route-parameters
         * TODO: Generate routes based on available slugs
         */
        slugs = i18n.locales.reduce((acc, { code, iso }) => ({ ...acc, [code]: { slug: datoLocales[iso] || '' } }), {});
    }

    await store.dispatch('i18n/setRouteParams', slugs);
};
