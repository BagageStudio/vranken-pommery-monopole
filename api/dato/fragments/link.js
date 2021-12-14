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
            ... on ProductRecord {
                slug
                _modelApiKey
            }
            ... on BrandRecord {
                slug
                _modelApiKey
            }
            ... on CategoryRecord {
                slug
                _modelApiKey
            }
            ... on CuveeRecord {
                slug
                _modelApiKey
            }
        }
        description
    }
`;
