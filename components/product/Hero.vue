<template>
    <div class="product-hero container">
        <div class="wrapper-product-top">
            <div class="wrapper-product-image">
                <LinkTo shop class="btn-back" :link="backLink">
                    <Icon name="arrow-left" />
                    <span>{{ $t('global.backLabel') }}</span>
                </LinkTo>
                <div class="product-image">
                    <FastImage :image="data.image" contains />
                </div>
                <div v-if="data.secondImage" class="second-image" :class="{ show: showSecondImage }">
                    <FastImage :image="data.secondImage" cover />
                </div>
                <div v-if="data.secondImage" class="arrows">
                    <button class="arrow" @click="changeImage"><Icon name="arrow-left" /></button>
                    <button class="arrow" @click="changeImage"><Icon name="arrow-right" /></button>
                </div>
            </div>
            <div class="wrapper-product-description">
                <span class="product-type">{{ data.productType }}</span>
                <h1 class="product-title h2">{{ data.title }}</h1>
                <div class="wrapper-price-availability">
                    <span class="product-price h3">{{ $options.filters.formatNumber(data.price, $store.$i18n) }}</span>
                    <ProductAvailability :available="available" />
                </div>
                <div v-if="available" class="wrapper-quantity-order">
                    <ProductQuantity v-model="quantity" :max="maxStock" />
                    <button
                        class="btn-block bg-blue btn-order snipcart-add-item"
                        :data-item-id="data.uuid"
                        :data-item-price="data.price"
                        :data-item-image="data.image.url"
                        :data-item-name="data.title"
                        :data-item-description="data.shoppingCartDescription"
                        :data-item-quantity="quantity"
                    >
                        <span>{{ $t('global.orderLabel') }}</span>
                        <Icon name="cart-add" />
                    </button>
                </div>
                <div class="product-description wysiwyg" v-html="data.description.description" />
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
            type: Object,
            required: true
        }
    },
    data: () => ({
        quantity: 1,
        availableInStock: true,
        showSecondImage: false,
        maxStock: 100
    }),
    computed: {
        available() {
            return this.availableInStock && !this.data.forceUnavailable;
        }
    },
    async created() {
        if (!process.browser) return;

        try {
            const { product } = await this.$axios
                .post('/.netlify/functions/getProduct', {
                    id: this.data.uuid
                })
                .then(res => res.data)
                .catch(e => {
                    console.log('error');
                });

            const stock = product.stock;

            if (stock === 0) this.availableInStock = false;

            if (stock && stock < 100) this.maxStock = stock;
        } catch (error) {
            console.log('error');
        }
    },
    methods: {
        changeImage() {
            this.showSecondImage = !this.showSecondImage;
        }
    }
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
        background: $beige;
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
    max-width: 500px;
    width: 100%;
    aspect-ratio: 1 / 1;
    padding: 40px;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}

.second-image {
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.2s ease-out;
    .fast-image {
        height: 100%;
        width: 100%;
    }
    &.show {
        opacity: 1;
    }
}

.arrows {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
        width: 10px;
    }
}

.arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
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
    margin-top: 10px;
}
.product-price {
    flex: 0 0 auto;
    min-width: 168px;
    margin: 0 20px 0 0;
}
.wrapper-quantity-order {
    display: flex;
    // align-items: center;
    flex-direction: column;
    // align-items: flex-start;
    justify-content: space-between;
    margin-top: 30px;
}
.wrapper-quantity {
    flex: 0 0 auto;
    margin-right: 20px;
}
.btn-order {
    flex: 1 1 auto;
}
.product-description {
    margin: 50px 0 0;
    padding-top: 50px;
    border-top: 1px solid $grey-3;
}

@media (min-width: $phone-small) {
    .wrapper-quantity-order {
        flex-direction: row;
        align-items: flex-start;
    }
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
        min-height: 450px;
    }
    .wrapper-product-description {
        flex: 0 0 auto;
        width: 50%;
        padding-bottom: 0;
    }
    .second-image {
        right: $gutter;
        left: $gutter;
    }
    .arrows {
        right: $gutter;
        left: $gutter;
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
        max-width: none;
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

    .second-image {
        right: percentage(math.div(1, 7));
    }

    .arrows {
        right: percentage(math.div(1, 7));
    }
    .arrow {
        width: 60px;
    }

    .product-image {
        width: percentage(math.div(6, 7));
        padding: 80px 80px 80px 90px;
    }
    .wrapper-product-description {
        width: percentage(math.div(4, 12));
    }
}
</style>
