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

      <!-- Кнопки по бокам — всегда видны -->
      <button
        class="reviews__button reviews__button--prev"
        @click="slidePrev"
      ></button>
      <button
        class="reviews__button reviews__button--next rotate"
        @click="slideNext"
      ></button>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default {
  name: "ReviewsSlider",
  components: { Swiper, SwiperSlide },
  setup() {
    const reviews = [
      {
        heading: "Большая сильная команда!",
        text: "Россия богата талантливыми детьми! Это очень радует! Классные танцы, крутые хореографы! Это большой опыт для всех, даже в организации своих проектов. Вам желаем дальнейшего процветания, успехов и благополучия!",
        author: "Ильшат Хатимович",
        city: "Республика Башкортостан",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Все на высшем уровне!",
        text: "Программа конкурса,гостиница, завтраки, ужины все очень сытно, вкусно, чисто аккуратно интересная, впечатляющая экскурсия, трансферы комфортные, удобные, во время приезжали, выезжали все очень понравилось.",
        author: "Мария Попова",
        city: "Республика Саха Якутия",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Слаженная команда!",
        text: "Видно, что работа проделана колоссальная в проведении данного мероприятия! У вас слаженная команда ,все четко, ясно, по факту! Родители и участники остались довольны, все под впечатлением,спасибо за эмоции, за компетентное жюри.",
        author: "~ Юлия",
        city: "г. Кострома",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Несравнимо!",
        text: "Мы приехали почти коллектив из 100 человек, ездим уже около 12 лет, где только не были, как на территории РФ,так и за пределами.Выезжаем всегда большой командой, нам есть с чем сравнить. Все было на должном уровне, как при подготовке так и во время конкурса.",
        author: "Лариса Садыкова",
        city: "г. Нижнекамск",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Организация на высшем уровне! ",
        text: "Огромная благодарность организаторам! За терпение и понимание, за душевную щедрость и теплоту! За оперативность и компетентность! Так же благодарим за возможность получить Корректную, конструктивную критику по каждому номеру от жюри! Уезжаем с массой ярких впечатлений и положительных эмоций!",
        author: "~ Наталья",
        city: "Санкт-Петербург",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Не ошиблась в выборе!",
        text: "В выборе я не ошиблась. Члены жюри были очень объективны, так как надо было выбирать коллективы на финал сильные, чтобы было интересно и драйвово . Конкуренция должна быть как добрая, но и сильная. Нам по другому не интересно. Надо учиться друг у друга. ",
        author: "Марина",
        city: "Россия",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Спасибо большое!",
        text: "Мы с вами уже второй год и второй год получаем только положительные эмоции от вашего конкурса Спасибо большое! Всегда что-то новое, интересное. Самое главное, что вы не стоите на месте, стараетесь вводить интересные ни на кого не похожие новинки, всегда развиваетесь и стремитесь к лучшему!",
        author: "~ Катя",
        city: "Россия",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Незабываемые впечатления!",
        text: "Студия LIAISAN благодарим, за полуфинал Организаторов конкурса Незабываемые эмоции и впечатления навсегда останутся в нашей памяти! Спасибо, что создаёте для детей атмосферу сплоченности и борьбы.Очень круто!",
        author: "~ Светлана",
        city: "Россия",
        img: require("@/assets/images/profile.svg"),
      },
      {
        heading: "Багаж эмоций!",
        text: "Всё было продумано до мелочей — от общения с кураторами до атмосферы на площадке. Спасибо жюри за профессионализм, объективность и ценные рекомендации — они вдохновляют двигаться дальше и расти! Уезжаем с прекрасным настроением, багажом эмоций и желанием вернуться снова!",
        author: "~ Елена",
        city: "г. Самара",
        img: require("@/assets/images/profile.svg"),
      },
    ];
const spaceBetween = ref(Math.round(window.innerWidth * 0.02));
  const swiperInstance = ref(null);
  const isAutoplayRunning = ref(true); // ← флаг
  let autoplayInterval = null;

  const updateSpaceBetween = () => {
    spaceBetween.value = Math.round(window.innerWidth * 0.02);
  };

  onMounted(() => {
    window.addEventListener("resize", updateSpaceBetween);
    startAutoplay();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateSpaceBetween);
    stopAutoplay();
  });

  const onSwiper = (swiper) => {
    swiperInstance.value = swiper;
    startAutoplay();
  };

  // — ОСТАНОВКА АВТОПЛЕЯ ПРИ ЛЮБОМ ВЗАИМОДЕЙСТВИИ
  const stopAutoplayOnInteraction = () => {
    if (isAutoplayRunning.value) {
      isAutoplayRunning.value = false;
      stopAutoplay();
      console.log("Autoplay stopped by user");
    }
  };

  const slideNext = () => {
    if (!swiperInstance.value) return;
    stopAutoplayOnInteraction(); // ← ВАЖНО!

    const slidesPerView = swiperInstance.value.params.slidesPerView;
    if (slidesPerView === 3) {
      const newIndex = (swiperInstance.value.realIndex + 3) % reviews.length;
      swiperInstance.value.slideToLoop(newIndex);
    } else {
      swiperInstance.value.slideNext();
    }
  };

  const slidePrev = () => {
    if (!swiperInstance.value) return;
    stopAutoplayOnInteraction(); // ← ВАЖНО!

    const slidesPerView = swiperInstance.value.params.slidesPerView;
    if (slidesPerView === 3) {
      const newIndex = (swiperInstance.value.realIndex - 3 + reviews.length) % reviews.length;
      swiperInstance.value.slideToLoop(newIndex);
    } else {
      swiperInstance.value.slidePrev();
    }
  };

  const startAutoplay = () => {
    if (!isAutoplayRunning.value || !swiperInstance.value) return;
    stopAutoplay();

    autoplayInterval = setInterval(() => {
      if (isAutoplayRunning.value && swiperInstance.value) {
        const slidesPerView = swiperInstance.value.params.slidesPerView;
        if (slidesPerView === 3) {
          const newIndex = (swiperInstance.value.realIndex + 3) % reviews.length;
          swiperInstance.value.slideToLoop(newIndex);
        } else {
          swiperInstance.value.slideNext();
        }
      }
    }, 10000);
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  // Останавливаем при свайпе / клике по слайду
  const handleUserInteraction = () => {
    stopAutoplayOnInteraction();
  };

  return {
    reviews,
    Navigation,
    spaceBetween,
    onSwiper,
    slideNext,
    slidePrev,
    handleUserInteraction,
  };
},
};
</script>

<style scoped>

</style>