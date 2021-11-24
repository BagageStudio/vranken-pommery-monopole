export default `
    query AllSlugs{
        allBasics(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allLandings(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allCourierPages{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allIndustryPages(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allBusinessPages(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allBlogCategories(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        allBlogCategoryCouriers(first: 100){
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        aboutPage{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
        careersPage{
            _modelApiKey
            _allSlugLocales{
                locale
                value
            }
        }
    }
`;
