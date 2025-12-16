<template>
  <section id="contests" class="contest">
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
        />
        <div class="contest__content">
          <div class="contest__text">
            <div class="contest__heading">{{ card.heading }}</div>
            <div class="contest__date">{{ card.date }}</div>
          </div>
          <div class="contest__button">
            <button class="button-2 dark">ПОДАТЬ ЗАЯВКУ</button>
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
          img: require('@/assets/images/section-contest/PV-online.png')
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ПОЛУФИНАЛ",
          date: "10 марта - 26 апреля 2026",
          img: require('@/assets/images/section-contest/PV-polufinal.png')
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ФИНАЛ",
          date: "осень 2026",
          img: require('@/assets/images/section-contest/PV-final.png')
        },
        {
          heading: "4FEST",
          date: "май 2026",
          img: require('@/assets/images/section-contest/4-fest.png')
        },
        {
          heading: "КОНКУРЕНТ",
          date: "апрель 2026",
          img: require('@/assets/images/section-contest/konkurent.png')
        },
        {
          heading: "КУЛЬТУРНОЕ НАСЛЕДИЕ",
          date: "декабрь 2026",
          img: require('@/assets/images/calendar-tab/nasledie-bg.png')
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
    }
  },
};
</script>