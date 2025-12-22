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
          heading: "4FEST ПРЕМИЯ ЛАУРЕАТОВ",
          img: require('@/assets/images/section-contest/4-fest.png')
        },
        {
          heading: "KONKURENT ТАНЦЕВАЛЬНЫЙ ФЕСТИВАЛЬ",
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
<style lang="scss" scoped>
.contest {
  padding: 2.93% 10.5%;
  color: #262626;
  background-color: #fcf5eb;
}

.contest__title {
  margin-bottom: 3.333333vw;
}

.contest__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.666667vw;
  list-style: none;
  padding: 0;
}

.contest__card {
  flex: 1 1 calc(25% - 0.729167vw);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}



.contest__img-element {
  width: 100%;
  height: 15.020833vw;
  object-fit: cover;
  margin-bottom: 1.25vw;
  border-radius: 0.833333vw;
}

.contest__content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 1vw;
}

.contest__text {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.520833vw;
}

.contest__heading {
  font-family: 'Oswald', sans-serif;
  font-size: 1.25vw;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0.260417vw;
}

.contest__date {
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  font-size: 0.833333vw;
  font-weight: 400;
}

.contest__button {
  display: flex;
  align-items: center;
  gap: 0.520833vw;
}

.dark {
  border-color: #262626;
  color: #262626;
  font-weight: 600;
}
.contest__card:hover {
  transform: scale(1.02);
}

/* Адаптив */
@media (max-width: 768px) {
  .contest {
    padding: 4.975vw;
  }
  .contest__title {
    font-size: 5.97vw;
    margin-bottom: 7.96vw;
  }
  .contest__card {
    flex: 1 1 100%;
    margin-bottom: 3vw;
  }
  .contest__heading {
    font-size: 4.975vw;
  }
  .contest__img-element {
    width: 90.05vw;
    height: 55.30vw;
    border-radius: 3.98vw;
  }
  .contest__text {
    flex-direction: column;
  }
  .contest__date {
    font-size: 3.483vw;
  }
  .contest__button-element {
    font-size: 4.975vw;
  }
}
</style>