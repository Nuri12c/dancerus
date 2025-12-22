
<template>
  <body>
    <sectionHero/>
   <sectionContest/>

    <sectionRevievs/>
    <sectionClips/>
    <sectionStats/>
    <sectionJury/>
     <sectionResident @open-auth-modal="$emit('open-auth-modal')"/>
     <sectionSponsor/>

    <sectionPhotos/>
    <sectionTeam/>




  </body>
</template>

<script>
import sectionHero from "./section-hero/sectionHero.vue";
import sectionContest from "./section-contests/sectionContest.vue";
import sectionRevievs from "./section-reviews/sectionReviews.vue";
import sectionClips from "./section-clips/sectionClips.vue";
import sectionPhotos from "./section-photos/sectionPhotos.vue";
import sectionTeam from "./section-team/sectionTeam.vue";
import sectionResident from "./section-resident/sectionResident.vue";
import sectionStats from "./section-stats/sectionStats.vue";
import sectionSponsor from "./section-sponsor/sectionSponsor.vue";
import sectionJury from "./section-jury/sectionJury.vue";

export default {
  components: {
    sectionHero,
    sectionContest,
    sectionRevievs,
    sectionClips,
    sectionPhotos,
    sectionTeam,
    sectionResident,
    sectionStats,
    sectionSponsor,
    sectionJury
  },
};
</script>
<style scoped>

</style>
