<template>
    <header>
        <LayoutMobileNav v-if="isMobile" :data="data" />
        <LayoutDesktopNav v-if="!isMobile" :data="data" />
    </header>
</template>
<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].header;
        },
        isMobile() {
            return this.ww <= this.$breakpoints.list.l;
        },
        ww() {
            return this.$store.state.superWindow ? this.$store.state.superWindow.width : 320;
        }
    }
};
</script>

<style lang="scss" scoped></style>
