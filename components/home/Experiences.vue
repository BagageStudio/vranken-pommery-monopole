<template>
    <div class="wrapper-experiences">
        <div class="container">
            <div class="container-s">
                <div class="experiences-title content-pad">
                    <span class="label">{{ data.experiencesLabel }}</span>
                    <h3 class="experiences-title h2">{{ data.experiencesTitle }}</h3>
                </div>
                <div class="experiences">
                    <!-- <HomeExperienceCard :data="data.experiences[1]" />
                    <HomeExperienceCard :data="data.experiences[2]" /> -->
                    <HomeExperienceCard
                        v-for="experience in data.experiences"
                        :key="experience.id"
                        :data="experience"
                        class="experience"
                    />
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
    padding: 50px 0;
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
    margin: 20px 0 40px;
}

@media (min-width: $tablet) {
    .experiences {
        display: flex;
        align-items: center;
    }
    .experience {
        width: 50%;
    }
}
@media (min-width: $desktop) {
    .wrapper-experiences {
        padding: 100px 0;
    }
}
</style>
