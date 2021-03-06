export const routes = {
    // 🚦Routing constants
    home: {
        i18nFormat: 'index',
        routerFormat: 'index'
    },
    page: {
        i18nFormat: '_slug',
        routerFormat: 'slug'
    },
    cuvee: {
        i18nFormat: '_brand/_cuvee/index',
        routerFormat: 'brand-cuvee'
    },
    category: {
        i18nFormat: '_brand/_cuvee/_category/index',
        routerFormat: 'brand-cuvee-category'
    },
    product: {
        i18nFormat: '_brand/_cuvee/_category/_uuid',
        routerFormat: 'brand-cuvee-category-uuid'
    },
    flaconsException: {
        i18nFormat: 'flacons-exception/index',
        routerFormat: 'flacons-exception'
    },
    flaconExceptionSingle: {
        i18nFormat: 'flacons-exception/_slug',
        routerFormat: 'flacons-exception-slug'
    },
    contact: {
        i18nFormat: '_slug',
        routerFormat: 'slug'
    },
    search: {
        i18nFormat: 'search',
        routerFormat: 'search'
    }
};

export const routeByApiModels = {
    home: routes.home,
    page: routes.page,
    cuvee: routes.cuvee,
    category: routes.category,
    product: routes.product,
    flacons_exception: routes.flaconsException,
    flacon_exception: routes.flaconExceptionSingle,
    contact: routes.contact
};

// You can pass an array of regular expressions to exclude dynamic routes.
export const excludedDynamicRoutes = () => (process.env.NETLIFY_ENV === 'production' ? [] : []);
