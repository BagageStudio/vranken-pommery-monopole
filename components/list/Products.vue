<template>
    <div class="container">
        <div class="products-list">
            <LinkTo v-for="product in products" :key="product.id" class="product-card" shop :link="product">
                <div class="product-image">
                    <FastImage :image="product.image" contains />
                </div>
                <div class="product-details">
                    <span class="product-title">{{ product.listTitle }}</span>
                    <span class="product-type">{{ product.productType }}</span>
                    <span class="product-price">{{ $options.filters.formatNumber(product.price, $store.$i18n) }}</span>
                </div>
            </LinkTo>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.products-list {
    display: flex;
    flex-direction: column;
}
.product-card {
    margin: 0 $gutter 40px;
    text-decoration: none;
}
.product-image {
    aspect-ratio: 1 / 1;
    padding: 35px;
    background: $beige;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
.product-details {
    margin-top: 20px;
    > span {
        display: block;
    }
}
.product-title {
    font-family: $plex-serif;
    font-size: 1.8rem;
    line-height: 23px;
    color: $grey-1;
}
.product-type {
    margin-top: 5px;
    font-size: 1.4rem;
    line-height: 18px;
    color: $grey-2;
}
.product-price {
    margin-top: 5px;
    font-family: $plex-serif;
    font-size: 1.4rem;
    line-height: 18px;
    color: $grey-1;
}

@media (min-width: $phone) {
    .products-list {
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .product-card {
        width: calc(50% - #{2 * $gutter});
        margin-bottom: 60px;
    }
}
@media (min-width: $tablet) {
    .product-card {
        width: calc(33.333% - #{2 * $gutter});
    }
}
@media (min-width: $desktop) {
    .product-image {
        padding: 45px;
    }
}
</style>
