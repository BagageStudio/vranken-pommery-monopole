<template>
    <div class="breadcrumbs">
        <div class="first-breadcrumb">
            <span>{{ start }}</span>
        </div>
        <div v-for="link in links" :key="link.id" class="breadcrumb">
            <LinkTo shop :link="link">{{ link.title }}</LinkTo>
        </div>
        <div class="breadcrumb">
            <span>{{ end }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        links: {
            required: false,
            default: () => [],
            type: Array
        },
        start: {
            required: true,
            type: String
        },
        end: {
            required: true,
            type: String
        }
    }
};
</script>
<style lang="scss" scoped>
.breadcrumbs {
    display: flex;
}

.breadcrumb {
    padding-left: 15px;
    margin-left: 15px;
    border-left: 1px solid currentColor;
}
</style>
