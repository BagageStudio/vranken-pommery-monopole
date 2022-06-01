<template>
    <div v-if="!formValid" class="age-gate">
        <div class="container-age-gate">
            <FastImage :image="data.logo" class="age-gate-logo" />
            <div>
                <span class="age-gate-title">{{ data.title }}</span>
                <div class="age-gate-introduction" v-html="data.introduction" />
                <form class="age-gate-form" @submit.prevent="sendForm">
                    <div :class="['wrapper-checkbox', { error: formError }]">
                        <input id="legal-age" v-model="checkboxInput" type="checkbox" name="legal-age" />
                        <label class="label" for="legal-age">{{ data.checkboxLabel }}</label>
                    </div>
                    <button ref="submit" type="submit" class="age-gate-btn btn-block grey">
                        {{ data.buttonLabel }}
                    </button>
                </form>
                <p v-if="formError" class="form-error" v-html="data.ageIncorrect" />
            </div>
            <div class="age-gate-bottom" v-html="data.bottomText" />
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

import layoutData from '~/cms/data/layout-data.json';

export default {
    data() {
        return {
            checkboxInput: '',
            formError: false,
            formValid: false
        };
    },
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].ageGate;
        }
    },
    methods: {
        sendForm() {
            this.formError = '';

            if (!this.checkboxInput) {
                this.formError = true;
            }

            if (!this.formError) {
                Cookies.set('agevalid', 'true');
                this.formValid = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.age-gate {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: stretch;
    justify-content: center;
    background: $beige;
    z-index: 11;
}
.container-age-gate {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 50px 20px 40px 20px;
    overflow: auto;
}
.age-gate-logo {
    margin-bottom: 40px;
}
.age-gate-title {
    display: block;
    font-family: $plex-serif;
    font-size: 4.2rem;
    line-height: 50px;
    margin: 0 0 20px;
    text-align: center;
    color: $gold;
}
.age-gate-introduction {
    text-align: center;
}
.age-gate-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 26px 0 36px;
}
.wrapper-checkbox {
    display: flex;
    align-items: baseline;
    .label {
        padding-left: 10px;
        font-weight: 500;
        color: $grey-1;
        user-select: none;
    }
}
.age-gate-btn {
    margin-top: 36px;
}
.form-error {
    text-align: center;
    color: $error;
}
.age-gate-bottom {
    text-align: center;
    color: $grey-2;
    ::v-deep p {
        font-size: 1.2rem;
        line-height: 16px;
    }
}

@media (min-width: $phone) {
    .container-age-gate {
        max-width: 465px;
    }
}
@media (min-width: $desktop) {
    .age-gate-logo {
        margin-bottom: 80px;
    }
}
</style>
