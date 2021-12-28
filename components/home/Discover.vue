<template>
    <div class="discover">
        <div class="container">
            <div class="container-s">
                <h2 class="discover-title content-pad">{{ data.discoverIntro }}</h2>
                <div class="discover-brands">
                    <div v-for="card in data.discoverBrands" :key="card.id" class="brand-card">
                        <div class="wrapper-logo">
                            <FastImage :image="card.logo" contains />
                        </div>
                    </div>
                </div>
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
    }
};
</script>
<style lang="scss" scoped>
.discover {
    padding: 50px 0 40px;
}
.discover-title {
    max-width: 740px;
    margin: 0 auto;
    font-family: $plex-serif;
    font-size: 2.5rem;
    font-style: italic;
    font-weight: 400;
    line-height: 40px;
    text-align: center;
    color: $gold;
}
.discover-brands {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
}
.brand-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - #{$gutter * 2});
    height: 200px;
    margin: 10px #{$gutter};
    border: 1px solid $grey-3;
}
.wrapper-logo {
    width: 220px;
    height: 110px;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}

@media (min-width: $phone) {
    .discover-brands {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
    }
    .brand-card {
        width: calc(50% - #{$gutter * 2});
    }
}
@media (min-width: $desktop) {
    .discover {
        padding: 100px 0 80px;
    }
    .brand-card {
        width: calc(33.3333% - #{$gutter * 2});
        margin: 20px #{$gutter};
    }
}
</style>
