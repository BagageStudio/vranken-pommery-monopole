export default `
    query CrawlerCountEntities($lang: SiteLocale) {
        _allPagesMeta(locale: $lang) {
            count
        }
        allProducts(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allBrands(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allCategories(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allCuvees(locale: $lang, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
    }
`;
