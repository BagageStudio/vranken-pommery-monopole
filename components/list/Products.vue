<template>
    <div class="container">
        <div class="products-list">
            <div
                v-for="product in productsToShow"
                :key="product.id"
                class="product-card"
                :class="{ 'wrapper-mood-image': product._modelApiKey !== 'product' }"
            >
                <LinkTo v-if="product._modelApiKey === 'product'" shop :link="product">
                    <div class="product-image">
                        <FastImage class="product-thumbnail" :image="product.image" contains />
                        <button
                            class="quick-add snipcart-add-item"
                            :data-item-id="product.uuid"
                            :data-item-price="product.price"
                            :data-item-image="product.image.url"
                            :data-item-name="product.title"
                            :data-item-description="product.shoppingCartDescription"
                            :data-item-quantity="1"
                        >
                            <Icon name="cart-add" />
                        </button>
                    </div>
                    <div class="product-details">
                        <span class="product-title">{{ product.listTitle }}</span>
                        <span class="product-type">{{ product.productType }}</span>
                        <span class="product-price">{{
                            $options.filters.formatNumber(product.price, $store.$i18n)
                        }}</span>
                    </div>
                </LinkTo>
                <div v-else>
                    <div class="mood-image">
                        <FastImage :image="product" cover />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="canLoadMore" class="load-more content-pad">
            <button class="btn-block grey" @click="loadMore">
                {{ $t('list.moreLabel') }}
            </button>
        </div>
    </div>
</template>

<script>
const NUMBER_BY_LOAD = 18;
export default {
    props: {
        products: {
            type: Array,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        productsToShow: [],
        productsWithMoodImages: []
    }),
    computed: {
        canLoadMore() {
            return this.productsWithMoodImages.length > this.productsToShow.length;
        }
    },
    created() {
        this.productsWithMoodImages = this.createdProductsWithMoodImages();
        this.productsToShow = this.productsWithMoodImages.slice(0, NUMBER_BY_LOAD);
    },
    methods: {
        loadMore() {
            const productsLeft = this.productsWithMoodImages.length - this.productsToShow.length;
            const offset = this.productsToShow.length;
            const numberOfProductsToAdd = Math.min(productsLeft, NUMBER_BY_LOAD);
            const productsToAdd = this.productsWithMoodImages.slice(offset, offset + numberOfProductsToAdd);
            this.productsToShow.push(...productsToAdd);
        },
        createdProductsWithMoodImages() {
            const moodImages = this.data.moodImages;

            // If no mood image we just return the products without them
            if (!moodImages || !moodImages.length) return this.products;

            // Interval is the distance we count before adding a mood image, sometimes it's 3 after the last mood image ans sometimes it's 7
            const intervalFromStep = {
                odd: 3,
                even: 7
            };

            // The step needed to calculate the interval. Changing between "odd" and "even"
            let step = 'odd';

            // Init values needed in the loop
            let currentInterval = 0;
            let indexOfMoodImageToAdd = 0;

            const productsWithMoodImages = this.products.reduce((acc, cur) => {
                // Checking if we need to add a mood image
                if (step === 'odd' && currentInterval === intervalFromStep.odd) {
                    // We add the mood image if it's the moment
                    acc.push(moodImages[indexOfMoodImageToAdd]);

                    // Calculating the index of the next mood image to add
                    indexOfMoodImageToAdd =
                        indexOfMoodImageToAdd + 1 <= moodImages.length - 1 ? indexOfMoodImageToAdd + 1 : 0;

                    // Changing the step and reseting the interval
                    step = 'even';
                    currentInterval = 0;
                } else if (step === 'even' && currentInterval === intervalFromStep.even) {
                    // We add the mood image if it's the moment
                    acc.push(moodImages[indexOfMoodImageToAdd]);

                    // Calculating the index of the next mood image to add
                    indexOfMoodImageToAdd =
                        indexOfMoodImageToAdd + 1 <= moodImages.length - 1 ? indexOfMoodImageToAdd + 1 : 0;

                    // Changing the step and reseting the interval
                    step = 'odd';
                    currentInterval = 0;
                }

                // We add the current product after the potential mood image
                acc.push(cur);

                // We update the interval
                currentInterval++;

                return acc;
            }, []);

            return productsWithMoodImages;
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
    > a {
        text-decoration: none;
    }
    &:hover {
        .product-thumbnail {
            transform: scale(1.1);
        }
        .quick-add {
            transform: scale(1);
            opacity: 1;
        }
    }
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

.wrapper-mood-image {
    display: none;
}

.quick-add {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    color: $white;
    background: $gold;
    opacity: 0;
    transform-origin: 100% 0;
    transition: 0.2s ease-out;
    transform: scale(0.8);
    .icon {
        width: 30px;
        height: 30px;
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

.load-more {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
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
    .load-more {
        margin-bottom: 80px;
    }
}
@media (min-width: $tablet) {
    .product-card {
        width: calc(33.333% - #{2 * $gutter});
    }
    .wrapper-mood-image {
        display: block;
    }
    .mood-image {
        aspect-ratio: 1 / 1;
        .fast-image {
            width: 100%;
            height: 100%;
        }
    }
}
@media (min-width: $desktop) {
    .product-image {
        padding: 45px;
    }
}
</style>
