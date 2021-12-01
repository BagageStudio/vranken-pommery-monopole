import { routes } from '../app/crawler/routes';

export const defaultLocale = 'en';

export const locales = [
    { code: 'en', iso: 'en', name: 'english' },
    { code: 'fr', iso: 'fr', name: 'français' }
];

// 🚦 Specific routes
// NOTE: You can use isProdEnv to set conditionnal routes (not showing on prod for example)
export const getPagesList = () => ({
    [routes.home.i18nFormat]: {
        en: '/'
    },
    [routes.page.i18nFormat]: {
        en: '/:slug?'
    },
    [routes.cuvee.i18nFormat]: {
        en: '/:brand?/:cuvee?'
    },
    [routes.category.i18nFormat]: {
        en: '/:brand?/:cuvee?/:category?'
    },
    [routes.product.i18nFormat]: {
        en: '/:brand?/:cuvee?/:category?/:uuid?'
    }
});
