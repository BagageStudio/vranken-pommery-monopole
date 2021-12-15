<template>
    <LinkTo :link="data.link" class="experience-card" hide-label>
        <span class="card-background">
            <FastImage :image="data.thumbnail" cover />
        </span>
        <span class="card-txt">
            <span class="card-title">{{ data.title }}</span>
            <span class="card-label">{{ data.label }}</span>
        </span>
    </LinkTo>
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
.card-title {
    font-size: 2.2rem;
    line-height: 28px;
    color: $white;
}
.card-label {
    margin-top: 5px;
    font-size: 1.2rem;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $gold;
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
