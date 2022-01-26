<template>
    <div v-if="data" class="wrapper-page">
        <div class="wrapper-contact container">
            <div class="wrapper-contact-image">
                <nuxt-link :to="homeSlug" class="btn-back">
                    <Icon name="arrow-left" />
                    <span>{{ $t('global.backLabel') }}</span>
                </nuxt-link>
                <FastImage :image="data.image" cover />
            </div>
            <div class="wrapper-contact-content">
                <div class="wrapper-contact-title">
                    <h1 class="contact-title h2">{{ data.title }}</h1>
                    <div v-if="data.intro" class="contact-intro" v-html="data.intro" />
                </div>
                <form
                    v-if="!success"
                    class="contact-form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    :action="$route.fullPath + '?form=success'"
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <div class="content-contact-form">
                        <div class="wrapper-field form-line">
                            <label for="contact-subject" class="select">
                                <select
                                    id="contact-subject"
                                    v-model="subjectInput"
                                    name="contact-subject[]"
                                    :class="{ on: subjectInput !== '' }"
                                    required
                                >
                                    <option value="" selected disabled hidden>{{ data.subjectLabel }}</option>
                                    <option
                                        v-for="option in data.subjectOptions"
                                        :key="option.id"
                                        :value="option.valueAttribute"
                                    >
                                        {{ option.text }}
                                    </option>
                                </select>
                                <Icon name="arrow-down" />
                            </label>
                        </div>
                        <div class="wrapper-field form-line">
                            <label for="contact-brand" class="select">
                                <select
                                    id="contact-brand"
                                    v-model="brandInput"
                                    name="contact-brand[]"
                                    :class="{ on: brandInput !== '' }"
                                    required
                                >
                                    <option value="" selected disabled hidden>{{ data.brandLabel }}</option>
                                    <option
                                        v-for="option in data.brandOptions"
                                        :key="option.id"
                                        :value="option.valueAttribute"
                                    >
                                        {{ option.text }}
                                    </option>
                                </select>
                                <Icon name="arrow-down" />
                            </label>
                        </div>
                        <div class="form-line split-half">
                            <div class="wrapper-field">
                                <input
                                    id="contact-first-name"
                                    v-model="firstNameInput"
                                    type="text"
                                    name="contact-first-name"
                                    :class="{ on: firstNameInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-first-name">{{ data.firstNameLabel }}</label>
                            </div>
                            <div class="wrapper-field">
                                <input
                                    id="contact-last-name"
                                    v-model="lastNameInput"
                                    type="text"
                                    name="contact-last-name"
                                    :class="{ on: lastNameInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-last-name">{{ data.lastNameLabel }}</label>
                            </div>
                        </div>
                        <div class="form-line split-half">
                            <div class="wrapper-field">
                                <input
                                    id="contact-phone"
                                    v-model="phoneInput"
                                    type="tel"
                                    name="contact-phone"
                                    :class="{ on: phoneInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-phone">{{ data.phoneLabel }}</label>
                            </div>
                            <div class="wrapper-field">
                                <input
                                    id="contact-email"
                                    v-model="emailInput"
                                    type="email"
                                    name="contact-email"
                                    :class="{ on: emailInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-email">{{ data.emailLabel }}</label>
                            </div>
                        </div>
                        <div class="wrapper-field form-line">
                            <textarea
                                id="contact-message"
                                v-model="messageInput"
                                name="contact-message"
                                :class="{ on: messageInput !== '' }"
                                required
                            />
                            <label class="label" for="contact-message">{{ data.messageLabel }}</label>
                        </div>
                        <button ref="submit" type="submit" class="btn-block grey">
                            {{ data.buttonLabel }}
                        </button>
                    </div>
                </form>
                <div v-if="success" class="form-message" v-html="data.successMessage" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: { type: Object, required: true }
    },
    data() {
        return {
            subjectInput: '',
            brandInput: '',
            firstNameInput: '',
            lastNameInput: '',
            phoneInput: '',
            emailInput: '',
            messageInput: '',
            success: false
        };
    },
    computed: {
        homeSlug() {
            let slug = '/';
            if (this.$i18n.locale !== this.$i18n.defaultLocale) {
                slug = this.localePath('/');
            }
            return slug;
        }
    },
    mounted() {
        this.initUrlParams();
    },
    methods: {
        initUrlParams() {
            if (this.$route.query.form === 'success') {
                this.success = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper-contact-image {
    position: relative;
    padding: 0 #{$gutter};
    aspect-ratio: 1 / 1;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
.btn-back {
    position: absolute;
    top: 0;
    left: -#{$grid-gutter-s};
    display: inline-flex;
    align-items: center;
    padding: 30px 20px;
    font-size: 1.5rem;
    line-height: 19px;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.03em;
    color: $grey-2;
    background: $white;
    z-index: 1;
    .icon {
        width: 9px;
        height: 6px;
        margin-right: 9px;
    }
}

.wrapper-contact-content {
    padding: 50px $gutter;
}
.wrapper-contact-title {
    margin-bottom: 50px;
}
.contact-title {
    margin: 0 0 10px;
    color: $gold;
}
.contact-intro {
    ::v-deep p {
        margin: 0;
    }
}

@media (min-width: $tablet) {
    .wrapper-contact {
        display: flex;
        align-items: stretch;
    }
    .wrapper-contact-image {
        width: percentage(math.div(4, 10));
    }
    .btn-back {
        left: 0;
    }
    .wrapper-contact-content {
        flex: 0 0 auto;
        width: 50%;
        margin-left: percentage(math.div(1, 10));
    }
}
@media (min-width: $desktop) {
    .wrapper-contact-image {
        width: percentage(math.div(6, 12));
        justify-content: flex-start;
        aspect-ratio: 1 / 1;
    }
    .btn-back {
        padding: 30px;
    }
    .wrapper-contact-content {
        width: percentage(math.div(5, 12));
        margin-left: percentage(math.div(1, 12));
    }
}
@media (min-width: $desktop-large) {
    .wrapper-contact-image {
        width: percentage(math.div(6, 12));
    }
    .wrapper-contact-content {
        width: percentage(math.div(4, 12));
        margin: 0 percentage(math.div(1, 12));
    }
}
</style>
