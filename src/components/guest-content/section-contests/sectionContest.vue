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
          img: require("@/assets/images/liveStream.png"),
          text: "В жюри — только заслуженные мастера своего дела, люди, чьё мнение ценят и уважают в хореографическом мире. Свою оценку и обратную связь вам дадут: Ашот Назаретян, Алексей Кузьменко, Егор Дружинин, Елена Барткайтис, Герман Ромазанов и другие лучшие хореографы страны.Прозрачная система оценок гарантирует честность — баллы за номер доступны сразу, а на круглом столе вы получите подробную обратную связь именно по вашему выступлению."
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ОТБОРОЧНЫЙ ЭТАП",
          date: "20-21 октября",
          img: require("@/assets/images/OchnoeStream.png"),
          text: "Отборочный этап для выявления лучших участников, готовых побороться за выход в полуфинал."
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ПОЛУФИНАЛ",
          date: "15-16 ноября",
          img: require("@/assets/images/polufinalStream.png"),
          text: "Полуфинал, где участники соревнуются за право выйти в гранд-финал."
        },
        {
          heading: "ТОЧКА ВЗЛЕТА ФИНАЛ",
          date: "10-11 декабря",
          img: require("@/assets/images/tochkaVzleta.png"),
          text: "Грандиозный финал, определяющий победителей конкурса 'Точка взлета'."
        },
        {
          heading: "4FEST",
          date: "18-19 января",
          img: require("@/assets/images/4fest.png"),
          text: "Фестиваль творчества и инноваций, объединяющий талантливых участников."
        },
        {
          heading: "КОНКУРЕНТ",
          date: "25-26 февраля",
          img: require("@/assets/images/konkurent.png"),
          text: "Соревнование для тех, кто готов доказать свое превосходство в честной борьбе."
        },
      ],
    };
  },
  methods: {
    openModal(card) { this.activeCard = card; },
    closeModal() { this.activeCard = null; },
  }
};
</script>