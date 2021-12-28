<template>
    <div class="wrapper-experiences">
        <div class="container">
            <div class="experiences-cols container-s">
                <div class="experiences-col content-pad">
                    <span class="label">{{ data.experiencesLabel }}</span>
                    <h3 class="experiences-title h2">{{ data.experiencesTitle }}</h3>
                    <HomeExperienceCard :data="data.experiences[0]" />
                </div>
                <div class="experiences-col content-pad">
                    <HomeExperienceCard :data="data.experiences[1]" />
                    <HomeExperienceCard :data="data.experiences[2]" />
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
    padding: 50px 0 10px;
    background: $beige;
}
.label {
    font-family: $plex-sans;
    font-size: 1.5rem;
    line-height: 19px;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: $gold;
}
.experiences-title {
    margin: 20px 0;
}

@media (min-width: $tablet) {
    .wrapper-experiences {
        padding: 30px 0;
    }
    .btn-experiences {
        margin-bottom: 20px;
    }
    .experiences-cols {
        display: flex;
        align-items: center;
    }
    .experiences-col {
        width: 50%;
    }
}
@media (min-width: $desktop) {
    .wrapper-experiences {
        padding: 80px 0;
    }
}
</style>
