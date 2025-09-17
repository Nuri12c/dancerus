<template>
  <section class="hero" :class="{ fading: isFading }" :style="{ backgroundImage: `url(${currentBg})` }">
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
          <p><b>Цель:</b> Не просто конкурсы, а путь, по которому дети обретают
            уверенность, педагоги — поддержку, а коллективы — возможности для
            роста, признания и новых горизонтов.</p>
        </div>
        <button class="button-1">Подать заявку</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      nextIndex: 1,
      intervalId: null,
      preloadTimeout: null,
      isFading: false,
      bgImages: [
        require('@/assets/images/section-hero-img/HeroBG.png'),
        require('@/assets/images/section-hero-img/IMG_2093.jpg'),
        require('@/assets/images/section-hero-img/IMG_2121.jpg'),
        require('@/assets/images/section-hero-img/IMG_2157.png')
      ]
    };
  },
  computed: {
    currentBg() {
      return this.bgImages[this.currentIndex];
    },
    nextBg() {
      return this.bgImages[this.nextIndex];
    }
  },
  mounted() {
    this.startSlideshow();
  },
  beforeUnmount() {
    this.stopSlideshow();
  },
  methods: {
    startSlideshow() {
      this.preloadNext();
      this.intervalId = setInterval(() => {
        this.isFading = true; // Начинаем анимацию
        this.nextIndex = (this.currentIndex + 1) % this.bgImages.length;
        setTimeout(() => {
          this.currentIndex = this.nextIndex; // Обновляем текущий фон
          this.isFading = false; // Завершаем анимацию
          this.preloadNext(); // Предзагружаем следующий
        }, 500); // Длительность анимации opacity
      }, 5000); // Смена каждые 5 сек
    },
    preloadNext() {
      if (this.preloadTimeout) clearTimeout(this.preloadTimeout);
      this.preloadTimeout = setTimeout(() => {
        const nextIndex = (this.currentIndex + 1) % this.bgImages.length;
        const img = new Image();
        img.src = this.bgImages[nextIndex]; // Предзагрузка за 2 сек
      }, 3000); // 5 сек - 2 сек = 3 сек
    },
    stopSlideshow() {
      if (this.intervalId) clearInterval(this.intervalId);
      if (this.preloadTimeout) clearTimeout(this.preloadTimeout);
    }
  }
};
</script>

<style scoped>

</style>