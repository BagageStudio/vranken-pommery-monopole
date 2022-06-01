<template>
    <div class="container">
        <div class="flacons-list">
            <nuxt-link v-for="flacon in flacons" :key="flacon.id" class="flacon-card" :to="getLink(flacon)">
                <div class="flacon-image">
                    <!-- <FastImage :image="flacon.image" contains /> -->
                    <img
                        width="854"
                        height="854"
                        loading="eager"
                        src="~static/img/millesimes.png"
                        alt="Flacon d'exception"
                    />
                    <span class="flacon-year">{{ flacon.year }}</span>
                </div>
                <div class="flacon-details">
                    <span class="flacon-title">{{ flacon.listTitle }}</span>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import { routeByApiModels } from '~/app/crawler/routes';

export default {
    props: {
        flacons: {
            type: Array,
            required: true
        }
    },
    methods: {
        getLink(flacon) {
            return this.localePath({
                name: routeByApiModels[flacon._modelApiKey].routerFormat,
                params: { slug: flacon.slug }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.flacons-list {
    display: flex;
    flex-direction: column;
}
.flacon-card {
    margin: 0 $gutter 40px;
    text-decoration: none;
}
.flacon-image {
    position: relative;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px;
    background: $beige;
    > img {
        position: absolute;
        width: 100%;
    }
}
.flacon-year {
    position: relative;
    font-family: $plex-serif;
    font-style: italic;
    font-size: 5.6rem;
    line-height: 73px;
    text-align: center;
    color: $gold;
}
.flacon-details {
    margin-top: 20px;
    > span {
        display: block;
    }
}
.flacon-title {
    font-family: $plex-serif;
    font-size: 1.8rem;
    line-height: 23px;
    color: $grey-1;
}

@media (min-width: $phone) {
    .flacons-list {
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .flacon-card {
        width: calc(50% - #{2 * $gutter});
        margin-bottom: 60px;
    }
}
@media (min-width: $tablet) {
    .flacon-card {
        width: calc(33.333% - #{2 * $gutter});
    }
}
@media (min-width: $desktop) {
    .flacon-image {
        padding: 45px;
    }
}
@media (min-width: $desktop-large) {
    .flacon-year {
        font-size: 7.2rem;
        line-height: 94px;
    }
}
</style>
