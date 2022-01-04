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
                        <Icon name="logo-blue" />
                    </nuxt-link>
                    <div class="top-right">
                        <div class="search-bar">
                            <Icon name="search" />
                            <input type="search" placeholder="Rechercher un produit" />
                        </div>
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
                        <li v-for="topItem in data.menu" :key="topItem.id">{{ topItem.label }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
export default {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="scss" scoped>
.desktop-nav-wrapper {
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

.top-bar {
    border-bottom: 1px solid $grey-3;
}

.inner-top-bar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    padding-top: 25px;
    padding-bottom: 15px;
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
    .icon {
        height: 70px;
        width: 268px;
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

.inner-bottom-bar {
    height: 80px;
}

.main-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}
</style>