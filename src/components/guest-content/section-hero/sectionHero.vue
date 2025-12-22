<template>
  <section id="hero" class="hero" :style="{ backgroundImage: `url(${bgImage})` }">
    <div class="hero__container">
      <h1 class="hero__heading">
        Международное хореографическое <br />движение «Танцуй, Россия»
      </h1>
      <div class="hero__content">
        <div class="hero__text">
          <p><b>Миссия:</b> Помогать, поддерживать и приносить реальную пользу каждому
            ребенку, педагогу и коллективу, стремящемуся к развитию в мире
            хореографии. Мы создаём доступную и вдохновляющую среду, где талант
            может расти, а усилия — превращаться в результат.</p>
        </div>
        <button @click="openPhoneModal" class="button-1 button-hero">Подать заявку</button>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
  data() {
    return {
      bgImage: require('@/assets/images/section-hero-img/HeroBG.jpg')
    };
  },
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
@use '@/styles/mixins.scss';

.hero {
  width: 100%;
  min-height: 100vh;
  position: relative;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  flex-direction: column;
}

/* 🔽 Тёмное "облако" снизу */
.hero::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90%;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0)
  );

  pointer-events: none;
  z-index: 1;
}

.hero__container {
  position: relative;
  z-index: 2;
  flex: 1;
  padding: 6.5% 2.5% 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero__heading {
  color: #ffffff;
  font-size: 4.3vw;
}

.hero__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.hero__text {
  width: 60%;
  line-height: 1.92vw;

}

.hero__text p {
  color: #ffffff;
}
.button-hero {
  font-size: 2.21vw;
}
/* ===== Мобильная версия ===== */

@media (max-width: 768px) {
  .button-hero {
  font-size: 10.21vw;

}
  .hero {
     min-height: 120vh;

  }
  .hero__container {
    padding: 18.91% 4.98%;
    justify-content:space-between;
    align-items: center;
  }

  .hero__heading {
    font-size: 7.96vw;
    margin-top: 0;
  }

  .hero__content {
    flex-direction: column;

    align-items: center; /* ✅ центр по горизонтали */
  }

  .hero__text {
    width: 100%;
    line-height: 1.5;
  }

  .hero__text p {
    font-size: 3.73vw;
  }
  /* 🔽 Тёмное "облако" снизу */
.hero::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90%;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );

  pointer-events: none;
  z-index: 1;
}
}

</style>