<template>
    <nuxt-link v-if="data && (data.internalLink || shop)" :to="data.url" :aria-label="data.title">
        <span v-if="data.label && !hideLabel" class="text">
            <span class="btn-label">{{ data.label }}</span>
        </span>
        <slot />
    </nuxt-link>
    <a
        v-else-if="data && data.externalLink"
        :href="data.externalLink"
        :aria-label="data.title"
        target="_blank"
        rel="noopener noreferrer"
    >
        <span v-if="data.label && !hideLabel" class="text">
            <span class="btn-label">{{ data.label }}</span>
        </span>
        <slot />
    </a>
</template>

<script>
import { routeByApiModels } from '~/app/crawler/routes';

export default {
    props: {
        link: {
            type: Object,
            required: true
        },
        shop: {
            type: Boolean,
            required: false,
            default: false
        },
        hideLabel: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            data: this.linkResolver()
        };
    },
    methods: {
        getInternalUrlDatas() {
            const { internalLink, hash } = this.link;
            const { routerFormat } = routeByApiModels[internalLink._modelApiKey];
            const params = internalLink.slug ? { [routerFormat.split('-').pop()]: internalLink.slug } : {};

            return { name: routerFormat, params, hash };
        },
        linkResolver() {
            if (this.shop) {
                return this.shopLinkResolver();
            } else {
                return this.cmsLinkResolver();
            }
        },
        cmsLinkResolver() {
            let resolvedLink = { url: '', ...this.link };

            if (resolvedLink.internalLink) {
                resolvedLink.url = this.localePath(this.getInternalUrlDatas());
            } else if (!resolvedLink.externalLink) {
                // If no links selected
                console.warn(
                    `The link named "${resolvedLink.label}" encountered an issue with the cmsLinkResolver method. There is some chance that nop links were filled in the CMS.`
                );
                resolvedLink = null;
            }

            return resolvedLink;
        },
        shopLinkResolver() {
            const resolvedLink = { url: '', title: this.link.title };
            const { routerFormat } = routeByApiModels[this.link._modelApiKey];
            const { brand, cuvee, category, slug } = this.link;
            const params = {
                brand: brand.slug,
                cuvee: cuvee ? cuvee.slug : slug,
                category: category ? category.slug : slug,
                uuid: slug
            };

            resolvedLink.url = this.localePath({ name: routerFormat, params });

            return resolvedLink;
        }
    }
};
</script>
