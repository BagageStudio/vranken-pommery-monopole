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
    ${linkFragment}
    query Home($lang: SiteLocale) {
        home(locale: $lang) {
            ${seo}
            title
            introTitle
            introText
            introAnchorLabel
            funds {
                id
                name
                description
                logo
                color {
                    hex
                }
                slug
                ${seo}
            }
            companies {
                _modelApiKey
                id
                name
                logo {
                    ${img}
                }
                slug
            }
            section1Title
            section1Subtitle
            section1Content
            section1Link {
                ...link
            }
            section1MobileImage {
                ${img}
            }
            section1TopLeftImage {
                ${img}
            }
            section1TopLeftLink {
                ...link
            }
            section1TopRightImage {
                ${img}
            }
            section1TopRightLink {
                ...link
            }
            section1BottomLeftImage {
                ${img}
            }
            section1BottomLeftLink {
                ...link
            }
            section1BottomRightImage {
                ${img}
            }
            section1BottomRightLink {
                ...link
            }
            section2LeftTitle
            section2LeftSubtitle
            section2RightTitle
            section2RightSubtitle
            centeredLink {
                ...link
            }
            ellipse {
                ${img}
            }
            newsTitle
            news {
                title
                cover {
                    ${img}
                }
                date
                readingTime
                linkUrl
            }
        }
    }
