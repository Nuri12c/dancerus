
<template>
  <body>
    <sectionHero/>
    <sectionContest/>
    <sectionRevievs/>
  </body>
</template>

<script>
import sectionHero from "./section-hero/sectionHero.vue";
import sectionContest from "./section-contests/sectionContest.vue";
import sectionRevievs from "./section-reviews/sectionReviews.vue";

export default {
  components: {
    sectionHero,
    sectionContest,
    sectionRevievs
  },
};
</script>
<style scoped>

</style>
