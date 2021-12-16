export default `
    query Crawler($lang: SiteLocale, $first: IntType, $skip: IntType) {
        allPages(locale: $lang, first: $first, skip: $skip) {
            slug
            _modelApiKey
        }
        allProducts(locale: $lang, first: $first, skip: $skip, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allBrands(locale: $lang, first: $first, skip: $skip, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allCategories(locale: $lang, first: $first, skip: $skip, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
        allCuvees(locale: $lang, first: $first, skip: $skip, filter: {slug: {neq: null}}) {
            slug
            _modelApiKey
        }
    }
`;
