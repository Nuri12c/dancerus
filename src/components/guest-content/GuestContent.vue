
<template>
  <body>
    <sectionHero/>
    <sectionContest/>
    <sectionRevievs/>
    <sectionWhy/>
    <sectionGroup/>
  </body>
</template>

<script>
import sectionHero from "./section-hero/sectionHero.vue";
import sectionContest from "./section-contests/sectionContest.vue";
import sectionRevievs from "./section-reviews/sectionReviews.vue";
import sectionWhy from "./section-why/sectionWhy.vue";
import sectionGroup from "./section-group/sectionGroup.vue";
export default {
  components: {
    sectionHero,
    sectionContest,
    sectionRevievs,
    sectionWhy,
    sectionGroup
  },
};
</script>
<style scoped>

</style>
