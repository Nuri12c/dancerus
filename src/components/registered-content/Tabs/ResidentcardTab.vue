<template>
  <section class="resident-card">
    <h2 class="resident-card__title">Карта резидента</h2>

    <div class="resident-card__actions">
      <button class="resident-card__action-btn">
        Вам сообщение! <span class="resident-card__cursor"></span>
      </button>
      <button class="resident-card__action-btn">
        Правила пользования картой <span class="resident-card__cursor"></span>
      </button>
    </div>

    <h3 class="resident-card__section-title">Этапы участия в программе:</h3>

    <div class="resident-card__cards">
      <div v-for="n in 6" :key="n" class="resident-card__card-wrapper">
        <div
          class="resident-card__card"
          :class="{ 'resident-card__card--locked': n > residentLevel }"
          :style="{
            background: cardBackgrounds[n - 1],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <!-- Оверлей и замок для заблокированных -->
          <div
            v-if="n > residentLevel"
            class="resident-card__locked-overlay"
          ></div>
          <div v-if="n > residentLevel" class="resident-card__lock-wrapper">
            <img
              src="@/assets/images/cabinet/lock.svg"
              alt="Заблокировано"
              class="resident-card__lock-icon"
            />
          </div>
        </div>

        <p class="resident-card__card-label">
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
    residentLevel() {
      return this.authStore.residentLevel
    },
  },
  data() {
    return {
      cardLabels: [
        "Карта резидента",
        "Ежемесячная стипендия в размере 200 рублей на каждого участника в проектах «Танцуй, Россия»",
        "Видео-разбор номера от профессионального хореографа-постановщика",
        "Личный мастер-класс по вашему направлению от одного из лучших хореографов РФ",
        "Фирменная футболка и портфель от нашей ассоциации каждому ребёнку",
        "Постановочный номер от хореографа по направлению для группы",
      ],
      cardBackgrounds: [
        `url(${require('@/assets/images/resident-card/carta.png')})`,
        `url(${require('@/assets/images/resident-card/stip.jpg')})`,
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        `url(${require('@/assets/images/resident-card/rez4.png')})`,
        `url(${require('@/assets/images/resident-card/rez5.png')})`,
        `url(${require('@/assets/images/resident-card/rez6.jpg')})`,
      ],
    }
  },
}
</script>

<style scoped>
/* === БЛОК: resident-card === */
.resident-card {
  max-width: 100%;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: "Inter", sans-serif;
}

/* Заголовки */
.resident-card__title {
  margin: 0 0 1.65vw;
  font-family: "Gothic", sans-serif;
  font-size: 3.48vw;
  text-align: left;
  text-transform: none;
  color: #222;
}

.resident-card__section-title {
  margin: 0 0 1vw;
  font-weight: 600;
  font-size: 1.2rem;
  color: #333;
}

/* Кнопки действий */
.resident-card__actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.resident-card__action-btn {
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

.resident-card__action-btn:hover {
  background: #e0e0e0;
}

.resident-card__cursor {
  width: 2.24vw;
  height: 2.24vw;
  background: url("@/assets/images/cabinet/cursor.svg") no-repeat center/contain;
  display: inline-block;
  transform: translateY(0.4vw);
}

/* === КАРТОЧКИ === */
.resident-card__cards {
  display: grid;
  grid-template-columns: repeat(3, 19vw);
  gap: 0 3vw;
  justify-content: flex-start;
  padding: 0;
}

.resident-card__card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resident-card__card {
  width: 100%;
  height: 10.5vw;
  border: 1px solid #ddd;
  border-radius: 0.83vw;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: default;
}

.resident-card__card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

/* Заблокированная карточка */
.resident-card__card--locked {
  pointer-events: none;
}

/* Тёмный оверлей */
.resident-card__locked-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.445);
  border-radius: 0.83vw;
  z-index: 1;
}

/* Замок по центру */
.resident-card__lock-wrapper {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.resident-card__lock-icon {
  width: 4.5vw;
  height: 4.5vw;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* Подпись под карточкой */
.resident-card__card-label {
  margin-top: 0.5rem;
  max-width: 19vw;
  font-weight: 600;
  font-size: 0.99vw;
  color: #ffffff;
  text-align: center;
  line-height: 1.3;
}

/* === АДАПТИВ (мобильная версия) === */
@media (max-width: 768px) {
  .resident-card {
    padding: 15vw 5vw;
  }

  .resident-card__title {
    font-size: 6.8vw;
    margin-bottom: 8.5vw;
    text-align: center;
  }

  .resident-card__actions {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .resident-card__action-btn {
    font-size: 3.8vw;
    padding: 1.2rem 1.5rem;
    width: 80vw;
    border-radius: 3vw;
    justify-content: center;
    gap: 1.5vw;
  }

  .resident-card__cursor {
    width: 5.5vw;
    height: 5.5vw;
    transform: translateY(0.8vw);
  }

  .resident-card__section-title {
    font-size: 5.5vw;
    margin-bottom: 4vw;
    text-align: center;
  }

  .resident-card__cards {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    align-items: center;
  }

  .resident-card__card {
    width: 82.86vw;
    height: 48.06vw;
    border-radius: 2.5vw;
  }

  .resident-card__locked-overlay {
    border-radius: 2.5vw;
  }

  .resident-card__lock-icon {
    width: 18vw;
    height: 18vw;
  }

  .resident-card__card-label {
    margin-top: 3vw;
    font-size: 4.5vw;
    font-weight: 700;
    color: #ffffff;
    max-width: 87.86vw;
  }
}
</style>