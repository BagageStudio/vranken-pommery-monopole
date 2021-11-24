# Slug to _modelapikey mapping

## Why are we doing this ?
In  the `~/pages` folder we're using a generic `~/_slug.vue` to manage all the different templates (Solutions page, Product page, feature page etc.). Right ?

But in `asyncData()` we need to call the right query and to do that, we need the `_modelApiKey` of the page we're on. Because — yes — the query on a Solution page we'll be differente from a Contact page (*no shit??*)

Now you know why.

## What is happening with this module ?
Basically, we're writing a json file with the corresponding `_modelApiKey` for a given slug and locale. That's it. 
It's automatically written before the static generation, and when developing locally.

It's structured like this :

```
{
   'a-locale-code': {
       'a-slug' : 'the-corresponding-modelApiKey`,
       'a-other-slug' : 'the-corresponding-modelApiKey`,
       'a-third-slug' : 'the-corresponding-modelApiKey`,
   },
   'a-seconde-locale-code': {
       'a-slug' : 'the-corresponding-modelApiKey`,
       'a-other-slug' : 'the-corresponding-modelApiKey`,
       'a-third-slug' : 'the-corresponding-modelApiKey`,
   } 
}
```

A real-world example should look like this :
```
{
    "en_US": {
        "solution-1":"solution",
        "solution-2":"solution",
        "contact":"contact",
        "my-webinar":"landing",
    },
    "fr_FR": {
        "solution-1":"solution",
        "solution-2":"solution",
        "formulaire-de-contact":"contact",
        "nouveau-webinar":"landing",
    },
    "es_ES": {
        "solucion-1":"solution",
        "solucion-2":"solution",
        "como-esta-dans-la-casa":"contact",
        "despacito-webinar":"landing",
    }
}

```

So now you can import the file
```
~/pages/_slug.vue

...

import slugToModelApiKey from '~/api/dato/helpers/slugToModelApiKey.json';
```  


And in your `asyncData()` you can get the current page's _modelApiKey with `slugToModelApiKey[lang][slug]`. 

## Updating the map
When you have a new model in Dato you have to add it here `~/modules/slugToModelApiKey/query`.
And don't forget to update the `getQuery()` in `~/api/dato/index`

```
query AllSlugs{
    allSolutions{
        _modelApiKey
        _allSlugLocales{
            locale
            value
        }
    }
    allContacts{
        _modelApiKey
        _allSlugLocales{
            locale
            value
        }
    }
    allLandings{
        _modelApiKey
        _allSlugLocales{
            locale
            value
        }
    }
}`;
```

Then you can go eat a Kinder Bueno and enjoy your victory.