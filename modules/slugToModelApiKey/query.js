export default `
    query AllSlugs{
        allPages{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        contact{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
    }
`;
