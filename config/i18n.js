import { routes } from '../app/crawler/routes';

export const defaultLocale = 'fr';

export const locales = [
    { code: 'fr', iso: 'fr', name: 'français' },
    { code: 'en', iso: 'en', name: 'english' }
];

// 🚦 Specific routes
// NOTE: You can use isProdEnv to set conditionnal routes (not showing on prod for example)
export const getPagesList = () => ({
    [routes.home.i18nFormat]: {
        fr: '/',
        en: '/'
    },
    [routes.page.i18nFormat]: {
        fr: '/:slug?',
        en: '/:slug?'
    },
    [routes.cuvee.i18nFormat]: {
        fr: '/:brand?/:cuvee?',
        en: '/:brand?/:cuvee?'
    },
    [routes.category.i18nFormat]: {
        fr: '/:brand?/:cuvee?/:category?',
        en: '/:brand?/:cuvee?/:category?'
    },
    [routes.product.i18nFormat]: {
        fr: '/:brand?/:cuvee?/:category?/:uuid?',
        en: '/:brand?/:cuvee?/:category?/:uuid?'
    },
    [routes.flaconsException.i18nFormat]: {
        fr: '/flacons-exception',
        en: '/exceptional-flacons'
    }
});
