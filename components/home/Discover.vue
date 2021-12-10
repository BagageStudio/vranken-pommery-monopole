<template>
    <div class="discover">
        <div class="container">
            <div v-html="data.discoverIntro" />
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
.discover {
    padding: 50px 0;
}
</style>
