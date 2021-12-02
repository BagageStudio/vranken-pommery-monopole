import { getIso } from '~/api/dato/helpers';
import { errorQuery, recordIdQuery } from '~/api/dato';

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
