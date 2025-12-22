<template>
  <section id="sponsor" class="sponsor">
    <div class="sponsor__content">
      <!-- ЛЕВАЯ КОЛОНКА -->
      <div class="sponsor__left">
        <h1 class="sponsor__title">НАШ Спонсор</h1>
        <h2 class="sponsor__subtitle">
          эксклюзивная программа поддержки от “Танцуй, россия”
        </h2>

        <div class="sponsor__card">
          <p class="sponsor__card-text">
            Программа «Наш спонсор» направлена на то, чтобы помочь коллективам
            найти спонсора и участвовать в конкурсах бесплатно!
          </p>
        </div>

        <button @click="openPhoneModal" class="button-1 sponsor__button">Вступить в программу</button>
      </div>

      <!-- ПРАВАЯ КОЛОНКА -->
      <div class="sponsor__right">
        <iframe
          class="sponsor__video"
          src="https://vkvideo.ru/video_ext.php?oid=-160233006&id=456241271&hash=bb29d0723c175476"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
  name: "SponsorSection",
   setup() {
    // Важно: получаем store в setup и возвращаем в компонент
    const authStore = useAuthStore()
    return { authStore }
  },

  methods: {
    openPhoneModal() {
      this.authStore.openPhoneModal()
    },
   }
};
</script>

<style scoped lang="scss">
.sponsor {
  position: relative;
  background-color: #000;
  padding: 4vw 10vw;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 60%;
    left: -10vw;
    right: -10vw;
    transform: translateY(-50%);
    height: 70vw;

    background-image: url("@/assets/images/p-resident-card/line.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;

    z-index: 0;
  }
}

.sponsor__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 65% 35%;
  gap: 1vw;
  align-items: stretch;
}

/* === ЛЕВАЯ КОЛОНКА === */
.sponsor__left {
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
}

.sponsor__title {
  color: #fff;
  font-size: 4.4vw;
  font-weight: normal;
}

.sponsor__subtitle {
  color: #fff;
  text-align: left;
  font-weight: normal;
}

.sponsor__card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.8vw;

  padding: 1.8vw;
  overflow: hidden;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
}
.sponsor__card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    130deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.02)
  );
  pointer-events: none;
}

.sponsor__card-text {
  color: #fff;
  font-size: 1vw;
  line-height: 1.4;
}

.sponsor__button {
  margin-top: 1vw;
  align-self: flex-start;
  padding: 0.8vw 2.2vw;
}

/* === ПРАВАЯ КОЛОНКА === */
.sponsor__right {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sponsor__video {
  height: 100%;
  width: auto;
  max-width: 100%;
  aspect-ratio: 9 / 16;
  border: none;
}

/* === АДАПТИВ === */
@media (max-width: 768px) {
  .sponsor {
    padding: 6vw 5vw;

    &::before {
      left: -25vw;
      right: -25vw;
      height: 60vw;
    }
  }

  .sponsor__content {
    grid-template-columns: 1fr;
  }

  .sponsor__title {
    font-size: 7vw;
  }

  .sponsor__subtitle {
    font-size: 4.2vw;
  }

  .sponsor__card-text {
    font-size: 3.5vw;
  }

  .sponsor__button {
    font-size: 3.5vw;
    padding: 2.5vw 6vw;
  }

  .sponsor__right {
    height: auto;
  }
  .sponsor__video {
    width: 100%;
    height: auto;
  }
}
</style>
