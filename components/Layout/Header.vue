<template>
    <header>
        <div class="container">
            <div class="content-pad nav">
                <div v-for="item in data.menu" :key="item.id">{{ item.label }}</div>
            </div>
        </div>
    </header>
</template>
<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].header;
        }
    }
};
</script>

<style lang="scss" scoped>
header {
    padding-top: 60px;
    padding-bottom: 60px;
}
.nav {
    display: flex;
    justify-content: space-between;
}
</style>
