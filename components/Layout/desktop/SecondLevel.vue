<template>
    <li class="second-item">
        <button
            class="second-label"
            :class="{ selected: show }"
            aria-expanded="false"
            aria-hidden="false"
            @click="bus.$emit('changeLevel', 3, data.id)"
        >
            <span>{{ data.label }}</span>
        </button>
        <div :class="{ show, ovv }" class="third-level">
            <div ref="thirdLevel" class="third-menu-wrapper">
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
import { wait } from '~/assets/js/utils';
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        levels: {
            type: Object,
            required: true
        },
        bus: {
            type: Object,
            required: true
        },
        firstItemId: {
            type: String,
            required: true
        }
    },
    data: () => ({
        show: false
    }),
    computed: {
        shouldShow() {
            return this.levels.third ? this.levels.third === this.data.id : this.firstItemId === this.data.id;
        }
    },
    watch: {
        async shouldShow(show) {
            if (show) {
                this.$emit('changeHeight', this.$refs.thirdLevel.offsetHeight);
                await wait(200);
                this.show = true;
            } else {
                this.show = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.firstItemId === this.data.id) {
                this.$emit('changeHeight', this.$refs.thirdLevel.offsetHeight);
                this.show = true;
            }
        });
    },
    methods: {}
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
    &.selected {
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

@keyframes delay-overflow {
    from {
        overflow: hidden;
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
    text-decoration: none;
    font-size: 1.5rem;
    color: $blue;
}
</style>
