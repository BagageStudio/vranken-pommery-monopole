<template>
    <div class="slider">
        <div class="container">
            <div class="slider-inner" :style="{ height: `${biggerHeight}px` }">
                <div
                    v-for="(slide, index) in data"
                    :key="slide.id"
                    ref="slide"
                    :class="[{ active: index === activeSlide }, slideClasses[index]]"
                    class="slide"
                >
                    <div class="content-pad image-wrapper">
                        <FastImage :image="slide.image" cover />
                    </div>
                    <div class="text content-pad">
                        <h5 class="h5">{{ slide.date }}</h5>
                        <h3 class="h3">{{ slide.title }}</h3>
                        <p class="description">{{ slide.description }}</p>
                    </div>
                </div>
                <div class="content-pad controls-wrapper">
                    <div class="controls">
                        <span class="counter"
                            ><strong>{{ activeSlide + 1 }}</strong> / {{ data.length }}</span
                        >
                        <div class="bullets">
                            <button
                                v-for="(bullet, indexBullet) in data"
                                :key="bullet.id"
                                class="bullet"
                                :class="{ active: indexBullet === activeSlide }"
                                @click="clickBullet(indexBullet)"
                            ></button>
                        </div>
                    </div>
                    <div v-show="autoplay" class="progress"><div ref="bar" class="bar"></div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gsap } from 'gsap';
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        activeSlide: 0,
        slideClasses: [],
        autoplay: true,
        autoplayTween: null,
        biggerHeight: 730
    }),
    computed: {
        ww() {
            return this.$store.state.superWindow ? this.$store.state.superWindow.width : 320;
        }
    },
    watch: {
        ww(w) {
            this.computeBiggerHeight();
        }
    },
    created() {
        this.slideClasses = this.calculateSlidePosition(0);
    },
    mounted() {
        this.startAutoplay();
        this.$nextTick(() => {
            this.computeBiggerHeight();
        });
    },
    methods: {
        startAutoplay() {
            if (!this.autoplay) return;
            gsap.set(this.$refs.bar, {
                scaleX: 0
            });
            this.autoplayTween = gsap.to(this.$refs.bar, {
                scaleX: 1,
                duration: 10,
                ease: 'linear',
                onComplete: () => {
                    const nextIndex = this.activeSlide + 1 > this.data.length - 1 ? 0 : this.activeSlide + 1;
                    this.changeSlide(nextIndex);
                    this.progress = 0;
                    this.startAutoplay();
                }
            });
        },
        clickBullet(index) {
            if (this.autoplay) {
                this.autoplay = false;
                this.autoplayTween.kill();
                this.autoplayTween = null;
            }
            this.changeSlide(index);
        },
        changeSlide(nextSlideIndex) {
            if (nextSlideIndex === this.activeSlide) return;

            this.slideClasses = this.calculateSlidePosition(nextSlideIndex);

            this.activeSlide = nextSlideIndex;
        },
        calculateSlidePosition(index) {
            return this.data.map((slide, slideIndex) => {
                if (slideIndex === index) {
                    if (this.activeSlide < index) {
                        return 'front';
                    } else {
                        return 'back';
                    }
                } else if (slideIndex > index) {
                    return 'front';
                } else {
                    return 'back';
                }
            });
        },
        computeBiggerHeight() {
            let height = 0;
            this.$refs.slide.forEach(f => (height = Math.max(f.clientHeight, height)));
            this.biggerHeight = height;
            console.log(this.biggerHeight);
        }
    }
};
</script>
<style lang="scss" scoped>
.fast-image {
    aspect-ratio: 1/1;
    width: 100%;
}
.slider {
    padding-top: 50px;
    padding-bottom: 75px;
    background-color: $beige;
}
.h5 {
    margin-top: 50px;
    color: $gold;
}
.h3 {
    margin: 40px 0 15px;
    color: $grey-1;
}

.controls {
    display: flex;
    align-items: center;
}

.counter {
    color: $grey-2;
    margin-right: 30px;
    user-select: none;
    strong {
        font-weight: normal;
        color: $gold;
    }
}

.bullets {
    display: flex;
}

.bullet {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $gold;
    margin-right: 10px;
    opacity: 0.4;
    transition: opacity 0.2s;
    &.active {
        opacity: 1;
    }
}

.slider-inner {
    position: relative;
}

.slide:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.text {
    pointer-events: none;
    user-select: none;
}

.slide {
    .text,
    .image-wrapper {
        opacity: 0;
        transition: 0.5s cubic-bezier(0.33, 1, 0.68, 1);
        transition-property: opacity, transform;
    }

    &.back {
        .image-wrapper {
            transform: translateY(-100px) scale(0.8);
        }
        .text {
            transform: translateY(-100px);
        }
    }
    &.front {
        .image-wrapper {
            transform: translateY(100px) scale(1.1);
        }
        .text {
            transform: translateY(100px);
        }
    }
    &.active {
        .text,
        .image-wrapper {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}

.controls-wrapper {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -25px;
    left: 0;
    right: 0;
}

.progress-ring {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}

.progress {
    flex-grow: 1;
    height: 1px;
    margin-left: 40px;
    background-color: rgba($gold, 0.4);
    .bar {
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
        background-color: $gold;
        transform: scaleX(0);
    }
}

@media (min-width: $phone) {
    .fast-image {
        aspect-ratio: none;
        height: 400px;
    }
}
@media (min-width: $tablet) {
    .controls-wrapper {
        width: 50%;
        margin-left: auto;
        margin-top: -25px;
        position: relative;
        bottom: auto;
        left: auto;
        right: auto;
    }
    .controls {
        margin-top: 0;
    }
    .description {
        margin-bottom: 65px;
    }
    .slider {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .slide {
        display: flex;
    }
    .image-wrapper {
        width: 50%;
    }
    .h5 {
        margin-top: 0;
    }
    .text {
        width: 50%;
        align-self: flex-end;
    }
}

@media (min-width: $desktop-small) {
    .text {
        width: 40%;
    }
    .controls-wrapper {
        width: 40%;
        margin-right: percentage(math.div(1, 10));
    }
}

@media (min-width: $desktop) {
    .slider {
        padding-top: 120px;
        padding-bottom: 120px;
    }
    .image-wrapper {
        width: percentage(math.div(5, 12));
        margin-left: percentage(math.div(1, 12));
        margin-right: percentage(math.div(1, 12));
    }
    .fast-image {
        aspect-ratio: 1/1;
        height: auto;
    }
    .text {
        width: percentage(math.div(4, 12));
    }
    .controls-wrapper {
        width: percentage(math.div(4, 12));
        margin-right: percentage(math.div(1, 12));
    }
}

@media (min-width: $desktop-xxl) {
    .image-wrapper {
        margin-left: percentage(math.div(2, 12));
    }
    .text {
        width: percentage(math.div(3, 12));
    }
    .controls-wrapper {
        width: percentage(math.div(3, 12));
        margin-right: percentage(math.div(1, 12));
    }
}
</style>
