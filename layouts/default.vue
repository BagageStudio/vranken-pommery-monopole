<template>
    <div class="main">
        <LayoutHeader />
        <Nuxt />
        <LayoutFooter />
        <LayoutAgeGate v-if="!ageValid" />
        <LayoutSvgs />
        <LayoutGrid v-if="false" />
        <div id="snipcart" hidden :data-api-key="$config.snipcartApiKey"></div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { spotFF } from '@stereorepo/sac';
import snipcartFr from '~/locales/snipcart/fr.json';
import snipcartEn from '~/locales/snipcart/en.json';

export default {
    data() {
        return {
            ageValid: false
        };
    },
    head() {
        return this.$nuxtI18nHead({ addSeoAttributes: true });
    },
    beforeMount() {
        spotFF();
    },
    mounted() {
        document.addEventListener('snipcart.ready', () => {
            const lang = this.$i18n.locale;
            const translation = lang === 'fr' ? snipcartFr : snipcartEn;
            window.Snipcart.api.session.setLanguage(lang, translation);
        });
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
