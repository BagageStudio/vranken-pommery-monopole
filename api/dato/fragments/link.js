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
        }
        description
    }
`;
