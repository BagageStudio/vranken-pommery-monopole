<template>
    <div class="lang">
        <div class="current" :class="{ open: showLang }">
            <button @click="toggleLang">
                {{ `${currentLocale.name} (${currentLocale.code})` }}<Icon name="arrow-right" />
            </button>
        </div>
        <div v-show="showLang" class="other-lang">
            <div v-for="locale in availableLocales" :key="locale.code">
                <a :href="switchLocalePath(locale.code)">
                    <span>{{ `${locale.name} (${locale.code})` }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        showLang: false
    }),
    computed: {
        availableLocales() {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
        },
        currentLocale() {
            return this.$i18n.locales.filter(i => i.code === this.$i18n.locale)[0];
        }
    },
    methods: {
        toggleLang() {
            this.showLang = !this.showLang;
        }
    }
};
</script>
<style lang="scss" scoped>
.lang {
    position: relative;
    text-transform: uppercase;
    font-size: 1.2rem;
    letter-spacing: 0.1em;
    button {
        display: flex;
        align-items: center;
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 0.1em;
        color: $grey-1;
    }
    .icon {
        width: 5px;
        height: 9px;
        transform: rotate(90deg);
        margin-left: 9px;
        transition: transform 0.2s ease-in-out;
    }
    &.light {
        button {
            color: $grey-2;
        }
    }
}
.current.open {
    .icon {
        transform: rotate(-90deg);
    }
}
.other-lang {
    position: absolute;
    top: 100%;
}
</style>
