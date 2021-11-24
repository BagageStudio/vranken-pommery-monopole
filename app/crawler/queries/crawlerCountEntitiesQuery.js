export default `
    query CrawlerCountEntities($lang: SiteLocale) {
        _allPagesMeta(locale: $lang) {
            count
        }
        _allFundsMeta(locale: $lang, filter: {slug: {neq: null}}) {
            count
        }
        _allCompaniesMeta(locale: $lang, filter: {slug: {neq: null}}) {
            count
        }
    }
`;
