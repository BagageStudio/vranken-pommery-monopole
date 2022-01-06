<template>
    <li class="main-item">
        <button
            class="main-label"
            :class="{ selected: levels.second === data.id }"
            aria-expanded="false"
            aria-hidden="false"
            @click="changeTopLevel"
        >
            <span>{{ data.label }}</span>
        </button>
        <div v-show="levels.second === data.id" class="second-level">
            <div class="container second-menu-wrapper">
                <div class="second-menu">
                    <ul class="content-pad">
                        <LayoutDesktopSecondLevel
                            v-for="secondLevel in data.items"
                            :key="secondLevel.id"
                            :data="secondLevel"
                            :levels="levels"
                            :bus="bus"
                            :first-item-id="data.items[0].id"
                        />
                    </ul>
                </div>
                <div v-show="data.items[0].items" class="submenu-area"></div>
                <div class="image-area"></div>
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
    data: () => ({
        show: false
    }),
    methods: {
        changeTopLevel() {
            if (this.levels.second === this.data.id) {
                this.bus.$emit('changeLevel', 2, null);
            } else {
                this.bus.$emit('changeLevel', 2, this.data.id);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.main-label {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 1.5rem;
    color: $grey-1;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        height: 1px;
        width: 100%;
        background-color: $grey-1;
        transform: scaleX(0);
        transition: 0.2s ease-out;
    }
    &.selected {
        &::after {
            transform: scaleX(1);
        }
    }
}
.second-level {
    position: absolute;
    left: 0;
    right: 0;
    // 1px for the bottom border
    top: calc(100% + 1px);
    background-color: $white;
}
.second-menu {
    position: relative;
    width: percentage(math.div(1, 3));
    flex-shrink: 0;
    padding: 60px 0 60px $grid-gutter-l;
    > ul {
        margin: 0;
        padding-right: 0;
    }
}
.second-menu-wrapper {
    padding: 0;
    position: relative;
    display: flex;
}
.submenu-area {
    width: percentage(math.div(1, 3));
    flex-shrink: 0;
    background-color: $beige;
}
.image-area {
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc((100vw - #{$desktop-xxl}) / -2);
    width: calc(33.333% + ((100vw - #{$desktop-xxl}) / 2));
    background: linear-gradient(332deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
}
</style>
