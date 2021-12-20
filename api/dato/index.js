import linkFragment from './fragments/link';

import seo from './fields/seo';
import img from './fields/img';
import locales from './fields/locales';

export const recordIdQuery = (model, variable) => {
    return `
        query Record($${variable}: String) {
            ${model}(filter: { ${variable}: { eq: $${variable} } }){
                id
            }
        }
    `;
};

export const layoutQuery = `
    ${linkFragment}
    query Layout($lang: SiteLocale) {
        footer(locale: $lang) {
            title
            benefitsTitle
            benefits {
                id
                benefitIcon {
                    ${img}
                }
                benefitTitle
            }
            newsletterTitle
            newsletterIntro
            emailPlaceholder
            newsletterButtonLabel
            footerLogo {
                ${img}
            }
            footerMenu {
                id
                title
                links {
                    ...link
                }
            }
            footerCopyright
            footerWarning
            social {
                id
                title
                icon {
                    ${img}
                }
                linkUrl
            }
        }
        header(locale: $lang) {
            menu {
                ... on SingleLinkRecord {
                    id
                    label
                    link {
                        ...link
                    }
                }
                ... on SubmenuRecord {
                    id
                    label
                    items {
                        ... on SingleLinkImageRecord {
                            id
                            label
                            link {
                                ...link
                            }
                            image {
                                ${img}
                            }
                        }
                        ... on SubsubmenuRecord {
                            id
                            label
                            image {
                                ${img}
                            }
                            items {
                                label
                                link {
                                    ...link
                                }
                                image {
                                    ${img}
                                }
                            }
                        }
                    }
                }
            }
            socials {
                id
                icon {
                    ${img}
                }
                linkUrl
            }
        }
    }
`;

export const errorQuery = `
    ${linkFragment}
    query Error($lang: SiteLocale) {
        error(locale: $lang) {
            title
            text
            link {
                ...link
            }
        }
    }`;

export const homeQuery = `
    ${linkFragment}
    query Home($lang: SiteLocale) {
        home(locale: $lang) {
            ${seo}
            heroTitle
            heroLink {
                ...link
            }
            heroCover {
                ${img}
            }
            discoverIntro
            discoverBrands {
                _modelApiKey
                id
                title
                slug
                logo {
                    ${img}
                }
            }
            experiencesLabel
            experiencesTitle
            experiencesLink {
                ...link
            }
            experiences {
                thumbnail {
                    ${img}
                }
                title
                label
                link {
                    ...link
                }
            }
        }
        allProducts(locale: $lang, first: 100) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            uuid
            image{
                ${img}
            }
            category{
                _modelApiKey
                ${locales}
                id
                slug
                title
                cuvee {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                    brand {
                        _modelApiKey
                        ${locales}
                        id
                        slug
                        title
                    }
                }
            }
        }
    }`;

export const pageQuery = `
    query Page($lang: SiteLocale, $slug: String) {
        page(locale: $lang, filter: { slug: { eq: $slug } }) {
            ${seo}
            ${locales}
            title
            content
        }
    }`;

export const productQuery = `
    query Product($lang: SiteLocale, $slug: String) {
        product(locale: $lang, filter: { slug: { eq: $slug } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            uuid
            price
            shoppingCartDescription
            image{
                ${img}
            }
            category{
                _modelApiKey
                ${locales}
                id
                slug
                title
                cuvee {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                    brand {
                        _modelApiKey
                        ${locales}
                        id
                        slug
                        title
                    }
                }
            }
        }
    }`;

export const categoryQuery = `
    query Category($lang: SiteLocale, $slug: String) {
        category(locale: $lang, filter: { slug: { eq: $slug } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            cuvee {
                _modelApiKey
                ${locales}
                id
                slug
                title
                brand {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                }
            }
        }
    }`;

export const productsInCategoryQuery = `
    query Category($lang: SiteLocale, $id: ItemId) {
        allProducts(locale: $lang, filter: { category: { eq: $id } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            uuid
            image{
                ${img}
            }
            category{
                _modelApiKey
                ${locales}
                id
                slug
                title
                cuvee {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                    brand {
                        _modelApiKey
                        ${locales}
                        id
                        slug
                        title
                    }
                }
            }
        }
    }`;

export const cuveeQuery = `
    query Cuvee($lang: SiteLocale, $slug: String) {
        cuvee(locale: $lang, filter: { slug: { eq: $slug } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            brand {
                _modelApiKey
                ${locales}
                id
                slug
                title
            }
        }
    }`;

export const categoriesInCuveeQuery = `
    query Cuvee($lang: SiteLocale, $id: ItemId) {
        allCategories(locale: $lang, filter: { cuvee: { eq: $id } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            cuvee {
                _modelApiKey
                ${locales}
                id
                slug
                title
                brand {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                }
            }
        }
    }`;

// This is use by the `~/pages/_slug.vue` file to get the right query given a _modelApiKey
// When adding a new model, we need to link its query and its _modelApiKey
export const getQuery = _modelApiKey => {
    const mapping = {
        page: pageQuery
        // contact: contactQuery,
        // team: teamQuery,
        // portfolio: portfolioQuery,
        // investors_page: investorsPageQuery,
        // fund: fundQuery,
        // use_cases_page: useCasesPageQuery,
        // sustainable_engagement: sustainableEngagementQuery,
        // ring2success: ring2successQuery,
        // vision: visionQuery
    };
    return mapping[_modelApiKey];
};
