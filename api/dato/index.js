import linkFragment from './fragments/link';

import seo from './fields/seo';
import img from './fields/img';
import locales from './fields/locales';

export const layoutQuery = `
    ${linkFragment}
    query Layout($lang: SiteLocale) {
        header(locale: $lang) {
            navigation {
                ... on MegaRecord {
                    _modelApiKey
                    id
                    megaMenu {
                        title
                        links {
                            ...link
                        }
                        social {
                            socialLinks {
                            title
                            iconName
                            link
                            }
                        }
                        newsTitle
                        socialTitle
                        news {
                            title
                            cover {
                                ${img}
                            }
                            readingTime
                            date
                            linkUrl
                        }
                    }
                }
                ... on SingleLinkRecord {
                    _modelApiKey
                    id
                    link {
                        ...link
                    }
                }
                ... on SubmenuGroupRecord {
                    _modelApiKey
                    id
                    title
                    submenus {
                        id
                        title
                        links {
                            ...link
                        }
                    }
                }
            }
            contact {
                ...link
            }
        }
        footer(locale: $lang) {
            linksColumn {
                links {
                    label
                    title
                    ...link
                }
            }
            smallText
            smallLinks {
                __typename
                ...link
                ... on LinkFileRecord {
                    label
                    title
                    file {
                        url
                    }
                }
            }
            newsletter {
                title
            }
            newsletterEmailError
            newsletterEmailInvalid
            newsletterSuccess
            newsletterGdpr
            newsletterTextBeforeLink
            newsletterLink {
                ...link
            }
            social {
                socialLinks {
                    title
                    iconName
                    link
                }
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
    query Home($lang: SiteLocale) {
        allProducts(locale: $lang, first: 100) {
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
                ${locales}
                id
                slug
                title
                cuvee {
                    ${locales}
                    id
                    slug
                    title
                    brand {
                        ${locales}
                        id
                        slug
                        title
                    }
                }
            }
        }
    }`;

export const productQuery = `
    query Product($lang: SiteLocale, $slug: String) {
        product(locale: $lang, filter: { slug: { eq: $slug } }) {
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
                ${locales}
                id
                slug
                title
                cuvee {
                    ${locales}
                    id
                    slug
                    title
                    brand {
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
            ${seo}
            ${locales}
            id
            title
            slug
            cuvee {
                ${locales}
                id
                slug
                title
                brand {
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
                ${locales}
                id
                slug
                title
                cuvee {
                    ${locales}
                    id
                    slug
                    title
                    brand {
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
            ${seo}
            ${locales}
            id
            title
            slug
            brand {
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
            ${seo}
            ${locales}
            id
            title
            slug
            cuvee {
                ${locales}
                id
                slug
                title
                brand {
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
        // page: pageQuery,
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
