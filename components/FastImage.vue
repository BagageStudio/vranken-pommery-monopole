<template>
    <figure class="fast-image" :class="{ loaded, cover, contains }">
        <img
            ref="fitImage"
            :src="imgixParameters(image.url)"
            :srcset="resolveSrcSet(image, fullWidth)"
            :sizes="resolveSizes(image, fullWidth)"
            :alt="resolveAlt(image)"
            :loading="loading"
            :width="image.width"
            :height="image.height"
            class="image"
        />
    </figure>
</template>

<script>
import { isSafari } from '@stereorepo/sac';
import { BREAKPOINTS } from '~/app/constants.js';

export default {
    props: {
        image: {
            type: Object,
            required: true
        },
        loading: {
            type: String,
            default: 'lazy'
        },
        contains: {
            type: Boolean,
            default: false
        },
        cover: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loaded: false
        };
    },
    mounted() {
        this.$refs.fitImage.addEventListener('load', this.loadedListener, false);

        if (isSafari()) this.loaded = true;
    },
    beforeDestroy() {
        this.$refs.fitImage.removeEventListener('load', this.loadedListener, false);
    },
    methods: {
        loadedListener() {
            this.loaded = true;
        },
        imgixParameters(url) {
            return `${url}?lossless=true&auto=format&fm=webp,png`;
        },
        resolveSrcSet(data, isFullWidth) {
            if (this.cover) return;

            const breakpointsLength = Object.keys(BREAKPOINTS).length;
            let srcsetOutput = '';
            let maxWidth = 0;

            // Generating srcset instructions for each breakpoint passed in args
            Object.keys(BREAKPOINTS).forEach((breakpoint, index) => {
                const width = BREAKPOINTS[breakpoint];

                if (width > maxWidth) maxWidth = BREAKPOINTS[breakpoint];
                if (width > data.width) return;

                srcsetOutput += `${this.imgixParameters(data.url)}&w=${width} ${width}w`;
                srcsetOutput += breakpointsLength - 1 === index ? '' : ', ';
            });

            // Checking if the image's full width size is bigger than the biggest breakpoint
            if (isFullWidth && data.width > maxWidth) {
                srcsetOutput += `, ${data.url} ${data.width}w`;
            }

            return srcsetOutput;
        },
        resolveSizes(data, isFullWidth) {
            if (this.cover) return;

            const breakpointsLength = Object.keys(BREAKPOINTS).length;
            let sizesOutput = '';

            let maxWidth = 0;

            // Generating sizes instructions for each breakpoint passed in args
            Object.keys(BREAKPOINTS).forEach((breakpoint, index) => {
                const width = BREAKPOINTS[breakpoint];

                if (width > maxWidth) maxWidth = BREAKPOINTS[breakpoint];
                if (width > data.width) return;

                sizesOutput += `(max-width: ${width}px) ${width}px`;
                sizesOutput += breakpointsLength - 1 === index ? '' : ', ';
            });

            // Checking if the image's full width size is bigger than the biggest breakpoint
            if (isFullWidth && data.width > maxWidth) {
                sizesOutput += `, (max-width: ${data.width}px) ${data.width}px`;
            }
            return sizesOutput;
        },
        resolveAlt({ alt }) {
            return alt ? alt.replace(/"/g, '&quot;') : '';
        }
    }
};
</script>

<style lang="scss" scoped>
.fast-image {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0.95);
    transition: 0.2s ease-out;
    &.loaded {
        opacity: 1;
        transform: scale(1);
    }
    &.cover {
        .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &.contains {
        .image {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>
