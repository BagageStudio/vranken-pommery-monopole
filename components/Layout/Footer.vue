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
                        <div class="newsletter-intro" v-html="data.newsletterIntro" />
                        <form class="newsletter-form">
                            <div class="content-newsletter-form">
                                <div class="wrapper-field">
                                    <input id="newsletter-email" type="email" name="newsletter" required />
                                    <label class="label" for="newsletter-email">{{ data.emailPlaceholder }}</label>
                                </div>
                                <button ref="submit" type="submit" class="btn-next">
                                    <span>{{ data.newsletterButtonLabel }}</span>
                                    <Icon name="arrow-right" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import layoutData from '~/cms/data/layout-data.json';

export default {
    computed: {
        data() {
            return layoutData[this.$store.state.i18n.locale].footer;
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
    width: 50%;
    margin: 20px 0;
    padding: 0 $gutter;
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

@media (min-width: $phone) {
    .benefit {
        width: percentage(math.div(1, 3));
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
}
@media (min-width: $desktop) {
    .benefit {
        width: 50%;
    }
    .newsletter {
        width: percentage(math.div(4, 10));
    }
}
@media (min-width: $desktop-large) {
    .benefit {
        width: percentage(math.div(1, 3));
    }
}
</style>
