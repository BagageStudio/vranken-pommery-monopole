<template>
    <footer class="footer">
        <div class="footer-top">
            <div class="container">
                <div class="benefits"></div>
            </div>
        </div>
    </footer>
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].footer;
        }
    }
};
</script>

<style lang="scss" scoped>
.footer-top {
    padding: 50px 0;
    border-top: 1px solid $grey-3;
}
</style>
