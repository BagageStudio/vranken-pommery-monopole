const TITLE_PREFIX = 'Vranken Pommery Monopole • ';

const handleSeo = ({ route, seo, lang }) => {
    const head = { meta: [] };

    if (route) {
        head.meta = [
            ...head.meta,
            {
                hid: 'og:url',
                property: 'og:url',
                content: `${process.env.URL}${route}`
            }
        ];
    }

    if (!seo) return head;

    if (seo.title) {
        seo.title = TITLE_PREFIX + seo.title;
        head.title = seo.title;
        head.meta = [
            ...head.meta,
            { hid: 'og:title', property: 'og:title', content: seo.title },
            { hid: 'twitter:title', name: 'twitter:title', content: seo.title }
        ];
    }

    if (seo.description) {
        head.meta = [
            ...head.meta,
            { hid: 'description', name: 'description', content: seo.description },
            {
                hid: 'og:description',
                property: 'og:description',
                content: seo.description
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: seo.description
            }
        ];
    }

    if (seo.image) {
        const { url, alt, width, height } = seo.image;

        head.meta = [
            ...head.meta,
            {
                hid: 'og:image',
                property: 'og:image',
                content: url
            },
            {
                hid: 'og:image:secure_url',
                property: 'og:image:secure_url',
                content: url
            },
            {
                hid: 'twitter:image',
                property: 'twitter:image',
                content: url
            },
            {
                hid: 'og:image:width',
                property: 'og:image:width',
                content: width
            },
            {
                hid: 'og:image:height',
                property: 'og:image:height',
                content: height
            },
            {
                hid: 'og:image:alt',
                property: 'og:image:alt',
                content: alt
            }
        ];
    }

    if (seo.twitterCard) {
        head.meta = [
            ...head.meta,
            {
                hid: 'twitter:card',
                name: 'twitter:card',
                content: seo.twitterCard
            }
        ];
    }

    head.htmlAttrs = {
        lang
    };

    return head;
};

export default handleSeo;
