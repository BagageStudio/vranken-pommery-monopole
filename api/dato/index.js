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
            successMessage
            successMessageOptin
            errorMessage
            evinImage {
                ${img}
            }
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
                                id
                                ${img}
                            }
                        }
                        ... on SubsubmenuRecord {
                            id
                            label
                            image {
                                id
                                ${img}
                            }
                            items {
                                label
                                link {
                                    ...link
                                }
                                image {
                                    id
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
        ageGate(locale: $lang) {
            logo {
                ${img}
            }
            title
            introduction
            checkboxLabel
            buttonLabel
            bottomText
            ageIncorrect
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

export const homeSEOQuery = `
    query Home($lang: SiteLocale) {
        home(locale: $lang) {
            ${seo}
        }
    }
`;

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
            experiences {
                label
                title
                intro
                thumbnail {
                    ${img}
                }
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
            secondImage{
                ${img}
            }
            productType
            description{
                id
                title
                description
            }
            tasting{
                id
                title
                displayTitle
                eye
                nose
                palate
                terroirs
                accords
                temperature
                image{
                    ${img}
                }
                imageCaption
            }
            relatedCategories {
                _modelApiKey
                id
                title
                textOnTop
                categories {
                    _modelApiKey
                    ${locales}
                    id
                    slug
                    title
                    image {
                        ${img}
                    }
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
            forceUnavailable
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

export const siblingsCategoryQuery = `
    query SiblingCategory($lang: SiteLocale, $cuvee: ItemId) {
        allCategories(locale: $lang, filter: { cuvee: { eq: $cuvee } }){
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

    }
`;

export const categoryQuery = `
    query Category($lang: SiteLocale, $slug: String) {
        category(locale: $lang, filter: { slug: { eq: $slug } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            slug
            moodImages {
                id
                ${img}
            }
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
            listTitle
            slug
            uuid
            image{
                ${img}
            }
            price
            productType
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

export const productsInCuveeQuery = `
    query Category($lang: SiteLocale, $ids: [ItemId]) {
        allProducts(locale: $lang, filter: { category: { in: $ids } }) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            listTitle
            slug
            uuid
            image{
                ${img}
            }
            price
            productType
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

export const flaconsExceptionQuery = `
    query flaconsException($lang: SiteLocale) {
        flaconsException(locale: $lang) {
            _modelApiKey
            ${seo}
            id
            title
            preTitle
            content {
                _modelApiKey
                id
                label
                title
                text
                image {
                    ${img}
                }
                imageCaption
            }
            collectionTitle
        }
        allFlaconExceptions(locale: $lang, first: 100) {
            _modelApiKey
            ${seo}
            ${locales}
            slug
            id
            title
            listTitle
            year
            image {
                ${img}
            }
            unavailable
        }
    }`;

export const flaconExceptionSingleQuery = `
    query flaconsException($lang: SiteLocale, $slug: String) {
        flaconsException(locale: $lang) {
            contactSubject
            contactBrand
        }
        flaconException(locale: $lang, filter: { slug: { eq: $slug } }) {
            _modelApiKey
            ${seo}
            ${locales}
            slug
            id
            title
            listTitle
            year
            image {
                ${img}
            }
            priceText
            unavailable
            description
            about {
                id
                title
                description
            }
            aboutTitle
            sliderDate {
                id
                date
                title
                description
                image {
                    ${img}
                }
            }
            relatedFlacons{
                displayTitle
                flacons{
                    _modelApiKey
                    id
                    listTitle
                    slug
                    year
                    
                }
            }
        }
    }`;

export const contactQuery = `
    query contact($lang: SiteLocale) {
        contact(locale: $lang) {
            _modelApiKey
            slug
            ${seo}
            id
            title
            image {
                ${img}
            }
            intro
            subjectLabel
            subjectOptions {
                id
                text
                valueAttribute
            }
            brandLabel
            brandOptions {
                id
                text
                valueAttribute
            }
            firstNameLabel
            lastNameLabel
            phoneLabel
            emailLabel
            messageLabel
            buttonLabel
            successMessage
        }
    }`;

export const allProductsCountQuery = `
    query Count($lang: SiteLocale) {
        _allProductsMeta(locale: $lang) {
            count
        }
    }
`;

export const allProductsSlugsQuery = `
    query Slugs($skip: IntType) {
        allProducts(skip: $skip, first: 100) {
            _modelApiKey
            ${locales}
            category{
                _modelApiKey
                ${locales}
                id
                cuvee {
                    _modelApiKey
                    ${locales}
                    id
                    brand {
                        _modelApiKey
                        ${locales}
                        id
                    }
                }
            }
        }
    }
`;

export const allProductsQuery = `
    query Category($lang: SiteLocale, $skip: IntType) {
        allProducts(locale: $lang, skip: $skip, first: 100) {
            _modelApiKey
            ${seo}
            ${locales}
            id
            title
            listTitle
            slug
            uuid
            image{
                ${img}
            }
            price
            productType
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

// This is use by the `~/pages/_slug.vue` file to get the right query given a _modelApiKey
// When adding a new model, we need to link its query and its _modelApiKey
export const getQuery = _modelApiKey => {
    const mapping = {
        page: pageQuery,
        contact: contactQuery
    };
    return mapping[_modelApiKey];
};
