<template>
    <div class="container">
        <div class="product-tasting container-s">
            <div class="wrapper-txt content-pad">
                <span v-if="data.tastingLabel" class="small-title">{{ data.tastingLabel }}</span>
                <h3 v-if="data.tastingTitle" class="tasting-title h3">{{ data.tastingTitle }}</h3>
                <div
                    v-if="data.tastingDescription"
                    class="tasting-description wysiwyg"
                    v-html="data.tastingDescription"
                />
            </div>
            <div v-if="data.tastingImage" class="wrapper-image content-pad">
                <FastImage
                    :image="data.tastingImage"
                    :caption="data.tastingImageCaption ? data.tastingImageCaption : ''"
                    cover
                />
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
        }
    }
};
</script>
<style lang="scss" scoped>
.product-tasting {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 50px;
}
.tasting-title {
    margin: 20px 0 40px;
}
.wrapper-image {
    margin-top: 50px;
    ::v-deep .container-image {
        aspect-ratio: 1 / 1.15;
    }
}

@media (min-width: $phone) {
    .wrapper-image {
        width: percentage(math.div(4, 6));
    }
}
@media (min-width: $tablet) {
    .product-tasting {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .wrapper-image {
        flex: 0 0 auto;
        width: 50%;
        ::v-deep .container-image {
            aspect-ratio: 1 / 0.93;
        }
    }
}
@media (min-width: $desktop) {
    .product-tasting {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .wrapper-txt {
        width: percentage(math.div(4, 10));
    }
}
</style>
