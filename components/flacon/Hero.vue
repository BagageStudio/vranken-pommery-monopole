<template>
    <div class="product-hero container">
        <div class="wrapper-product-top">
            <div class="wrapper-product-image">
                <nuxt-link class="btn-back" :to="backLink">
                    <Icon name="arrow-left" />
                    <span>{{ $t('global.backLabel') }}</span>
                </nuxt-link>
                <div class="product-image">
                    <FastImage :image="data.image" cover />
                </div>
            </div>
            <div class="wrapper-product-description">
                <span class="product-type">{{ data.productType }}</span>
                <h1 class="product-title h2">{{ data.title }}</h1>
                <div class="wrapper-price-availability">
                    <span class="product-price">Tarif sur demande</span>
                    <ProductAvailability :available="!data.unavailable" />
                </div>
                <div class="product-description wysiwyg" v-html="data.description" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        backLink: {
            type: String,
            required: true
        }
    },
    data: () => ({}),
    methods: {}
};
</script>
<style lang="scss" scoped>
.wrapper-product-image {
    position: relative;
    display: flex;
    justify-content: center;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        right: -#{$grid-gutter-s};
        bottom: 0;
        left: -#{$grid-gutter-s};
        // background: $beige;
    }
}
.btn-back {
    position: absolute;
    top: 0;
    left: -#{$grid-gutter-s};
    display: inline-flex;
    align-items: center;
    padding: 30px 20px;
    font-size: 1.5rem;
    line-height: 19px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.03em;
    color: $grey-2;
    background: $white;
    z-index: 1;
    .icon {
        width: 9px;
        height: 6px;
        margin-right: 9px;
    }
}
.product-image {
    // max-width: 500px;
    max-height: 500px;
    width: calc(100% + #{$grid-gutter-s * 2});
    margin-left: -#{$grid-gutter-s};
    margin-right: -#{$grid-gutter-s};
    aspect-ratio: 1 / 1;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
.wrapper-product-description {
    padding: 50px $gutter;
}
.product-type {
    display: block;
    font-size: 1.6rem;
    line-height: 25px;
    margin-bottom: 5px;
    color: $grey-2;
}
.product-title {
    margin: 0;
}
.wrapper-price-availability {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
}
.product-price {
    flex: 0 0 auto;
    margin: 0 20px 0 0;
}

.btn-order {
    flex: 1 1 auto;
}
.product-description {
    margin: 50px 0 0;
    padding-top: 50px;
    border-top: 1px solid $grey-3;
}

@media (min-width: $phone) {
    // .product-image {
    //     height: 500px;
    //     aspect-ratio: auto;
    // }
}

@media (min-width: $tablet) {
    .wrapper-product-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .wrapper-product-image {
        width: percentage(math.div(4, 10));
        &::before {
            right: $gutter;
            left: $gutter;
        }
    }
    .btn-back {
        left: 0;
    }
    .product-image {
        width: 100%;
        min-height: 450px;
        max-height: none;
        margin-left: 0;
        margin-right: 0;
    }
    .wrapper-product-description {
        flex: 0 0 auto;
        width: 50%;
        padding-bottom: 0;
    }
}
@media (min-width: $desktop) {
    .wrapper-product-top {
        width: 100%;
        justify-content: flex-start;
    }
    .wrapper-product-image {
        width: percentage(math.div(6, 12));
        justify-content: flex-start;
        aspect-ratio: 1 / 1;
    }
    .btn-back {
        padding: 30px;
    }
    .product-image {
        aspect-ratio: auto;
        width: percentage(math.div(5, 6));
    }
    .wrapper-product-description {
        width: percentage(math.div(5, 12));
        padding: 65px $gutter 0;
    }
}
@media (min-width: $desktop-large) {
    .wrapper-product-image {
        width: percentage(math.div(7, 12));
        &::before {
            right: percentage(math.div(1, 7));
        }
    }
    .product-image {
        width: percentage(math.div(6, 7));
    }
    .wrapper-product-description {
        width: percentage(math.div(4, 12));
    }
}
</style>
