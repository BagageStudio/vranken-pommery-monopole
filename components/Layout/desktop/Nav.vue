<template>
    <div class="desktop-nav-wrapper">
        <div class="top-bar">
            <div class="container">
                <div class="content-pad inner-top-bar">
                    <div class="top-left">
                        <div class="socials">
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
                        <LayoutLangSwitcher />
                    </div>
                    <nuxt-link to="/" class="logo">
                        <img
                            width="359"
                            height="505"
                            loading="eager"
                            src="~static/img/maison-pommery.png"
                            alt="Maison Pommery & associés"
                        />
                    </nuxt-link>
                    <div class="top-right">
                        <form class="search-bar" @submit.prevent="submitSearch">
                            <button type="submit" class="search-btn">
                                <Icon name="search" />
                            </button>
                            <input v-model="searchInput" type="search" :placeholder="$t('search.input')" />
                        </form>
                        <div class="snip-buttons">
                            <button class="snip-button snipcart-customer-signin"><Icon name="user" /></button>
                            <button class="snip-button snipcart-checkout">
                                <Icon name="cart" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-bar">
            <div class="container">
                <div class="content-pad inner-bottom-bar">
                    <ul class="main-menu">
                        <LayoutDesktopTopLevel
                            v-for="topItem in data.menu"
                            :key="topItem.id"
                            :data="topItem"
                            :selected="selectedChild"
                            @changeLevel="changeLevel"
                        />
                    </ul>
                </div>
            </div>
        </div>
        <div :class="{ show: selectedChild }" class="overlay" @click="changeLevel(null)"></div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
            selectedChild: null,
            scrollOffset: 0,
            searchInput: ''
        };
    },
    computed: {
        scrollTop() {
            return this.$store.state.scroll.scrollTop;
        }
    },
    watch: {
        $route() {
            this.changeLevel(null);
        }
    },
    mounted() {},
    beforeDestroy() {
        this.changeLevel(null);
    },
    methods: {
        submitSearch() {
            if (!this.searchInput) return;
            this.$router.push(
                this.localePath({
                    name: 'search',
                    query: {
                        term: this.searchInput
                    }
                })
            );
        },
        updateNoScroll(id) {
            if (!this.selectedChild && id) {
                this.scrollOffset = this.scrollTop;
                document.documentElement.classList.add('no-scroll');
                document.documentElement.style.setProperty('--scroll-top', this.scrollTop * -1 + 'px');
            } else if (this.selectedChild && !id) {
                document.documentElement.classList.remove('no-scroll');
                window.scrollTo(0, this.scrollOffset);
            }
        },
        changeLevel(id) {
            this.updateNoScroll(id);
            this.selectedChild = id;
        }
    }
};
</script>
<style lang="scss" scoped>
.desktop-nav-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
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

.top-bar {
    border-bottom: 1px solid $grey-3;
}

.inner-top-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 110px;
    // padding-top: 25px;
    // padding-bottom: 15px;
    height: 150px;
    padding-top: 45px;
    padding-bottom: 35px;
}
.top-left {
    display: flex;
    align-items: center;
}
.top-right {
    display: flex;
    align-items: center;
    // Leave space for the absolute logo
    max-width: calc(50% - 160px);
}

.logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
        width: 80px;
    }
}

.socials {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    a {
        width: 22px;
        height: 22px;
        margin-right: 30px;
        &:last-child {
            margin-right: 40px;
        }
    }
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
}

.snip-button {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}

.mobile-search {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $grey-3;
    border-bottom: 1px solid $grey-3;
}

.search-bar {
    width: 300px;
    flex-shrink: 1;
    position: relative;
    input {
        width: 100%;
        padding-left: 40px;
        line-height: 20px;
        font-style: italic;
    }
}
.search-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    z-index: 1;
    .icon {
        width: 16px;
        height: 16px;
    }
}

ul {
    margin: 0;
}

.bottom-bar {
    position: relative;
    border-bottom: 1px solid $grey-3;
}

.inner-bottom-bar {
    height: 79px;
}

.main-menu {
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.overlay {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    background-color: red;
    z-index: -2;
    background-color: rgba($blue, 0.7);
    cursor: pointer;
    opacity: 0;
    transform: translateY(calc(-100% - 1px));
    transition: opacity 0.2s ease-out, transform 0s linear 0.2s;
    &.show {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.2s ease-out;
    }
}
</style>
