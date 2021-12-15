<template>
    <li class="second-item">
        <button
            class="second-label"
            aria-expanded="false"
            aria-hidden="false"
            @click="bus.$emit('changeLevel', 3, data.id)"
        >
            <span>{{ data.label }}</span>
            <Icon name="arrow-right" />
        </button>
        <div v-show="levels.third === data.id" class="third-level">
            <button class="back-button-wrapper" @click="bus.$emit('changeLevel', 2)">
                <div class="container">
                    <div class="content-pad back-button">
                        <Icon name="arrow-right" />
                        <span>{{ data.label }}</span>
                    </div>
                </div>
            </button>
            <div class="container third-menu-wrapper">
                <ul class="third-menu content-pad">
                    <li v-for="thirdLevel in data.items" :key="thirdLevel.id" class="third-item">
                        <nuxt-link class="third-label" to="/">
                            <span>{{ thirdLevel.label }}</span>
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        bus: {
            type: Object,
            required: true
        },
        levels: {
            type: Object,
            required: true
        }
    },
    data: () => ({})
};
</script>
<style lang="scss" scoped>
.second-label,
.third-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 1.5rem;
    line-height: 1;
    color: $grey-1;
}

.second-label {
    font-family: $plex-serif;
    font-size: 2rem;
    line-height: 22px;
    .icon {
        height: 10px;
        width: 6px;
        margin-right: 6px;
    }
}

.third-label {
    text-decoration: none;
    color: $blue;
}

.second-item,
.third-item {
    &:last-child .second-label {
        border-bottom: none;
    }
}

.third-level {
    position: absolute;
    left: 100%;
    width: 100%;
    // top: calc(var(--mobile-search-header-height) * -1);
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: $white;
}

.back-button-wrapper {
    background-color: $beige;
}

.back-button {
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 1.5rem;
    line-height: 1;
    .icon {
        width: 5px;
        height: 9px;
        margin: 0 25px 0 5px;
        transform: rotate(180deg);
    }
}

.third-menu-wrapper {
    width: 100%;
}

.third-menu {
    margin: 0;
    width: 100%;
}
</style>
