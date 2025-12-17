<template>
  <section class="scores">
    <h2 class="scores__title">Наши показатели</h2>

    <div class="scores__layout">
      <!-- Левая колонка -->
      <div class="scores__col">
        <div v-for="(card, index) in leftCards" :key="'left-' + index" class="score-card">
          <div class="score-card__number">{{ card.number }}</div>
          <div class="score-card__text">{{ card.text }}</div>
        </div>
      </div>

      <!-- Средняя колонка -->
      <div class="scores__col">
        <div v-for="(card, index) in centerCards" :key="'center-' + index" class="score-card">
          <div class="score-card__number">{{ card.number }}</div>
          <div class="score-card__text">{{ card.text }}</div>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="scores__col">
        <div v-for="(card, index) in rightCards" :key="'right-' + index" class="score-card score-card--img">
          <div class="score-card__img" :style="{ backgroundColor: card.bg }"></div>
          <div class="score-card__text">{{ card.text }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ScoresSection",
  data() {
    return {
      leftCards: [
        { number: "120+", text: "Проектов завершено" },
        { number: "15", text: "Лет на рынке" },
        { number: "50+", text: "Сотрудников" },
      ],
      centerCards: [
        { number: "95%", text: "Удовлетворённых клиентов" },
        { number: "200+", text: "Партнёров по всему миру" },
        { number: "30", text: "Наград за качество" },
      ],
      rightCards: [
        { bg: "#d8cfc4", text: "Инновационные решения" },
        { bg: "#c4b59a", text: "Высокая эффективность" },
        { bg: "#b5a68f", text: "Сильная команда" },
      ],
    };
  },
};
</script>

<style scoped>
.scores {
  background-color: #fcf5eb;
  padding: 2vw 10vw;
}



/* Основной layout */
.scores__layout {
  display: flex;
  gap: 2vw;
}

/* Колонки */
.scores__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

/* Карточка */
.score-card {
  background-color: #fff;
  border-radius: 1.3vw;
  padding: 1.5vw;
  text-align: center;
  box-shadow: 0 0.5vw 1vw rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.score-card__number {
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 0.5vw;
}

.score-card__text {
  font-size: 1.2vw;
  color: #555;
}

/* Карточки с картинкой */
.score-card--img {
  flex-direction: row;
  text-align: left;
  padding: 1vw;
}

.score-card__img {
  width: 4vw;
  aspect-ratio: 1 / 1;
  border-radius: 0.5vw;
  margin-right: 1vw;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .scores {
    padding: 5vw;
  }


  .scores__layout {
    flex-direction: column;
    gap: 5vw;
  }

  .score-card {
    padding: 4vw;
  }

  .score-card__number {
    font-size: 6vw;
    margin-bottom: 2vw;
  }

  .score-card__text {
    font-size: 4vw;
  }

  .score-card--img {
    flex-direction: row;
  }

  .score-card__img {
    width: 10vw;
    margin-right: 4vw;
  }
}
</style>
