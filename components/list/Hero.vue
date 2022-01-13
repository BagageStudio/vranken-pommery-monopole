<template>
    <div class="list-hero">
        <div class="container">
            <div class="content-pad">
                <span class="hero-subtitle h5">{{ data.brand.title }}</span>
                <h1 class="hero-title h1">{{ data.cuvee.title }}</h1>
            </div>
        </div>
        <div class="container container-tabs">
            <div class="wrapper-hero-tabs content-pad">
                <div class="hero-tabs">
                    <LinkTo
                        v-for="cat in siblingsCategories"
                        :key="cat.id"
                        :class="{ selected: cat.slug === $route.params.category }"
                        shop
                        :link="cat"
                    >
                        {{ cat.title }}
                    </LinkTo>
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
        },
        siblingsCategories: {
            type: Array,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.list-hero {
    padding: 50px 0;
    text-align: center;
}
.hero-title {
    margin-bottom: 60px;
}
.hero-subtitle {
    margin-bottom: 15px;
    color: $grey-2;
}
.wrapper-hero-tabs {
    overflow-x: auto;
    padding-top: 10px;
    padding-bottom: 10px;
}
.hero-tabs {
    white-space: nowrap;
    a {
        position: relative;
        margin: 0 40px;
        text-decoration: none;
        color: $blue;
        white-space: nowrap;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -5px;
            height: 1px;
            background-color: currentColor;
            transform-origin: 0 0;
            transform: scaleX(0);
            transition: transform 0.2s ease-out;
        }
        &:hover,
        &:focus,
        &.selected {
            &::after {
                transform: scaleX(1);
            }
        }
    }
}

.container-tabs {
    padding: 0;
}

@media (min-width: $tablet) {
    .container-tabs {
        padding: 0 10px;
    }
}

@media (min-width: $desktop) {
    .hero-tabs {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        white-space: normal;
        a {
            margin-bottom: 40px;
        }
    }
    .container-tabs {
        padding: 0 80px;
    }
}
</style>
