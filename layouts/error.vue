<template>
    <div class="wrapper-page">
        <div class="container">
            <div class="content-pad e404">
                <h1 class="h1">{{ error.statusCode }}</h1>
                <h2 class="h3">{{ error.title }}</h2>
                <p>{{ error.text }}</p>
                <div class="btns">
                    <nuxt-link class="btn-block grey" to="/"> {{ $t('404.homeLabel') }} </nuxt-link>
                    <nuxt-link class="btn-block grey contact" :to="contactLink">
                        {{ $t('404.contactLabel') }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { routeByApiModels } from '~/app/crawler/routes';

export default {
    props: {
        error: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    data() {
        return {
            errorData: null
        };
    },
    computed: {
        contactLink() {
            const contactSlug = this.$i18n.locale === 'fr' ? 'contact' : 'contact-us';
            return this.localePath({
                name: routeByApiModels.contact.routerFormat,
                params: { slug: contactSlug }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.e404 {
    max-width: 730px;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 80px;
    text-align: center;
}
.h1 {
    font-size: 14.5rem;
    line-height: 14.5rem;
    margin: 0 0 30px;
}
.h3 {
    margin: 0 0 30px;
}
.btns {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .btn-block:not(:first-child) {
        margin-left: 50px;
    }
}
</style>
