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

export function handleProduct(product) {
    product.brand = product.category.cuvee.brand;
    delete product.category.cuvee.brand;

    product.cuvee = product.category.cuvee;
    delete product.category.cuvee;

    return product;
}

export function handleCategory(category) {
    category.brand = category.cuvee.brand;
    delete category.cuvee.brand;

    return category;
}
