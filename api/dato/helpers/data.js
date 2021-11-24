import { getIso } from '~/api/dato/helpers';
import { errorQuery } from '~/api/dato';

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
