<template>
    <div class="wrapper-hero">
        <div class="hero">
            <div class="hero-cover">
                <FastImage :image="data.heroCover" cover />
            </div>
            <div class="hero-content container">
                <div class="content-pad">
                    <h1 class="hero-title h1">{{ data.heroTitle }}</h1>
                    <LinkTo class="btn-block" :link="data.heroLink" />
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
.wrapper-hero {
    padding-top: var(--header-height);
}
.hero {
    position: relative;
    height: 630px;
    padding: 40px 0 40px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
}
.hero-cover {
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(248deg, rgba($black, 0) 23%, rgba($black, 0.6) 84%);
    }
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
.hero-content {
    position: relative;
    width: 100%;
}
.hero-title {
    margin-bottom: 35px;
    color: $white;
}
</style>
