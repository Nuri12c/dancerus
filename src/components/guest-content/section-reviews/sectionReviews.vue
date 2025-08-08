
<template>
  <section class="reviews">
    <h2 class="reviews__title">ОТЗЫВЫ</h2>

    <swiper
      :modules="[Navigation]"
      :slides-per-view="3"
      :space-between="42"
      :allow-touch-move="true"
      :breakpoints="{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
      @swiper="onSwiper"
      @slideChange="updateCounter"
    >
      <swiper-slide v-for="(review, index) in reviews" :key="index">
        <div class="reviews__card">
          <div class="reviews__card-stars">
            <img src="@/assets/images/Shape.svg" alt="" />
            <img src="@/assets/images/Shape.svg" alt="" />
            <img src="@/assets/images/Shape.svg" alt="" />
            <img src="@/assets/images/Shape.svg" alt="" />
            <img src="@/assets/images/Shape.svg" alt="" />
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

    <!-- Панель управления -->
    <div class="reviews__controls">
      <!-- Счётчик слева -->
      <span class="reviews__counter"
        >{{ currentGroup }} из {{ totalGroups }}</span
      >

      <!-- Кнопки справа -->
      <div class="reviews__buttons">
        <button
          class="reviews__button reviews__button--prev"
          @click="slidePrev"
        >

        </button>
        <button
          class="reviews__button reviews__button--next rotate"
          @click="slideNext"
        >

        </button>
      </div>
    </div>
  </section>
</template>

<script>
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
      }
    ];

    return { reviews, Navigation };
  },
  data() {
    return {
      currentGroup: 1,
      totalGroups: 3,
      swiperInstance: null,
    };
  },
  methods: {
    onSwiper(swiper) {
      this.swiperInstance = swiper;
    },
    slideNext() {
      if (this.swiperInstance) {
        this.swiperInstance.slideTo(this.swiperInstance.activeIndex + 3);
      }
    },
    slidePrev() {
      if (this.swiperInstance) {
        this.swiperInstance.slideTo(this.swiperInstance.activeIndex - 3);
      }
    },
    updateCounter() {
      if (this.swiperInstance) {
        this.currentGroup = Math.floor(this.swiperInstance.activeIndex / 3) + 1;
      }
    },
  },
};
</script>

<style scoped>
</style>