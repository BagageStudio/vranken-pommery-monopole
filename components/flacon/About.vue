<template>
    <div class="about container">
        <div class="content-pad">
            <h5 class="h5">{{ aboutTitle }} {{ year }}</h5>
            <div class="columns">
                <div v-for="col in data" :key="col.id" class="col">
                    <h3 class="h3">{{ col.title }}</h3>
                    <p class="description">{{ col.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.about {
    padding-top: 50px;
    padding-bottom: 50px;
}
.h5 {
    color: $gold;
    margin-top: 0;
}
.h3 {
    margin: 40px 0 15px;
    color: $grey-1;
}
@media (min-width: $tablet) {
    .about {
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .columns {
        display: flex;
        justify-content: space-between;
    }
    .col {
        width: 30%;
    }
}
</style>
