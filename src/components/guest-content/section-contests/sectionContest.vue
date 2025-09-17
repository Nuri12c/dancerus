<template>
  <section class="contest">
    <h2 class="contest__title">Наши конкурсы</h2>
    <ul class="contest__cards">
      <li
        class="contest__card"
        v-for="(card, i) in contests"
        :key="i"
        @click="openModal(card)"
      >
        <img
          :src="card.img"
          :alt="card.heading"
          class="contest__img-element"
          @error="handleImageError"
        />
        <div class="contest__content">
          <div class="contest__text">
            <div class="contest__heading">{{ card.heading }}</div>
            <div class="contest__date">{{ card.date }}</div>
          </div>
          <div class="contest__button">
            <button class="contest__button-element">Узнать подробнее</button>
            <span class="contest__button-icon"></span>
          </div>
        </div>
      </li>
    </ul>

    <ContestModal
      v-if="activeCard"
      :card="activeCard"
      @close="closeModal"
    />
  </section>
</template>

<script>
import ContestModal from '@/components/modals/ContestModal.vue';

export default {
  components: { ContestModal },
  data() {
    return {
      activeCard: null,
      contests: [
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ В ПРЯМОМ ЭФИРЕ",
          date: "12-13 сентября",
          img: require('@/assets/images/liveStream.png'),
          text: "В жюри — только заслуженные мастера своего дела...",
          imagePaths: [
            require('@/assets/images/tockaVzleta/IMG_2124.jpg'),
            require('@/assets/images/tockaVzleta/IMG_2261.jpg'),
            require('@/assets/images/tockaVzleta/IMG_2263.jpg'),
            require('@/assets/images/tockaVzleta/IMG_2264.jpg'),
            require('@/assets/images/tockaVzleta/IMG_2265.jpg'),
            require('@/assets/images/tockaVzleta/IMG_2268.jpg')
          ]
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ОТБОРОЧНЫЙ ЭТАП",
          date: "20-21 октября",
          img: require('@/assets/images/OchnoeStream.png'),
          text: "Отборочный этап для выявления лучших участников...",
          imagePaths: [
            require('@/assets/images/OchnoeStream.png'),
            require('@/assets/images/polufinalStream.png')
          ]
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ПОЛУФИНАЛ",
          date: "15-16 ноября",
          img: require('@/assets/images/polufinalStream.png'),
          text: "Полуфинал, где участники соревнуются за право выйти в гранд-финал.",
          imagePaths: [
            require('@/assets/images/polufinalStream.png'),
            require('@/assets/images/tochkaVzleta.png')
          ]
        },
        {
          heading: "ТОЧКА ВЗЛЕТА ФИНАЛ",
          date: "10-11 декабря",
          img: require('@/assets/images/tochkaVzleta.png'),
          text: "Грандиозный финал, определяющий победителей конкурса 'Точка взлета'.",
          imagePaths: [
            require('@/assets/images/tochkaVzleta.png'),
            require('@/assets/images/konkurent.png')
          ]
        },
        {
          heading: "4FEST",
          date: "18-19 января",
          img: require('@/assets/images/4fest.png'),
          text: "Фестиваль творчества и инноваций, объединяющий талантливых участников.",
          imagePaths: [
            require('@/assets/images/4fest.png'),
            require('@/assets/images/liveStream.png')
          ]
        },
        {
          heading: "КОНКУРЕНТ",
          date: "25-26 февраля",
          img: require('@/assets/images/konkurent.png'),
          text: "Соревнование для тех, кто готов доказать свое превосходство в честной борьбе.",
          imagePaths: [
            require('@/assets/images/konkurent.png'),
            require('@/assets/images/OchnoeStream.png')
          ]
        },
      ],
    };
  },
  methods: {
    openModal(card) {
      this.activeCard = { ...card };
    },
    closeModal() {
      this.activeCard = null;
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src);
      event.target.src = require('@/assets/images/liveStream.png');
    },
  },
};
</script>