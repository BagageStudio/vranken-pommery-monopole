import axios from 'axios';
import { errorQuery, recordIdQuery, allProductsSlugsQuery, allProductsCountQuery } from '../index';
import { defaultLocale } from '../../../config/i18n';
import { getIso } from './index';

export function getContextData(context) {
    return {
        $dato: this.$dato,
        i18n: this.$i18n || this.app.i18n,
        store: this.$store || this.store,
        route: this.route
    };
}

export async function getError404Data() {
    const { $dato, store } = getContextData.call(this);
    // Early return if already fetched
    if (store.state.data.error404) return;

    const lang = getIso.call(this);
    const {
        data: { error }
    } = await $dato.post('/', { query: errorQuery, variables: { lang } }).then(({ data }) => data);

    return Object.freeze(error);
}

export async function getRecordId({ model, field, value }) {
    const { $dato } = getContextData.call(this);

    const variables = {};
    variables[field] = value;

    let data = {};

    try {
        const res = await $dato.post('/', { query: recordIdQuery(model, field), variables }).then(({ data }) => data);
        data = res.data;
    } catch (error) {
        console.log(error);
    }

    return Object.freeze(data[model].id);
}

function handleSingleShopItem(item) {
    if (item._modelApiKey === 'category') {
        item.brand = item.cuvee.brand;
        delete item.cuvee.brand;
    } else if (item._modelApiKey === 'product') {
        item.brand = item.category.cuvee.brand;
        delete item.category.cuvee.brand;

        item.cuvee = item.category.cuvee;
        delete item.category.cuvee;
    }

    return item;
}

export function handleShopItem(item) {
    const copy = JSON.parse(JSON.stringify(item));
    if (Array.isArray(copy)) {
        return copy.map(p => handleSingleShopItem(p));
    } else {
        return handleSingleShopItem(copy);
    }
}

export async function getExtendedRoutes() {
    let routes = [];

    const {
        data: {
            _allProductsMeta: { count }
        }
    } = await axios
        .post(
            process.env.GRAPHQL_ENDPOINT,
            { query: allProductsCountQuery },
            {
                headers: { Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}` }
            }
        )
        .then(({ data }) => data);

    const numberOfAPICall = Math.ceil(count / 100);

    let products = [];

    for (let index = 0; index < numberOfAPICall; index++) {
        const {
            data: { allProducts }
        } = await axios
            .post(
                process.env.GRAPHQL_ENDPOINT,
                {
                    query: allProductsSlugsQuery,
                    variables: { skip: index * 100 }
                },
                {
                    headers: { Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}` }
                }
            )
            .then(({ data }) => data);

        products = [...products, ...handleShopItem(allProducts)];
    }

    const productsSlugs = products.reduce((acc, cur) => {
        cur._allSlugLocales.forEach(locale => {
            const brandSlug = cur.brand._allSlugLocales.find(l => l.locale === locale.locale).value;
            const cuveeSlug = cur.cuvee._allSlugLocales.find(l => l.locale === locale.locale).value;
            const categorySlug = cur.category._allSlugLocales.find(l => l.locale === locale.locale).value;
            const productSlug = locale.value;
            const prefixLocale = defaultLocale === locale.locale ? '/' : `/${locale.locale}/`;
            const route = `${prefixLocale}${brandSlug}/${cuveeSlug}/${categorySlug}/${productSlug}`;
            acc.push(route);
        });

        return acc;
    }, []);

    routes = [...routes, ...productsSlugs];

    return routes;
}
