<template>
    <div class="social">
        <a
            v-for="social in data"
            :key="social.id"
            :href="social.linkUrl"
            :aria-label="social.title"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
        >
            <FastImage :image="social.icon" contains />
        </a>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.social {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
}
.social-link {
    width: 18px;
    height: 18px;
    margin-right: 20px;
    &:last-child {
        margin-right: 0;
    }
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
</style>
