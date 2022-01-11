<template>
    <li class="main-item">
        <button
            class="main-label"
            :class="{ selected: show }"
            aria-expanded="false"
            aria-hidden="false"
            @click="changeTopLevel"
        >
            <span>{{ data.label }}</span>
        </button>
        <div :class="{ show }" class="second-level">
            <div class="second-level-inner" :style="{ '--height': height }">
                <div class="container second-menu-wrapper">
                    <div class="second-menu-area">
                        <div ref="secondLevel" class="second-menu">
                            <ul class="content-pad">
                                <LayoutDesktopSecondLevel
                                    v-for="secondLevel in data.items"
                                    :key="secondLevel.id"
                                    ref="submenu"
                                    :data="secondLevel"
                                    :levels="levels"
                                    :bus="bus"
                                    :first-item-id="data.items[0].id"
                                    @changeHeight="changeHeight"
                                    @changeImage="changeImage"
                                />
                            </ul>
                        </div>
                        <div v-show="data.items[0].items" class="submenu-area"></div>
                    </div>
                    <div class="image-area">
                        <FastImage v-if="image" :image="image" cover />
                    </div>
                </div>
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
        height: 'auto',
        image: null
    }),
    computed: {
        show() {
            return this.levels.second === this.data.id;
        }
    },
    created() {
        this.image = this.data.items[0].items ? this.data.items[0].items[0].image : this.data.items[0].image;
    },
    methods: {
        changeHeight(h) {
            const secondLevelHeight = this.$refs.secondLevel.offsetHeight;
            const biggerHeight = secondLevelHeight > h ? secondLevelHeight + 'px' : h + 'px';
            this.height = biggerHeight;
        },
        changeTopLevel() {
            if (this.levels.second === this.data.id) {
                this.bus.$emit('changeLevel', 2, null);
            } else {
                this.bus.$emit('changeLevel', 2, this.data.id);
            }
        },
        changeImage(image) {
            this.image = image;
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
    max-height: calc(100vh - var(--header-height));
    overflow-y: auto;
    overflow-x: hidden;
    // 1px for the bottom border
    transform: translateY(calc(-100% - 1px));
    transition: transform 0.3s ease-in-out;
    z-index: -1;
    &.show {
        transform: translateY(0);
    }
}

.second-level-inner {
    height: var(--height);
    transition: height 0.2s ease-out;
}

.second-menu-area {
    display: flex;
    width: percentage(math.div(2, 3));
}

.second-menu {
    position: relative;
    width: 50%;
    align-self: flex-start;
    flex-shrink: 0;
    padding: 60px 0 60px $grid-gutter-l;
    > ul {
        margin: 0;
        padding-right: 0;
    }
}
.second-menu-wrapper {
    position: relative;
    display: flex;
    padding: 0;
    height: 100%;
}
.submenu-area {
    width: 50%;
    flex-shrink: 0;
    background-color: $beige;
}
.image-area {
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc((100vw - #{$desktop-xxl}) / -2);
    display: flex;
    align-items: center;
    width: calc(33.333% + ((100vw - #{$desktop-xxl}) / 2));
    overflow: hidden;
}
</style>
