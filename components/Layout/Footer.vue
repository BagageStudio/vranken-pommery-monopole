<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-top container-s">
                <div class="benefits">
                    <span class="footer-title">{{ data.benefitsTitle }}</span>
                    <div class="benefits-group">
                        <div v-for="benefit in data.benefits" :key="benefit.id" class="benefit">
                            <div class="benefit-icon">
                                <FastImage :image="benefit.benefitIcon" />
                            </div>
                            <span class="benefit-title">{{ benefit.benefitTitle }}</span>
                        </div>
                    </div>
                </div>
                <div class="newsletter">
                    <span class="footer-title">{{ data.newsletterTitle }}</span>
                    <div class="newsletter-content">
                        <div v-if="!success" class="newsletter-intro" v-html="data.newsletterIntro" />
                        <form v-if="!success" class="newsletter-form" @submit.prevent="sendForm">
                            <div class="content-newsletter-form">
                                <div :class="['wrapper-field', { error: emailError }]">
                                    <input
                                        id="newsletter-email"
                                        v-model="emailInput"
                                        type="email"
                                        name="newsletter"
                                        :class="{ on: emailInput !== '' }"
                                        required
                                    />
                                    <label id="newsletter-label" class="label" for="newsletter-email">{{
                                        data.emailPlaceholder
                                    }}</label>
                                </div>
                                <button ref="submit" type="submit" class="btn-next">
                                    <span>{{ data.newsletterButtonLabel }}</span>
                                    <Icon name="arrow-right" />
                                </button>
                            </div>
                        </form>
                        <div v-if="success" class="form-message" v-html="data.successMessage" />
                        <div v-if="formError" class="form-message error-message" v-html="data.errorMessage" />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="container-s">
                    <FastImage :image="data.footerLogo" class="footer-logo" />
                    <div class="footer-menu">
                        <div v-for="col in data.footerMenu" :key="col.id" class="footer-col">
                            <span class="footer-title">{{ col.title }}</span>
                            <div v-for="link in col.links" :key="link.id" class="footer-link">
                                <LinkTo :link="link" />
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-social-lang">
                        <LayoutSocial :data="data.social" />
                        <LayoutLangSwitcher class="light" />
                    </div>
                    <div class="wrapper-copy-warning">
                        <div class="copy" v-html="data.footerCopyright" />
                        <div class="evin-warning" v-html="data.footerWarning" />
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    data() {
        return {
            emailInput: '',
            emailError: '',
            formError: '',
            success: false
        };
    },
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].footer;
        }
    },
    methods: {
        sendForm() {
            const regexEmail =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            this.$refs.submit.setAttribute('disabled', true);

            this.formError = '';
            this.emailError = false;

            if (!this.emailInput) {
                this.formError += this.data.newsletterEmailError;
                this.emailError = true;
            } else if (!regexEmail.test(this.emailInput)) {
                this.formError += this.data.newsletterEmailInvalid;
                this.emailError = true;
            }

            if (this.formError) {
                this.$refs.submit.removeAttribute('disabled');
            } else {
                this.$axios
                    .post('/.netlify/functions/newsletter', {
                        email: this.emailInput
                    })
                    .then(res => {
                        this.formError = this.data.newsletterSuccess;
                        this.success = true;
                    })
                    .catch(error => {
                        this.$refs.submit.removeAttribute('disabled');
                        this.formError = error.response.data;
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.footer {
    border-top: 1px solid $grey-3;
}
.footer-top {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 50px;
}
.benefits {
    margin-bottom: 40px;
}
.footer-title {
    display: block;
    margin-bottom: 20px;
    padding: 0 $gutter;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 19px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: $gold;
}
.benefits-group {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
}
.benefit {
    width: 100%;
    margin: 20px 0;
    padding: 0 $gutter;
}
.benefit-title {
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.benefit-icon {
    width: 25px;
    height: 25px;
    margin-bottom: 10px;
}
.newsletter-content {
    padding: 0 $gutter;
}
.content-newsletter-form {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
}
.newsletter-form {
    margin-top: 20px;
}
.footer-bottom {
    padding: 50px 0;
    background: $blue;
    color: $grey-2;
    .footer-title {
        padding: 0;
        font-size: 1.4rem;
        line-height: 18px;
    }
}
.footer-logo {
    width: 210px;
    margin: 0 auto;
}
.footer-menu {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    text-align: center;
}
.footer-col {
    margin-bottom: 40px;
    padding: 0 $gutter;
    &:last-child {
        margin-bottom: 0;
    }
}
.footer-link {
    font-size: 1.4rem;
    line-height: 18px;
    margin-bottom: 15px;
    &:last-child {
        margin-bottom: 0;
    }
    a {
        text-decoration: none;
        color: $white;
    }
}
.wrapper-social-lang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 $gutter;
}
.wrapper-copy-warning {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding-top: 30px;
    font-size: 1.2rem;
    line-height: 15px;
    text-align: center;
    ::v-deep p {
        margin: 0;
    }
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: $gutter;
        right: $gutter;
        border-top: 1px solid $grey-2;
    }
    > div {
        padding: 0 $gutter;
    }
}
.evin-warning {
    margin-top: 30px;
}
#newsletter-email,
#newsletter-label {
    line-height: 25px;
}

@media (min-width: $phone) {
    .benefit {
        width: 50%;
    }
    .footer-menu {
        flex-wrap: wrap;
        flex-direction: row;
    }
    .footer-col {
        width: 50%;
    }
}
@media (min-width: $tablet) {
    .footer-logo {
        width: 380px;
    }
    .footer-menu {
        width: percentage(math.div(4, 6));
        margin-left: auto;
        margin-right: auto;
    }
}
@media (min-width: $desktop-small) {
    .footer-top {
        flex-direction: row;
        justify-content: space-between;
    }
    .benefits,
    .newsletter {
        width: 50%;
    }
    .benefits {
        margin-bottom: 0;
    }
    .footer-bottom {
        padding-top: 100px;
    }
    .wrapper-copy-warning {
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
    }
    .evin-warning {
        margin-top: 0;
    }
    .wrapper-social-lang {
        margin-top: 10px;
    }
}
@media (min-width: $desktop) {
    .benefits {
        width: percentage(math.div(6, 10));
    }
    .benefit {
        width: 50%;
    }
    .newsletter {
        width: percentage(math.div(4, 10));
    }
    .footer-bottom {
        .footer-title {
            margin-bottom: 25px;
        }
    }
    .footer-menu {
        width: 100%;
        margin-top: 70px;
        text-align: left;
    }
    .footer-col {
        width: 25%;
    }
}
@media (min-width: $desktop-large) {
    .newsletter-intro {
        font-size: 1.5rem;
    }
    .benefit {
        width: percentage(math.div(1, 3));
    }
}
</style>
