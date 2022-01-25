<template>
    <div v-if="data" class="wrapper-page">
        <div class="wrapper-contact container">
            <div class="wrapper-contact-image">
                <!-- <LinkTo shop class="btn-back" :link="backLink">
                    <Icon name="arrow-left" />
                    <span>{{ $t('global.backLabel') }}</span>
                </LinkTo> -->
                <FastImage :image="data.image" cover />
            </div>
            <div class="wrapper-contact-content">
                <div class="wrapper-contact-title">
                    <h1 class="contact-title h2">{{ data.title }}</h1>
                    <div v-if="data.intro" class="contact-intro" v-html="data.intro" />
                </div>
                <form v-if="!success" class="contact-form" @submit.prevent="sendForm">
                    <div class="content-contact-form">
                        <div :class="['wrapper-field form-line', { error: subjectError }]">
                            <label for="contact-subject" class="select">
                                <select
                                    id="contact-subject"
                                    v-model="subjectInput"
                                    name="contact"
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
                        <div :class="['wrapper-field form-line', { error: brandError }]">
                            <label for="contact-brand" class="select">
                                <select
                                    id="contact-brand"
                                    v-model="brandInput"
                                    name="contact"
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
                            <div :class="['wrapper-field', { error: firstNameError }]">
                                <input
                                    id="contact-first-name"
                                    v-model="firstNameInput"
                                    type="text"
                                    name="contact"
                                    :class="{ on: firstNameInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-first-name">{{ data.firstNameLabel }}</label>
                            </div>
                            <div :class="['wrapper-field', { error: lastNameError }]">
                                <input
                                    id="contact-last-name"
                                    v-model="lastNameInput"
                                    type="text"
                                    name="contact"
                                    :class="{ on: lastNameInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-last-name">{{ data.lastNameLabel }}</label>
                            </div>
                        </div>
                        <div class="form-line split-half">
                            <div :class="['wrapper-field', { error: phoneError }]">
                                <input
                                    id="contact-phone"
                                    v-model="phoneInput"
                                    type="tel"
                                    name="contact"
                                    :class="{ on: phoneInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-phone">{{ data.phoneLabel }}</label>
                            </div>
                            <div :class="['wrapper-field', { error: emailError }]">
                                <input
                                    id="contact-email"
                                    v-model="emailInput"
                                    type="email"
                                    name="contact"
                                    :class="{ on: emailInput !== '' }"
                                    required
                                />
                                <label class="label" for="contact-email">{{ data.emailLabel }}</label>
                            </div>
                        </div>
                        <div :class="['wrapper-field form-line', { error: messageError }]">
                            <textarea
                                id="contact-message"
                                v-model="messageInput"
                                name="contact"
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
                <div v-if="formError" class="form-message error-message" v-html="data.errorMessage" />
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
            subjectError: '',
            brandInput: '',
            brandError: '',
            firstNameInput: '',
            firstNameError: '',
            lastNameInput: '',
            lastNameError: '',
            phoneInput: '',
            phoneError: '',
            emailInput: '',
            emailError: '',
            messageInput: '',
            messageError: '',
            formError: '',
            success: false
        };
    },
    methods: {
        sendForm() {
            const regexEmail =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            this.$refs.submit.setAttribute('disabled', true);

            this.formError = '';
            this.emailError = false;

            if (!this.emailInput) {
                this.formError += this.data.contactEmailError;
                this.emailError = true;
            } else if (!regexEmail.test(this.emailInput)) {
                this.formError += this.data.contactEmailInvalid;
                this.emailError = true;
            }

            if (this.formError) {
                this.$refs.submit.removeAttribute('disabled');
            } else {
                // this.$axios
                //     .post('/.netlify/functions/newsletter', {
                //         email: this.emailInput
                //     })
                //     .then(res => {
                //         this.formError = this.data.newsletterSuccess;
                //         this.success = true;
                //     })
                //     .catch(error => {
                //         this.$refs.submit.removeAttribute('disabled');
                //         this.formError = error.response.data;
                //     });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper-contact-image {
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
