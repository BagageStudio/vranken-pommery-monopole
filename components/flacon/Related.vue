<template>
    <div class="related">
        <div class="container">
            <h4 class="h4 content-pad">{{ data.displayTitle }}</h4>
        </div>
        <ListFlacons v-if="data.flacons" :flacons="data.flacons" />
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({}),
    methods: {}
};
</script>
<style lang="scss" scoped>
.related {
    padding-top: 50px;
    padding-bottom: 10px;
}
.h4 {
    margin-top: 0;
}
@media (min-width: $desktop) {
    .related {
        padding-top: 80px;
        padding-bottom: 20px;
    }
    .h4 {
        margin-bottom: 30px;
    }
}
</style>
