<template>
  <section class="president-card">
    <h2 class="president-card__title">Карта президента</h2>

    <div class="president-card__actions">
      <button class="president-card__action-btn">
        Вам сообщение! <span class="president-card__cursor"></span>
      </button>
      <button class="president-card__action-btn">
        Правила пользования картой <span class="president-card__cursor"></span>
      </button>
    </div>

    <h3 class="president-card__section-title">Этапы участия в программе:</h3>

    <div class="president-card__cards">
      <div v-for="n in 8" :key="n" class="president-card__card-wrapper">
        <div
          class="president-card__card"
          :class="{ 'president-card__card--locked': n > presidentLevel }"
          :style="{
            background: cardBackgrounds[n - 1],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <!-- Оверлей и замок для заблокированных -->
          <div
            v-if="n > presidentLevel"
            class="president-card__locked-overlay"
          ></div>
          <div v-if="n > presidentLevel" class="president-card__lock-wrapper">
            <img
              src="@/assets/images/cabinet/lock.svg"
              alt="Заблокировано"
              class="president-card__lock-icon"
            />
          </div>
        </div>

        <p class="president-card__card-label">
          {{ cardLabels[n - 1] }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  computed: {
    presidentLevel() {
      return this.authStore.presidentLevel
    },
  },
  data() {
    return {
      cardLabels: [
        "Ежемесячная стипендия в размере 400 р. на каждого участника участвующего в проектах «Танцуй, Россия»",
        "Видео-разбор номера от профессионального хореографа-постановщика",
        "Интерактивный тимбилдинг для детей, родителей и руководителей",
        "Личный онлайн мастер-класс для руководителя от одного из лучших хореографов РФ",
        "Закрытая онлайн конференция мотивационного тренинга",
        "Личные мастер класс по вашему направлению от одного из лучших хореографов РФ",
        "Постановочный номер от одного из лучших хореографов РФ",
        "Индивидуальная годовая программа с возможностью выбрать 3 бонуса из предыдущих этапов и распределить их в течении года по своему усмотрению"
      ],
      cardBackgrounds: [
        `url(${require('@/assets/images/president-card/stipendia.jpg')})`,
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        `url(${require('@/assets/images/president-card/mkruk.jpg')})`,
        `url(${require('@/assets/images/president-card/konf.jpg')})`,
        `url(${require('@/assets/images/president-card/mk.png')})`,
        `url(${require('@/assets/images/president-card/nomer.jpg')})`,
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
      ],
    }
  },
}
</script>

<style scoped>
/* === БЛОК: president-card === */
.president-card {
  max-width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

/* Заголовки */
.president-card__title {
  margin: 0 0 1.65vw;
  font-family: "Gothic", sans-serif;
  font-size: 3.48vw;
  text-align: left;
  color: #ffffff;
}

.president-card__section-title {
  margin: 0 0 1vw;
  font-weight: 600;
  font-size: 1.2rem;
  color: #ffffff;
}

/* Кнопки действий */
.president-card__actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.president-card__action-btn {
  font-weight: 600;
  font-size: 1.67vw;
  padding: 0 1.2rem 0.5rem;
  background: #f0f0f0;
  border: none;
  border-radius: 0.63vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5vw;
  transition: background 0.2s;
}

.president-card__action-btn:hover {
  background: #e0e0e0;
}

.president-card__cursor {
  width: 2.24vw;
  height: 2.24vw;
  background: url("@/assets/images/cabinet/cursor.svg") no-repeat center/contain;
  display: inline-block;
  transform: translateY(0.4vw);
}

/* === КАРТОЧКИ (8 штук) === */
.president-card__cards {
  display: grid;
  grid-template-columns: repeat(4, 14.5vw);   /* 4 в ряд = 8 карточек */
  gap: 0 2vw;
  justify-content: flex-start;
  padding: 0;
}

.president-card__card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.president-card__card {
  width: 100%;
  height: 8vw;                                 /* Уменьшена высота под 8 карточек */
  border: 1px solid #ddd;
  border-radius: 0.7vw;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: default;
}

.president-card__card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

/* Заблокированная карточка */
.president-card__card--locked {
  pointer-events: none;
}

/* Тёмный оверлей */
.president-card__locked-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.461);
  border-radius: 0.7vw;
  z-index: 1;
}

/* Замок по центру */
.president-card__lock-wrapper {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.president-card__lock-icon {
  width: 3.5vw;
  height: 3.5vw;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* Подпись под карточкой */
.president-card__card-label {
  margin-top: 0.5rem;
  max-width: 14.5vw;
  font-weight: 600;
  font-size: 0.85vw;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
}

/* === АДАПТИВ (мобильная версия) === */
@media (max-width: 768px) {
  .president-card {
    padding: 14vw 4vw;
  }

  .president-card__title {
    font-size: 6.8vw;
    margin-bottom: 8.5vw;
    text-align: center;
  }

  .president-card__actions {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .president-card__action-btn {
    font-size: 3.8vw;
    padding: 1.2rem 1.5rem;
    width: 76vw;
    border-radius: 3vw;
    justify-content: center;
    gap: 1.5vw;
  }

  .president-card__cursor {
    width: 5.5vw;
    height: 5.5vw;
    transform: translateY(0.8vw);
  }

  .president-card__section-title {
    font-size: 5.5vw;
    margin-bottom: 4vw;
    text-align: center;
  }

  .president-card__cards {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    align-items: center;
  }

  .president-card__card {
    width: 78.86vw;
    height: 42vw;
    border-radius: 2.5vw;
  }

  .president-card__locked-overlay {
    border-radius: 2.5vw;
  }

  .president-card__lock-icon {
    width: 16vw;
    height: 16vw;
  }

  .president-card__card-label {
    margin-top: 3vw;
    font-size: 4.2vw;
    font-weight: 700;
    color: #ffffff;
    max-width: 87.86vw;
  }
}
</style>