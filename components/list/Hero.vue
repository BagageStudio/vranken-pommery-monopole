<template>
    <div class="list-hero">
        <div class="container">
            <div class="content-pad">
                <span class="hero-subtitle h5">{{ data.brand.title }}</span>
                <h1 class="hero-title h1">{{ data.cuvee.title }}</h1>
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
.list-hero {
    padding: 50px 0;
    text-align: center;
}
.hero-title {
    margin-bottom: 0;
}
.hero-subtitle {
    margin-bottom: 15px;
    color: $grey-2;
}
</style>
