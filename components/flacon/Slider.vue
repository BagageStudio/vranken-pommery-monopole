<template>
    <div class="slider">
        <div class="container">
            <div class="slider-inner">
                <div
                    v-for="(slide, index) in data"
                    :key="slide.id"
                    :class="{ active: index === activeSlide }"
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
                                @click="changeSlide(indexBullet)"
                            ></button>
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
            type: Array,
            required: true
        }
    },
    data: () => ({
        activeSlide: 0
    }),
    methods: {
        changeSlide(index) {
            this.activeSlide = index;
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
    padding-bottom: 50px;
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
    margin-top: 40px;
}

.counter {
    color: $grey-2;
    margin-right: 30px;
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

.slide {
    opacity: 0;
    transition: opacity 0.3s;
    &.active {
        opacity: 1;
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
        width: percentage(math.div(3.5, 12));
    }
    .controls-wrapper {
        width: percentage(math.div(3.5, 12));
        margin-right: percentage(math.div(0.5, 12));
    }
}
</style>