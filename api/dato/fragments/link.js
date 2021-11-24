export default `
    fragment link on LinkRecord {
        id
        label
        title
        externalLink
        hash
        internalLink {
            ... on HomeRecord {
                _modelApiKey
            }
            ... on PageRecord {
                _modelApiKey
                slug
            }
            ... on TeamRecord {
                _modelApiKey
                slug
            }
            ... on PortfolioRecord {
                _modelApiKey
                slug
            }
            ... on InvestorsPageRecord {
                _modelApiKey
                slug
            }
            ... on ContactRecord {
                _modelApiKey
                slug
            }
            ... on FundRecord {
                _modelApiKey
                slug
            }
            ... on CompanyRecord {
                _modelApiKey
                slug
            }
            ... on UseCasesPageRecord {
                _modelApiKey
                slug
            }
            ... on SustainableEngagementRecord {
                _modelApiKey
                slug
            }
            ... on Ring2successRecord {
                _modelApiKey
                slug
            }
            ... on VisionRecord {
                _modelApiKey
                slug
            }
        }
        description
    }
`;
