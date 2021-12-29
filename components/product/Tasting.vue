<template>
    <div>
        <div class="container">
            <div class="container-s">
                <div class="product-tasting">
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
                <div v-if="data.tasting" class="tasting-detail">
                    <span class="tasting-detail-description h3 content-pad">{{ data.tasting.description }}</span>
                    <div class="tasting-contents">
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="eye" />
                                <span>{{ $t('product.eyeLabel') }}</span>
                            </div>
                            <div v-html="data.tasting.eye" />
                        </div>
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="eye" />
                                <span>{{ $t('product.noseLabel') }}</span>
                            </div>
                            <div v-html="data.tasting.nose" />
                        </div>
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="eye" />
                                <span>{{ $t('product.palateLabel') }}</span>
                            </div>
                            <div v-html="data.tasting.palate" />
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

.tasting-detail {
    margin-bottom: 50px;
}
.tasting-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tasting-content {
    text-align: center;
}
.tasting-visual {
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: $beige;
    color: $gold;
    .icon {
        width: 30px;
        height: 30px;
        margin-bottom: 5px;
    }
    > span {
        font-family: $plex-sans;
        font-weight: 500;
        font-size: 1.2rem;
        line-height: 16px;
        letter-spacing: 0.1em;
    }
}
.tasting-detail-description {
    display: block;
    margin: 0 0 60px;
    text-align: center;
    color: $grey-1;
}

@media (min-width: $phone) {
    .wrapper-image {
        width: percentage(math.div(4, 6));
    }
    .tasting-content {
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
    .tasting-contents {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    .tasting-content {
        width: calc(percentage(math.div(1, 3)) - 30px);
        max-width: none;
    }
}
@media (min-width: $desktop) {
    .product-tasting {
        margin-top: 100px;
        margin-bottom: 100px;
    }
    .wrapper-txt {
        width: percentage(math.div(4, 10));
    }
    .tasting-detail {
        margin-bottom: 100px;
    }
}
</style>
