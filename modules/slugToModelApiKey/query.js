export default `
    query AllSlugs{
        allPages{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        flaconsException{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
    }
`;
