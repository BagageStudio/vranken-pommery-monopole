<template>
    <div>
        <div class="container">
            <div class="content-pad mobile-bar">
                <button class="burger" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nuxt-link to="/" class="logo">
                    <Icon name="logo-blue" />
                </nuxt-link>
                <div class="snip-buttons">
                    <button class="snip-button snipcart-checkout">
                        <Icon name="user" />
                    </button>
                    <button class="snip-button snipcart-customer-signin"><Icon name="cart" /></button>
                </div>
            </div>
        </div>
        <div class="container mobile-search">
            <div class="content-pad">
                <div class="search-bar">
                    <Icon name="search" />
                    <input type="search" placeholder="Rechercher un produit" />
                </div>
            </div>
            <!-- <div class="content-pad nav">
                <div v-for="item in data.menu" :key="item.id">{{ item.label }}</div>
            </div> -->
        </div>
        <nav hidden>
            <div class="container">
                <ul class="main-menu content-pad">
                    <li v-for="item in data.menu" :key="item.id" class="main-item">
                        <button class="main-label" aria-expanded="false" aria-hidden="false">
                            <span>{{ item.label }}</span>
                            <Icon name="arrow-right" />
                        </button>
                    </li>
                </ul>
            </div>
            <div class="container misc-menu">
                <div class="lang-switcher"></div>
                <div class="socials">
                    <a v-for="social in data.socials" :key="social.id" :href="social.linkUrl"></a>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import Icon from '../Icon.vue';
export default {
    components: { Icon },
    props: {
        data: {
            required: true,
            type: Object
        }
    }
};
</script>
<style lang="scss" scoped>
.burger {
    position: relative;
    width: 33px;
    height: 33px;
    margin-left: -5px;

    span {
        position: absolute;
        top: 10px;
        left: 7px;
        height: 1px;
        background-color: $grey-1;
        width: 17px;
        &:nth-child(2) {
            top: 16px;
        }
        &:nth-child(3) {
            top: 22px;
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
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 1px solid $grey-3;
    border-bottom: 1px solid $grey-3;
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

.main-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 1.5rem;
    line-height: 1;
    color: $grey-1;
    .icon {
        height: 10px;
        width: 6px;
        margin-right: 6px;
    }
}

.misc-menu {
    background-color: $beige;
}
</style>
