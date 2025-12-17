<template>
  <section id="contests" class="contest">
    <h2 class="contest__title">Наши конкурсы</h2>
    <ul class="contest__cards">
      <li
        class="contest__card"
        v-for="(card, i) in contests"
        :key="i"
        @click="openPhoneModal"
      >
        <img
          :src="card.img"
          :alt="card.heading"
          class="contest__img-element"
        />
        <div class="contest__content">
          <div class="contest__text">
            <div class="contest__heading">{{ card.heading }}</div>
          </div>
          <div class="contest__button">
            <button  class="button-2 dark">ПОДАТЬ ЗАЯВКУ</button>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
  data() {
    return {
      activeCard: null,
      contests: [
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ В ПРЯМОМ ЭФИРЕ",
          img: require('@/assets/images/section-contest/PV-online.jpg')
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ПОЛУФИНАЛ",
          img: require('@/assets/images/section-contest/PV-polufinal.png')
        },
        {
          heading: "ПРЯМОЕ ВКЛЮЧЕНИЕ ФИНАЛ",
          img: require('@/assets/images/section-contest/PV-final.png')
        },
        {
          heading: "4FEST",
          img: require('@/assets/images/section-contest/4-fest.png')
        },
        {
          heading: "КОНКУРЕНТ",
          img: require('@/assets/images/section-contest/konkurent.png')
        },
        {
          heading: "КУЛЬТУРНОЕ НАСЛЕДИЕ",
          img: require('@/assets/images/section-contest/nasledie.png')
        },
      ],
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