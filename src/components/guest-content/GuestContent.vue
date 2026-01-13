
<template>
  <body>
    <sectionHero />
    <sectionContest />

    <sectionRevievs />
    <sectionClips />
    <sectionStats />
    <sectionJury />
    <sectionResident @open-auth-modal="$emit('open-auth-modal')" />
    <sectionSponsor />

    <sectionPhotos />
    <sectionTeam />
    <sectionFooter />
    <!-- куки баннер -->
    <transition name="cookie-fade">
      <div v-if="showCookie" class="cookie">
        <p class="cookie__text">Мы используем cookies и Яндекс Метрику</p>
        <button class="cookie__btn" @click="acceptCookie">ОК</button>
      </div>
    </transition>
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
import sectionFooter from "./section-footer/sectionFooter.vue";

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
    sectionJury,
    sectionFooter,
  },
  data() {
    return { showCookie: false };
  },
  mounted() {
    if (!localStorage.getItem("cookieAccepted")) {
      this.showCookie = true;
    }
  },
  methods: {
    acceptCookie() {
      localStorage.setItem("cookieAccepted", "true");
      this.showCookie = false;
    },
  },
};
</script>
<style scoped>
.cookie {
  position: fixed;
  bottom: 1vw; /* отступ от низа экрана */
  left: 50%; /* центрируем */
  transform: translateX(-50%); /* сдвиг для точного центра */

  width: fit-content; /* ширина в процентах от окна */

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1vw;

  padding: 0.1vw 1vw;
  border-radius: 12px;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-size: 0.9vw;
  color: #222;
  z-index: 9999;
}

.cookie__text {
  white-space: nowrap;
}

.cookie__btn {
  padding: 0.5vw 1vw;
  border-radius: 8px;
  border: none;
  background: #ff4d4f;
  color: #fff;
  font-size: 0.9vw;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.cookie__btn:hover {
  background: #e64547;
}

.cookie__btn:active {
  transform: scale(0.95);
}

/* Плавное появление */
.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Мобилки */
@media (max-width: 760px) {
  .cookie {
    gap: 0;
    flex-direction:row;
    text-align: center;
  }

  .cookie__btn {
    font-size: 4vw;
    margin-left: 1vw;
  }

  .cookie__text {
    white-space:nowrap;
  }
}
</style>
