<template>
    <div class="wrapper-experiences">
        <div class="container">
            <div class="container-s">
                <div class="experiences">
                    <div v-for="experience in data.experiences" :key="experience.id" class="experience-card">
                        <div class="card-background">
                            <FastImage :image="experience.thumbnail" cover />
                        </div>
                        <div class="card-content">
                            <div class="label">{{ experience.label }}</div>
                            <h3 class="experience-title">{{ experience.title }}</h3>
                            <div class="experience-intro" v-html="experience.intro" />
                            <LinkTo class="btn-block grey" :link="experience.link" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
};
</script>
<style lang="scss" scoped>
.wrapper-experiences {
    padding: 25px 0;
    background: $beige;
}
.experiences {
    display: flex;
    flex-direction: column;
}
.experience-card {
    position: relative;
    margin: 25px 0;
    padding: 0 #{$gutter};
    text-decoration: none;
}
.card-background {
    aspect-ratio: 1 / 0.75;
    margin: 0 0 20px;
    .fast-image {
        width: 100%;
        height: 100%;
    }
}
.label {
    margin: 0 0 20px;
    font-family: $plex-sans;
    font-size: 1.5rem;
    line-height: 19px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $gold;
}
.experience-title {
    margin: 0 0 20px;
    font-family: $plex-serif;
    font-weight: normal;
    font-size: 4.2rem;
    line-height: 55px;
    color: $grey-1;
}
.experience-intro {
    margin: 0 0 40px;
    ::deep p {
        margin: 0;
    }
}

@media (min-width: $tablet) {
    .experience-card {
        display: flex;
        align-items: center;
        padding: 0;
        &:nth-child(even) {
            flex-direction: row-reverse;
        }
    }
    .card-background,
    .card-content {
        flex: 0 0 auto;
        width: 50%;
        padding: 0 #{$gutter};
    }
}

@media (min-width: $desktop-large) {
    .wrapper-experiences {
        padding: 75px 0;
    }
    .experience-card {
        .card-content {
            margin-left: percentage(math.div(1, 10));
        }
        &:nth-child(even) {
            .card-content {
                margin-left: 0;
                margin-right: percentage(math.div(1, 10));
            }
        }
    }
    .card-content {
        width: percentage(math.div(4, 10));
    }
}
</style>
