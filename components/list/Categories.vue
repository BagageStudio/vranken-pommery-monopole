<template>
    <div class="container">
        <div class="products-list">
            <LinkTo
                v-for="category in categories"
                :key="category.id"
                class="product-card"
                shop
                :link="handleShopItem(category)"
            >
                <div class="product-image">
                    <FastImage :image="category.image" contains />
                </div>
                <div class="product-details">
                    <span class="product-title">{{ category.title }}</span>
                </div>
            </LinkTo>
        </div>
    </div>
</template>

<script>
import { handleShopItem } from '~/api/dato/helpers/data';

export default {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    methods: {
        handleShopItem
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
    position: relative;
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
