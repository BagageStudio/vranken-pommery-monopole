<template>
    <div class="mobile-nav-wrapper">
        <div class="container mobile-bar-container">
            <div class="content-pad mobile-bar">
                <button class="burger" :class="{ close: showNav }" aria-label="Menu" @click="toggleNav">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nuxt-link to="/" class="logo">
                    <Icon name="logo-blue" />
                </nuxt-link>
                <div class="snip-buttons">
                    <button class="snip-button snipcart-customer-signin"><Icon name="user" /></button>
                    <button class="snip-button snipcart-checkout">
                        <Icon name="cart" />
                    </button>
                </div>
            </div>
        </div>
        <div class="top-level-wrapper">
            <div
                class="top-level"
                :class="{ open: showNav }"
                :style="{ transform: `translateX(-${(level - 1) * 100}%)` }"
            >
                <div class="container mobile-search">
                    <div class="content-pad">
                        <div class="search-bar">
                            <Icon name="search" />
                            <input type="search" placeholder="Rechercher un produit" />
                        </div>
                    </div>
                </div>
                <nav :class="{ show: showNav }" class="navigation">
                    <div class="container">
                        <ul class="main-menu content-pad">
                            <LayoutMobileTopLevel
                                v-for="topItem in data.menu"
                                :key="topItem.id"
                                :data="topItem"
                                :bus="bus"
                                :levels="{ second: secondLevelId, third: thirdLevelId }"
                            />
                        </ul>
                    </div>
                    <div class="container misc-menu">
                        <div class="content-pad">
                            <ul class="lang">
                                <li class="current">{{ `${currentLocale.name} (${currentLocale.code})` }}</li>
                                <li v-for="locale in availableLocales" :key="locale.code">
                                    <a :href="switchLocalePath(locale.code)">
                                        <span>{{ `${locale.name} (${locale.code})` }}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="socials content-pad">
                            <a
                                v-for="social in data.socials"
                                :key="social.id"
                                :href="social.linkUrl"
                                :aria-label="social.title"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="social-link"
                            >
                                <FastImage :image="social.icon" contains />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div :class="{ show: showNav }" class="overlay" @click="toggleNav"></div>
    </div>
</template>
<script>
import Vue from 'vue';
import { wait } from '~/assets/js/utils';

export default {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            showNav: false,
            level: 1,
            secondLevelId: null,
            thirdLevelId: null,
            bus: new Vue()
        };
    },
    computed: {
        scrollTop() {
            return this.$store.state.scroll.scrollTop;
        },
        availableLocales() {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
        },
        currentLocale() {
            return this.$i18n.locales.filter(i => i.code === this.$i18n.locale)[0];
        }
    },
    watch: {
        $route() {
            if (this.showNav) this.toggleNav();
        }
    },
    created() {
        this.bus.$on('changeLevel', this.changeLevel);
    },
    mounted() {},
    methods: {
        updateNoScroll() {
            if (this.showNav) {
                this.scrollOffset = this.scrollTop;
                document.documentElement.classList.add('no-scroll');
                document.documentElement.style.setProperty('--scroll-top', this.scrollTop * -1 + 'px');
            } else {
                document.documentElement.classList.remove('no-scroll');
                window.scrollTo(0, this.scrollOffset);
            }
        },
        async toggleNav() {
            this.showNav = !this.showNav;
            this.updateNoScroll();

            if (!this.showNav) {
                // Reset menu state after closing it
                await wait(300);
                this.secondLevelId = null;
                this.thirdLevelId = null;
                this.level = 1;
            }
        },
        changeLevel(level, id) {
            this.level = level;
            if (level === 2 && id) {
                this.secondLevelId = id;
            } else if (level === 3 && id) {
                this.thirdLevelId = id;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.mobile-nav-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        height: var(--header-height);
        left: 0;
        right: 0;
        background-color: $white;
        z-index: -1;
    }
}
.burger {
    position: relative;
    width: 33px;
    height: 33px;
    margin-left: -5px;

    span {
        position: absolute;
        left: 7px;
        height: 1px;
        background-color: $grey-1;
        width: 17px;
        &:nth-child(1) {
            top: 10px;
            transition: 0.2s ease-out 0.1s;
        }
        &:nth-child(2),
        &:nth-child(4) {
            top: 16px;
            transition: 0.2s ease-out;
        }
        &:nth-child(3) {
            top: 22px;
            transition: 0.2s ease-out 0.1s;
        }
    }
    &.close {
        span {
            &:nth-child(1) {
                transform: translateY(-5px);
                opacity: 0;
                transition: 0.2s ease-out;
            }
            &:nth-child(2) {
                transform: rotate(-45deg) scaleX(1.2);
                transition: 0.2s ease-out 0.1s;
            }
            &:nth-child(3) {
                transform: translateY(5px);
                opacity: 0;
                transition: 0.2s ease-out;
            }
            &:nth-child(4) {
                transform: rotate(45deg) scaleX(1.2);
                transition: 0.2s ease-out 0.1s;
            }
        }
    }
}
.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .icon {
        height: 42px;
        width: 157px;
    }
}
.mobile-bar {
    height: var(--mobile-top-header-height);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
}

.icon-user {
    width: 16px;
    height: 17px;
}

.icon-cart {
    width: 18px;
    height: 15px;
}
.snip-buttons {
    display: flex;
    margin-right: -5px;
}

.snip-button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.snipcart-checkout {
        margin-right: 10px;
    }
}

.mobile-search {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $grey-3;
    border-bottom: 1px solid $grey-3;
    background-color: $white;
    z-index: 2;
}

.search-bar {
    position: relative;
    input {
        width: 100%;
        padding-left: 40px;
        line-height: 20px;
        font-style: italic;
    }
    .icon {
        position: absolute;
        top: 12px;
        left: 12px;
        width: 16px;
        height: 16px;
        z-index: 1;
    }
}

ul {
    margin: 0;
}

.navigation {
    background-color: $white;
    // 1px for the border bottom
    transform: translateY(calc(-100% - 1px));
    transition: transform 0.3s ease-out;
    &.show {
        transform: translateY(0);
    }
}

.misc-menu {
    background-color: $beige;
}

.socials {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    a {
        width: 22px;
        height: 22px;
        margin-right: 20px;
    }
}

.lang {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 1.2rem;
    border-bottom: 1px solid $white;
    .current {
        color: $blue;
    }
    a {
        display: flex;
        align-items: center;
        margin-left: 10px;
        text-decoration: none;
        &::before {
            content: '';
            display: block;
            height: 1px;
            width: 8px;
            margin-right: 10px;
            background-color: $grey-1;
        }
    }
}

.top-level-wrapper {
    overflow: hidden;
}

.top-level {
    position: relative;
    z-index: 1;
    &.open {
        transition: transform 0.2s ease-in-out;
    }
}

.overlay {
    position: fixed;
    top: 0;
    height: 100vh;
    left: 0;
    right: 0;
    background-color: rgba($blue, 0.7);
    opacity: 0;
    transform: translateY(-100%);
    transition: opacity 0.2s ease-out, transform 0s linear 0.2s;
    z-index: -1;
    &.show {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.2s ease-out;
    }
}
</style>
