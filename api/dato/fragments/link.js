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
                category{
                    _modelApiKey
                    id
                    slug
                    cuvee {
                        _modelApiKey
                        id
                        slug
                        brand {
                            _modelApiKey
                            id
                            slug
                        }
                    }
                }
            }
            ... on BrandRecord {
                slug
                _modelApiKey
            }
            ... on CategoryRecord {
                slug
                _modelApiKey
                cuvee {
                    _modelApiKey
                    id
                    slug
                    brand {
                        _modelApiKey
                        id
                        slug
                    }
                }
            }
            ... on CuveeRecord {
                slug
                _modelApiKey
                brand {
                    _modelApiKey
                    id
                    slug
                }
            }
            ... on PageRecord {
                slug
                _modelApiKey
            }
            ... on FlaconsExceptionRecord {
                _modelApiKey
            }
        }
        description
    }
`;
