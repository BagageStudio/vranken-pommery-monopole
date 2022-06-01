<template>
    <li class="main-item">
        <button
            class="main-label"
            aria-expanded="false"
            aria-hidden="false"
            @click="bus.$emit('changeLevel', 2, data.id)"
        >
            <span>{{ data.label }}</span>
            <Icon name="arrow-right" />
        </button>
        <div v-show="levels.second === data.id" class="second-level">
            <button class="back-button-wrapper" @click="bus.$emit('changeLevel', 1, data.id)">
                <div class="container">
                    <div class="content-pad back-button">
                        <Icon name="arrow-right" />
                        <span>{{ data.label }}</span>
                    </div>
                </div>
            </button>
            <div class="container second-menu-wrapper">
                <ul class="second-menu content-pad">
                    <LayoutMobileSecondLevel
                        v-for="secondLevel in data.items"
                        :key="secondLevel.id"
                        :data="secondLevel"
                        :bus="bus"
                        :levels="levels"
                    />
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
.main-label {
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
    .icon {
        height: 10px;
        width: 6px;
        margin-right: 6px;
    }
}

.main-item {
    &:last-child .main-label {
        border-bottom: none;
    }
}

.second-level {
    position: absolute;
    left: 100%;
    width: 100%;
    top: calc(var(--mobile-search-header-height) * (-1));
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

.second-menu-wrapper {
    width: 100%;
}

.second-menu {
    margin: 0;
    width: 100%;
}
</style>