`;

export const pageQuery = `
    query Page($lang: SiteLocale, $slug: String) {
        page(locale: $lang, filter: { slug: { eq: $slug } }) {
            ${seo}
            ${locales}
            title
            content
            whiteBackground
        }
    }`;

export const contactQuery = `
    query Contact($lang: SiteLocale) {
        contact(locale: $lang) {
            ${seo}
            ${locales}
            title
            mailTitle
            mail
            socialTitle
            social {
                socialLinks {
                title
                iconName
                link
                }
            }
            locationTitle
            location
            locationLink
            image {
                ${img}
            }
        }
    }`;

export const teamQuery = `
    ${linkFragment}
    query Team($lang: SiteLocale) {
        team(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            members {
                id
                name
                description
                tags
                hasLinkedin
                link {
                    ...link
                }
                image {
                    ${img}
                }
            }
            investorsTitle
            investorsSubtitle
            investorsLink {
                ...link
            }
            investors {
                id
                name
                logo {
                    ${img}
                }
                link
            }
            mosaic {
                title
                subtitle
                text
                link {
                    ...link
                }
                topLeftImage {
                    ${img}
                }
                bottomLeftImage {
                    ${img}
                }
                rightMobileImage {
                    ${img}
                }
            }
        }
    }`;

export const portfolioQuery = `
    ${linkFragment}
    query Portfolio($lang: SiteLocale) {
        portfolio(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            companies {
                _modelApiKey
                id
                name
                description
                tags
                logo {
                    ${img}
                }
                image {
                    ${img}
                }
                slug
            }
            tableTitle
            col2Title
            col3Title
            col4Title
            tableEntries {
                id
                companyName
                industrySector
                soldTo
                soldYear
                company {
                    _modelApiKey
                    id
                    slug
                }
            }
            mosaic {
                title
                subtitle
                text
                link {
                    ...link
                }
                topLeftImage {
                    ${img}
                }
                bottomLeftImage {
                    ${img}
                }
                rightMobileImage {
                    ${img}
                }
            }
        }
    }`;

export const investorsPageQuery = `
    query InvestorsPage($lang: SiteLocale) {
        investorsPage(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            investors {
                id
                name
                logo {
                    ${img}
                }
                link
                smallText
            }
            moduleText {
                title
                text
            }
        }
    }`;

export const companyQuery = `
    query Company($lang: SiteLocale, $slug: String) {
        company(locale: $lang, filter: { slug: { eq: $slug } }) {
            ${seo}
            ${locales}
            name
            charity
            description
            tags
            logo {
                ${img}
            }
            image {
                ${img}
            }
            founders
            largeDescription
            quote
            keyFigures {
                id
                title
                number
            }
            recruitmentPageLink
            locations {
                id
                city
                address
                mapLink
            }
            social {
                socialLinks {
                title
                iconName
                link
                }
            }
            websiteLink
            websiteLinkLabel
            otherCompanies {
                _modelApiKey
                id
                name
                description
                tags
                logo {
                    ${img}
                }
                image {
                    ${img}
                }
                slug
            }
        }
    }`;

export const fundQuery = `
    ${linkFragment}
    query Fund($lang: SiteLocale, $slug: String) {
        fund(locale: $lang, filter: { slug: { eq: $slug } }) {
            ${seo}
            ${locales}
            name
            title
            fullDescription
            logo
            color {
                hex
            }
            keyFigures {
                id
                title
                number
            }
            targetsTitle
            targetsDescription
            targetsFirstColumnTitle
            targetsFirstColumnItems {
                id
                text
            }
            targetsSecondColumnTitle
            targetsSecondColumnItems {
                id
                text
            }
            video {
                title
                text
                videoUrl {
                    providerUid
                }
            }
            companiesTitle
            companies {
                _modelApiKey
                id
                name
                description
                tags
                logo {
                    ${img}
                }
                image {
                    ${img}
                }
                slug
            }
            crewTitle
            crewSections {
                title
                crewMembers {
                    name
                    description
                    hasLinkedin
                    link {
                        ...link
                    }
                    image {
                        ${img}
                    }
                }
            }
            mosaic {
                title
                subtitle
                text
                link {
                    ...link
                }
                topLeftImage {
                    ${img}
                }
                bottomLeftImage {
                    ${img}
                }
                rightMobileImage {
                    ${img}
                }
            }

        }
    }`;

export const useCasesPageQuery = `
    ${linkFragment}
    query UseCasesPage($lang: SiteLocale) {
        useCasesPage(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            text
            useCases {
                id
                name
                image {
                    ${img}
                }
                description
                date
                readingTime
                author {
                    name
                    image {
                        ${img}
                    }
                }
                link {
                    ...link
                }
            }
            seeAllLink
            mosaic {
                title
                subtitle
                text
                link {
                    ...link
                }
                topLeftImage {
                    ${img}
                }
                bottomLeftImage {
                    ${img}
                }
                rightMobileImage {
                    ${img}
                }
            }
        }
    }`;

export const sustainableEngagementQuery = `
    ${linkFragment}
    query SustainableEngagement($lang: SiteLocale) {
        sustainableEngagement(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            section1LeftTitle
            section1LeftContent
            section1RightTitle
            section1RightContent
            partnersTitle
            partnersText
            partners {
                name
                logo {
                    ${img}
                }
                link
            }
            section2LeftTitle
            section2LeftSubtitle
            section2LeftAccordions {
                id
                title
                content
                picto {
                    ${img}
                }
                link {
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
            }
            section2RightTitle
            section2RightSubtitle
            section2RightAccordions {
                id
                title
                content
                picto {
                    ${img}
                }
                link {
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
            }
            endowmentFundTitle
            endowmentFundText
            endowmentFundLineLink {
                ...link
            }
            endowmentFundBlockLink {
                ...link
            }
            endowmentFundMobileImage {
                ${img}
            }
            endowmentFundDesktopImage {
                ${img}
            }
        }
    }`;

export const ring2successQuery = `
    ${linkFragment}
    query Ring2success($lang: SiteLocale) {
        ring2success(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            fiftyFiftyBlocks {
                id
                title
                text
                accordions {
                    id
                    title
                    content
                    picto {
                        ${img}
                    }
                    link {
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
                }
            }
            journeyTitle
            journey {
                title
                text
            }
            ecosystemTitle
            ecosystemSubtitle
            ecosystemText
            ecosystemTags
            ecosystemImage {
                ${img}
            }
            mosaic {
                title
                subtitle
                text
                link {
                    ...link
                }
                topLeftImage {
                    ${img}
                }
                bottomLeftImage {
                    ${img}
                }
                rightMobileImage {
                    ${img}
                }
            }
            crewTitle
            crewSections {
                title
                crewMembers {
                    name
                    description
                    hasLinkedin
                    link {
                        ...link
                    }
                    image {
                        ${img}
                    }
                }
            }
            partnersTitle
            partners {
                name
                logo {
                    ${img}
                }
                link
            }
            storiesTitle
            storiesSubtitle
            useCases {
                id
                name
                image {
                    ${img}
                }
                description
                date
                readingTime
                author {
                    name
                    image {
                        ${img}
                    }
                }
                link {
                    ...link
                }
            }
        }
    }`;

export const visionQuery = `
    ${linkFragment}
    query Vision($lang: SiteLocale) {
        vision(locale: $lang) {
            ${seo}
            ${locales}
            title
            subtitle
            believeTitle
            believeAccordions {
                id
                title
                content
                picto {
                    ${img}
                }
                link {
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
            }
            believeImage {
                ${img}
            }
            manifesto {
                id
                blockTitleTitle
                blockTitleSubtitle
                blockTitleText
                blockContentTitle
                blockContentText
                blockContentImage {
                    ${img}
                }
            }
            video {
                title
                text
                videoUrl {
                    providerUid
                }
            }
        }
    }`;

// This is use by the `~/pages/_slug.vue` file to get the right query given a _modelApiKey
// When adding a new model, we need to link its query and its _modelApiKey
export const getQuery = _modelApiKey => {
    const mapping = {
        page: pageQuery,
        contact: contactQuery,
        team: teamQuery,
        portfolio: portfolioQuery,
        investors_page: investorsPageQuery,
        fund: fundQuery,
        use_cases_page: useCasesPageQuery,
        sustainable_engagement: sustainableEngagementQuery,
        ring2success: ring2successQuery,
        vision: visionQuery
    };
    return mapping[_modelApiKey];
};
