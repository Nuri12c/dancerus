
<template>
  <body>
    <section-hero/>
    <sectionContest/>
  </body>
</template>

<script>
import sectionHero from "./hero/sectionHero.vue";
import sectionContest from "./contests/sectionContest.vue";

export default {
  components: {
    sectionHero,
    sectionContest
  },
};
</script>
<style scoped>

</style>
