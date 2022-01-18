<template>
    <div class="wrapper-text-image">
        <div class="wrapper-txt content-pad">
            <span v-if="data.label" class="small-title">{{ data.label }}</span>
            <h2 v-if="data.title" class="title h3">{{ data.title }}</h2>
            <div class="text wysiwyg" v-html="data.text" />
        </div>
        <div v-if="data.image" class="wrapper-image content-pad">
            <FastImage :image="data.image" :caption="data.imageCaption ? data.imageCaption : ''" />
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
.wrapper-text-image {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
}
.title {
    margin: 20px 0 40px;
}
.wrapper-image {
    margin-top: 50px;
}

@media (min-width: $phone) {
    .wrapper-image {
        width: percentage(math.div(4, 6));
    }
}
@media (min-width: $tablet) {
    .wrapper-text-image {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        + .wrapper-text-image {
            &:nth-child(odd) {
                flex-direction: row-reverse;
            }
        }
    }
    .wrapper-image {
        flex: 0 0 auto;
        width: percentage(math.div(4, 10));
        margin-top: 0;
        margin-left: percentage(math.div(1, 10));
    }
}
@media (min-width: $desktop) {
    .wrapper-text-image {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .wrapper-txt {
        width: percentage(math.div(4, 10));
    }
    .wrapper-image {
        width: 50%;
        margin-left: 0;
    }
}
</style>
