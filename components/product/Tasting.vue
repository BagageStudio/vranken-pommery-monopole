<template>
    <div>
        <div class="container">
            <div class="container-s tasting-top">
                <div class="tasting-detail">
                    <h3 v-if="data.displayTitle" class="h3 content-pad">{{ data.displayTitle }}</h3>
                    <div class="tasting-contents row">
                        <div class="tasting-content content-pad row">
                            <div class="tasting-visual">
                                <Icon name="eye" />
                                <span>{{ $t('product.eyeLabel') }}</span>
                            </div>
                            <div class="tasting-text" v-html="data.eye" />
                        </div>
                        <div class="tasting-content content-pad row">
                            <div class="tasting-visual">
                                <Icon name="nose" />
                                <span>{{ $t('product.noseLabel') }}</span>
                            </div>
                            <div class="tasting-text" v-html="data.nose" />
                        </div>
                        <div class="tasting-content content-pad row">
                            <div class="tasting-visual">
                                <Icon name="palate" />
                                <span>{{ $t('product.palateLabel') }}</span>
                            </div>
                            <div class="tasting-text" v-html="data.palate" />
                        </div>
                    </div>
                </div>
                <div v-if="data.image" class="wrapper-image content-pad">
                    <FastImage :image="data.image" :caption="data.imageCaption ? data.imageCaption : ''" cover />
                </div>
            </div>
            <div class="container-s tasting-bottom">
                <div class="tasting-contents">
                    <div class="tasting-content content-pad">
                        <div class="tasting-visual">
                            <Icon name="terroirs" />
                            <span>{{ $t('product.terroirsLabel') }}</span>
                        </div>
                        <div v-html="data.terroirs" />
                    </div>
                    <div class="tasting-content content-pad">
                        <div class="tasting-visual">
                            <Icon name="accords" />
                            <span>{{ $t('product.accordsLabel') }}</span>
                        </div>
                        <div v-html="data.accords" />
                    </div>
                    <div class="tasting-content content-pad">
                        <div class="tasting-visual">
                            <Icon name="temperature" />
                            <span>{{ $t('product.temperatureLabel') }}</span>
                        </div>
                        <div v-html="data.temperature" />
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
.h3 {
    margin-top: 0;
    margin-bottom: 40px;
    text-align: center;
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
    margin-bottom: 40px;
    &:last-child {
        margin-bottom: 0;
    }
}
.tasting-visual {
    width: 120px;
    height: 120px;
    padding-left: 10px;
    padding-right: 10px;
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
        text-transform: uppercase;
    }
}
.tasting-detail-description {
    display: block;
    margin: 0 0 60px;
    text-align: center;
    color: $grey-1;
}

.tasting-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
}

.tasting-bottom {
    margin-bottom: 100px;
}

.wrapper-image {
    margin-bottom: 40px;
    max-width: 500px;
    .fast-image {
        aspect-ratio: 335/385;
    }
    ::v-deep figcaption {
        text-align: center;
    }
}

@media (min-width: $phone) {
    .tasting-content {
        width: percentage(math.div(4, 6));
        &.row {
            display: flex;
            align-items: center;
            width: 100%;
            .tasting-visual {
                flex: 0 0 auto;
                margin: 0;
            }
        }
    }
    .tasting-text {
        margin-left: 30px;
        text-align: left;
    }
}
@media (min-width: $tablet) {
    .h3 {
        text-align: left;
    }
    .tasting-top {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 140px;
        margin-top: 100px;
        .tasting-detail {
            width: 50%;
            margin-bottom: 0;
        }
        .tasting-visual {
            width: 100px;
            height: 100px;
        }
    }
    .wrapper-image {
        position: relative;
        flex: 0 0 auto;
        width: 40%;
        max-width: none;
        margin-bottom: 0;
    }
    .tasting-contents {
        &:not(.row) {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
        }
    }
    .tasting-content {
        &:not(.row) {
            width: calc(#{percentage(math.div(1, 3))} - 30px);
            max-width: none;
            margin-bottom: 0;
        }
    }
}
@media (min-width: $desktop) {
    .tasting-detail {
        margin-bottom: 100px;
    }
    .tasting-bottom {
        margin-bottom: 140px;
    }
}

@media (min-width: $desktop-large) {
    .wrapper-image {
        width: 50%;
    }
    .tasting-top {
        .tasting-detail {
            width: 40%;
        }
    }
}
</style>
