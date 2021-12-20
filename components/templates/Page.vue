<template>
    <div v-if="data" class="wrapper-basic">
        <div class="container">
            <div class="container-xs wysiwyg content-pad">
                <h1>{{ data.title }}</h1>
                <div v-if="data.content" v-html="data.content" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true }
    }
};
</script>

<style lang="scss" scoped></style>
