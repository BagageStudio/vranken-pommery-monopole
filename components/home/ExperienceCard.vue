<template>
    <div class="experience-card">
        <span class="card-background">
            <FastImage :image="data.thumbnail" cover />
        </span>
        <span class="card-txt">
            <LinkTo class="btn-block" :link="data.link" />
        </span>
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
.experience-card {
    position: relative;
    height: 250px;
    margin: 40px 0;
    padding: 20px 30px;
    display: flex;
    align-items: flex-end;
    text-decoration: none;
}
.card-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .fast-image {
        width: 100%;
        height: 100%;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba($black, 0) 50%, rgba($black, 0.7) 100%);
    }
}
.card-txt {
    position: relative;
    display: flex;
    flex-direction: column;
}

@media (min-width: $phone) {
    .experience-card {
        height: 300px;
    }
}
@media (min-width: $tablet) {
    .experience-card {
        margin: 20px 0;
    }
}
@media (min-width: $desktop-large) {
    .experience-card {
        height: 400px;
    }
}
</style>
