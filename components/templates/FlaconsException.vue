<template>
    <div v-if="data" class="wrapper-classic">
        <div class="container">
            <div class="container-s">
                <div class="exception-wrapper-title content-pad">
                    <span v-if="data.preTitle" class="pre-title">{{ data.preTitle }}</span>
                    <h1 class="h2 exception-title">{{ data.title }}</h1>
                </div>
                <ModuleTextImage v-for="module in data.content" :key="module.id" :data="module" />
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

<style lang="scss" scoped>
.exception-wrapper-title {
    padding-bottom: 50px;
}
.pre-title {
    display: block;
    margin-bottom: 15px;
    font-family: $plex-sans;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 19px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $grey-2;
}
.exception-title {
    margin: 0;
    color: $gold;
}

@media (min-width: $phone) {
    .exception-wrapper-title {
        text-align: center;
    }
}
@media (min-width: $tablet) {
    .exception-title {
        font-size: 5.5rem;
        line-height: 71px;
        letter-spacing: 0.02em;
    }
}
@media (min-width: $desktop-small) {
    .exception-wrapper-title {
        padding-bottom: 40px;
    }
}
</style>
