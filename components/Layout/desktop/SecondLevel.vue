<template>
    <li class="second-item">
        <button
            v-if="data.items"
            class="second-label"
            :class="{ selected: show }"
            aria-expanded="false"
            aria-hidden="false"
            @click="$emit('changeLevel', data.id)"
        >
            <span>{{ data.label }}</span>
        </button>
        <LinkTo v-else class="second-label" :link="data.link" hide-label @mouseenter.native="changeImage(data)">
            <span>{{ data.label }}</span>
        </LinkTo>
        <div v-if="data.items" :class="{ show }" class="third-level">
            <div ref="thirdLevel" class="third-menu-wrapper">
                <ul class="third-menu content-pad">
                    <li
                        v-for="thirdLevel in data.items"
                        :key="thirdLevel.id"
                        class="third-item"
                        @mouseenter="changeImage(thirdLevel)"
                    >
                        <LinkTo class="third-label" :link="thirdLevel.link" hide-label>
                            <span>{{ thirdLevel.label }}</span>
                        </LinkTo>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</template>
<script>
import { wait } from '~/assets/js/utils';
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        firstItemId: {
            type: String,
            required: true
        },
        parentId: {
            type: String,
            required: true
        },
        selected: {
            type: String,
            required: false,
            default: null
        }
    },
    data: () => ({
        show: false
    }),
    computed: {},
    watch: {
        selected(selected) {
            // if selected is null it's because the secondLevel was closed so we reset to the first item
            if (!selected) {
                if (this.firstItemId === this.data.id && !this.show) {
                    this.showImmediate();
                }
                if (this.firstItemId !== this.data.id && this.show) {
                    this.show = false;
                }
            }

            if (selected) {
                if (selected === this.data.id) {
                    this.appear();
                } else {
                    this.show = false;
                }
            }
        }
    },
    mounted() {
        // We set the first item to show the first time
        this.$nextTick(() => {
            if (this.firstItemId === this.data.id && this.data.items) {
                this.showImmediate();
            }
        });
        // Just to trigger the min-height calculation
        if (!this.data.items) this.$emit('changeHeight', 1);
    },
    methods: {
        showImmediate() {
            if (!this.data.items) return;
            this.$emit('changeHeight', this.$refs.thirdLevel.offsetHeight);
            this.show = true;
        },
        async appear() {
            this.$emit('changeImage', this.data.items[0].image);
            this.$emit('changeHeight', this.$refs.thirdLevel.offsetHeight);
            await wait(200);
            this.show = true;
        },
        changeImage(item) {
            this.$emit('changeImage', item.image);
        }
    }
};
</script>
<style lang="scss" scoped>
.second-item {
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
}
.second-label {
    color: $grey-1;
    font-family: $plex-serif;
    font-size: 2.8rem;
    text-align: left;
    text-decoration: none;
    transition: color 0.2s ease-out;
    &.selected,
    &:hover,
    &:focus {
        color: $gold;
    }
}
.third-level {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100%;
    width: 100%;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    transition: opacity 0s linear;
    &.show {
        opacity: 1;
        overflow: visible;
        pointer-events: all;
        transition: opacity 0.2s ease-out;
    }
}

.third-menu-wrapper {
    padding: 60px;
}
.third-item {
    margin-bottom: 25px;
    &:last-child {
        margin-bottom: 0;
    }
}
.third-label {
    position: relative;
    text-decoration: none;
    font-size: 1.5rem;
    color: $blue;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -5px;
        height: 1px;
        width: 100%;
        background-color: currentColor;
        transform-origin: 0 0;
        transform: scaleX(0);
        transition: transform 0.2s ease-out;
    }
    &:hover {
        &::after {
            transform: scaleX(1);
        }
    }
}
</style>
