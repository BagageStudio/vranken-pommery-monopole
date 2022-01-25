<template>
    <div v-if="data" class="wrapper-classic">
        <div class="container">
            <div class="container-s">
                <div class="exception-wrapper-title content-pad">
                    <span v-if="data.flaconsException.preTitle" class="pre-title">{{
                        data.flaconsException.preTitle
                    }}</span>
                    <h1 class="h2 exception-title">{{ data.flaconsException.title }}</h1>
                </div>
                <ModuleTextImage v-for="module in data.flaconsException.content" :key="module.id" :data="module" />
            </div>
        </div>
        <div class="collection">
            <div class="container">
                <div class="container-s">
                    <h3 class="collection-title h3 content-pad">{{ data.flaconsException.collectionTitle }}</h3>
                </div>
            </div>
            <ListFlacons v-if="flaconsToShow.length" :flacons="flaconsToShow" />
            <div class="container">
                <div v-if="canLoadMore" class="load-more content-pad">
                    <button class="btn-block grey" @click="loadMore">
                        {{ $t('list.moreLabel') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const FLACONS_PER_LOAD = 9;
export default {
    props: {
        data: { type: Object, required: true }
    },
    data() {
        return {
            flaconsToShow: []
        };
    },
    computed: {
        canLoadMore() {
            return this.data.allFlaconExceptions.length > this.flaconsToShow.length;
        }
    },
    created() {
        this.flaconsToShow = this.data.allFlaconExceptions.slice(0, FLACONS_PER_LOAD);
    },
    methods: {
        loadMore() {
            const productsLeft = this.data.allFlaconExceptions.length - this.flaconsToShow.length;
            const offset = this.flaconsToShow.length;
            const numberOfProductsToAdd = Math.min(productsLeft, FLACONS_PER_LOAD);
            const productsToAdd = this.data.allFlaconExceptions.slice(offset, offset + numberOfProductsToAdd);
            this.flaconsToShow.push(...productsToAdd);
        }
    }
};
</script>

<style lang="scss" scoped>
.exception-wrapper-title {
    padding-bottom: 50px;
}
.pre-title {
    display: block;
    margin-bottom: 15px;
    font-family: $plex-sans;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 19px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $grey-2;
}
.exception-title {
    margin: 0;
    color: $gold;
}

.collection {
    padding-top: 50px;
}
.collection-title {
    text-align: center;
    margin: 0 0 40px;
}
.load-more {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
@media (min-width: $phone) {
    .exception-wrapper-title {
        text-align: center;
    }
}
@media (min-width: $tablet) {
    .exception-title {
        font-size: 5.5rem;
        line-height: 71px;
        letter-spacing: 0.02em;
    }
}
@media (min-width: $desktop-small) {
    .exception-wrapper-title {
        padding-bottom: 40px;
    }
    .collection {
        padding-top: 80px;
    }
}
</style>
