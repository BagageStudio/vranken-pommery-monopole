<template>
    <div>
        <div class="container">
            <div class="container-s">
                <div class="tasting-detail">
                    <div class="tasting-contents">
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="eye" />
                                <span>{{ $t('product.eyeLabel') }}</span>
                            </div>
                            <div v-html="data.eye" />
                        </div>
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="nose" />
                                <span>{{ $t('product.noseLabel') }}</span>
                            </div>
                            <div v-html="data.nose" />
                        </div>
                        <div class="tasting-content content-pad">
                            <div class="tasting-visual">
                                <Icon name="palate" />
                                <span>{{ $t('product.palateLabel') }}</span>
                            </div>
                            <div v-html="data.palate" />
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
.tasting-detail {
    margin-bottom: 50px;
    margin-top: 50px;
}
.tasting-contents {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tasting-content {
    text-align: center;
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
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
    .tasting-content {
        width: percentage(math.div(4, 6));
    }
}
@media (min-width: $tablet) {
    .tasting-contents {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    .tasting-content {
        width: calc(percentage(math.div(1, 3)) - 30px);
        max-width: none;
        margin-bottom: 0;
    }
}
@media (min-width: $desktop) {
    .tasting-detail {
        margin-top: 100px;
        margin-bottom: 100px;
    }
}
</style>
