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
        <img :src="card.img" :alt="card.heading" class="contest__img-element" />
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

    <!-- Модалка отдельным компонентом -->
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
        { heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ В ПРЯМОМ ЭФИРЕ", date: "12-13 сентября", img: require("@/assets/images/liveStream.png") },
        { heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ОТБОРОЧНЫЙ ЭТАП", date: "20-21 октября", img: require("@/assets/images/OchnoeStream.png") },
        { heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ПОЛУФИНАЛ", date: "15-16 ноября", img: require("@/assets/images/polufinalStream.png") },
        { heading: "ТОЧКА ВЗЛЕТА ФИНАЛ", date: "10-11 декабря", img: require("@/assets/images/tochkaVzleta.png") },
        { heading: "4FEST", date: "18-19 января", img: require("@/assets/images/4fest.png") },
        { heading: "КОНКУРЕНТ", date: "25-26 февраля", img: require("@/assets/images/konkurent.png") },
      ],
    };
  },
  methods: {
    openModal(card) { this.activeCard = card; },
    closeModal() { this.activeCard = null; },
  }
};
</script>
