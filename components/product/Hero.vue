<template>
    <div class="product-hero container">
        <div class="wrapper-product-top">
            <div class="wrapper-product-image">
                <div class="product-image">
                    <FastImage :image="data.image" contains />
                </div>
            </div>
            <div class="wrapper-product-description">
                <span class="product-type">{{ data.productType }}</span>
                <h1 class="product-title h2">{{ data.title }}</h1>
                <div class="wrapper-quantity-order">
                    <ProductQuantity v-model="quantity" />
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
                        <Icon name="cart" />
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
        }
    },
    data: () => ({
        quantity: 1
    }),
    methods: {
        updateQuantity(quantity) {
            this.quantity = quantity;
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
.wrapper-quantity-order {
    display: flex;
    align-items: center;
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

@media (min-width: $tablet) {
    .wrapper-product-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .wrapper-product-image {
        width: percentage(math.div(4, 10));
        &::before {
            width: 50vw;
            right: $gutter;
            left: auto;
        }
    }
    .product-image {
        min-height: 450px;
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
        &::before {
            width: 50vw;
            right: percentage(math.div(1, 6));
            left: auto;
        }
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
    .product-image {
        width: percentage(math.div(6, 7));
        padding: 120px;
    }
    .wrapper-product-description {
        width: percentage(math.div(4, 12));
    }
}
</style>
