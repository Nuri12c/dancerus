
<template>
  <body>
    <sectionHero/>
   <sectionContest/>

    <sectionRevievs/>
    <sectionClips/>
    <sectionPhotos/>
    <sectionGroup/>
    <sectionTeam/>
    <sectionScores/>
    <sectionResident/>
  </body>
</template>

<script>
import sectionHero from "./section-hero/sectionHero.vue";
import sectionContest from "./section-contests/sectionContest.vue";
import sectionRevievs from "./section-reviews/sectionReviews.vue";
import sectionGroup from "./section-group/sectionGroup.vue";
import sectionClips from "./section-clips/sectionClips.vue";
import sectionPhotos from "./section-photos/sectionPhotos.vue";
import sectionTeam from "./section-team/sectionTeam.vue";
import sectionScores from "./section-scores/sectionScores.vue";
import sectionResident from "./section-resident/sectionResident.vue";

export default {
  components: {
    sectionHero,
    sectionContest,
    sectionRevievs,
    sectionGroup,
    sectionClips,
    sectionPhotos,
    sectionTeam,
    sectionScores,
    sectionResident
  },
};
</script>
<style scoped>

</style>
