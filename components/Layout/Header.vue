<template>
    <header>
        <LayoutMobileNav :data="data" />
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

<style lang="scss" scoped></style>
