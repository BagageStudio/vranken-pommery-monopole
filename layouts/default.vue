<template>
    <div class="main">
        <LayoutHeader />
        <Nuxt />
        <LayoutFooter />
        <LayoutAgeGate v-if="!ageValid" />
        <LayoutSvgs />
        <LayoutGrid v-if="true" />
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { spotFF } from '@stereorepo/sac';

export default {
    data() {
        return {
            ageValid: false
        };
    },
    beforeMount() {
        spotFF();
    },
    mounted() {
        this.ageValid = Cookies.get('agevalid');

        // Init superWindow
        this.$stereorepo.superWindow.initializeWindow(this.$store);

        // Init superScroll
        this.$stereorepo.superScroll.initializeScroll().then(firstScrollTop => {
            this.$store.commit('scroll/setFirstScrollTop', firstScrollTop);
        });
        this.$stereorepo.superScroll.on('scroll', scrollTop => {
            this.$store.commit('scroll/setScrollTop', scrollTop);
        });
    },
    beforeDestroy() {
        // NOTE: Avoiding memory leaks
        this.$stereorepo.superWindow.destroyWindow(this.$store);
        this.$stereorepo.superScroll.destroyScroll();
    }
};
</script>
