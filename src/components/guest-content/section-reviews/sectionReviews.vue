<template>
  <section class="reviews">
    <h2 class="reviews__title">ОТЗЫВЫ</h2>

    <div class="reviews__slider-wrapper">
      <swiper
        :modules="[Navigation]"
        :slides-per-view="3"
        :space-between="spaceBetween"
        :allow-touch-move="true"
        :loop="true"
        :breakpoints="{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          768: { slidesPerView: 3, slidesPerGroup: 3 },
        }"
        :navigation="{
          nextEl: '.reviews__button--next',
          prevEl: '.reviews__button--prev',
        }"
        @swiper="onSwiper"
        @slideChange="updateCounter"
        @click="handleUserInteraction"
        @touchStart="handleUserInteraction"
      >
        <swiper-slide v-for="(review, index) in reviews" :key="index">
          <div class="reviews__card">
            <div class="reviews__card-stars">
              <img class="star" src="@/assets/images/Shape.svg" alt="" />
              <img class="star" src="@/assets/images/Shape.svg" alt="" />
              <img class="star" src="@/assets/images/Shape.svg" alt="" />
              <img class="star" src="@/assets/images/Shape.svg" alt="" />
              <img class="star" src="@/assets/images/Shape.svg" alt="" />
            </div>
            <p class="reviews__heading">{{ review.heading }}</p>
            <p class="reviews__text">{{ review.text }}</p>
            <div class="reviews__autor">
              <img
                class="reviews__author-img"
                :src="review.img"
                :alt="review.author"
              />
              <div class="autor__card">
                <p class="autor__card-text">{{ review.author }}</p>
                <p class="autor__card-city">{{ review.city }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- Кнопки навигации вне слайдера -->
      <button class="reviews__button reviews__button--prev"></button>
      <button class="reviews__button reviews__button--next rotate"></button>

      <!-- Панель управления для десктопа -->
      <div class="reviews__controls">
        <span class="reviews__counter">{{ counterText }}</span>
        <div class="reviews__buttons">
          <button
            class="reviews__button reviews__button--prev"
            @click="slidePrev"
          ></button>
          <button
            class="reviews__button reviews__button--next rotate"
            @click="slideNext"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default {
  name: "ReviewsSlider",
  components: { Swiper, SwiperSlide },
  setup() {
    const reviews = [
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
      {
        heading: "Отличные конкурсы!",
        text: "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса, все понятно доносят, условия проживания комфортные, команада “Танцуй, Россия” очень отзычивая.",
        author: "Андрей Курносов",
        city: "Москва, Россия",
        img: require("@/assets/images/Profile.png"),
      },
    ];

    const spaceBetween = ref(Math.round(window.innerWidth * 0.02));
    const swiperInstance = ref(null);
    const currentSlidesPerView = ref(3);
    const isAutoplayRunning = ref(true);

    const updateSpaceBetween = () => {
      spaceBetween.value = Math.round(window.innerWidth * 0.02);
    };

    let autoplayInterval = null;

    onMounted(() => {
      window.addEventListener("resize", updateSpaceBetween);
      startAutoplay();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateSpaceBetween);
      stopAutoplay();
    });

    const startAutoplay = () => {
      if (isAutoplayRunning.value && swiperInstance.value) {
        stopAutoplay(); // Очищаем предыдущий интервал, если он существует
        autoplayInterval = setInterval(() => {
          if (isAutoplayRunning.value) {
            const slidesPerView = swiperInstance.value.params.slidesPerView;
            const realIndex = swiperInstance.value.realIndex;
            console.log("Autoplay tick:", { realIndex, slidesPerView });
            if (slidesPerView === 3) {
              const newIndex = (realIndex + 3) % reviews.length;
              swiperInstance.value.slideToLoop(newIndex);
            } else {
              swiperInstance.value.slideNext();
            }
            updateCounter();
          }
        }, 10000);
      }
    };

    const stopAutoplay = () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    };

    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
      currentSlidesPerView.value = swiper.params.slidesPerView;
      console.log("Swiper initialized:", {
        slidesPerView: swiper.params.slidesPerView,
        realIndex: swiper.realIndex,
      });
      startAutoplay();
    };

    const updateCounter = () => {
      if (swiperInstance.value) {
        currentSlidesPerView.value = swiperInstance.value.params.slidesPerView;
        console.log("updateCounter called:", {
          realIndex: swiperInstance.value.realIndex,
          slidesPerView: swiperInstance.value.params.slidesPerView,
          currentSlidesPerView: currentSlidesPerView.value,
          counterText: counterText.value,
        });
      }
    };

    const counterText = computed(() => {
      if (!swiperInstance.value) {
        console.log("counterText: No swiper instance, defaulting to '1 из 9'");
        return "1 из 9";
      }
      const realIndex = swiperInstance.value.realIndex;
      const slidesPerView = swiperInstance.value.params.slidesPerView;
      const current = Math.min(realIndex + slidesPerView, reviews.length);
      console.log("counterText calculated:", {
        realIndex,
        slidesPerView,
        current,
        total: reviews.length,
      });
      return `${current} из ${reviews.length}`;
    });

    const slideNext = () => {
      if (swiperInstance.value) {
        const slidesPerView = swiperInstance.value.params.slidesPerView;
        const realIndex = swiperInstance.value.realIndex;
        console.log("slideNext:", { realIndex, slidesPerView });
        if (slidesPerView === 3) {
          const newIndex = (realIndex + 3) % reviews.length;
          swiperInstance.value.slideToLoop(newIndex);
        } else {
          swiperInstance.value.slideNext();
        }
        updateCounter();
      }
    };

    const slidePrev = () => {
      if (swiperInstance.value) {
        const slidesPerView = swiperInstance.value.params.slidesPerView;
        const realIndex = swiperInstance.value.realIndex;
        console.log("slidePrev:", { realIndex, slidesPerView });
        if (slidesPerView === 3) {
          const newIndex = (realIndex - 3 + reviews.length) % reviews.length;
          swiperInstance.value.slideToLoop(newIndex);
        } else {
          swiperInstance.value.slidePrev();
        }
        updateCounter();
      }
    };

    const handleUserInteraction = () => {
      if (isAutoplayRunning.value) {
        isAutoplayRunning.value = false;
        stopAutoplay();
        console.log("Autoplay stopped due to user interaction");
      }
    };

    return {
      reviews,
      Navigation,
      spaceBetween,
      onSwiper,
      slideNext,
      slidePrev,
      updateCounter,
      counterText,
      handleUserInteraction,
    };
  },
};
</script>
<style scoped>
/* сюда добавь свои стили */
</style>
