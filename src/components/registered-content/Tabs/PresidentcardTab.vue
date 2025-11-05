<template>
  <section class="tab-content">

    <h2 class="title">Карта резидента</h2>

    <div class="btn-group">
      <button class="btn">Вам сообщение! <span class="cursor"></span></button>
      <button class="btn">Правила пользования картой<span class="cursor"></span></button>
    </div>

    <h3 class="section-title">Этапы участия в программе:</h3>

    <div class="cards-flex">
      <div
        v-for="n in 6"
        :key="n"
        class="card"
        :class="{ locked: n > presidentLevel }"
      >
        <p class="card-desc">
          {{ n <= presidentLevel
            ? ' Баллы, скидки, бонусы.'
            : 'Заблокировано. Достигни следующего уровня!' }}
        </p>
        <button class="card-btn" :disabled="n > presidentLevel">
          {{ n <= presidentLevel ? 'Подробнее' : '🔒' }}
        </button>
      </div>
    </div>

  </section>
</template>

<script>
export default {
  name: "ResidentcardTab",
  props: {
    amocrmData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    presidentLevel() {
      const field = this.amocrmData?.custom_fields_values?.find(f => f.field_id === 999999);
      if (!field) return 0;
      try {
        const data = JSON.parse(field.values[0].value);
        return parseInt(data.cards.presidentCard?.value) || 0;
      } catch {
        return 0;
      }
    }
  }
}
</script>

<style scoped>
.tab-content {
  margin: 0;
  max-width: 100%;
}
.card.locked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
}
.card-btn:disabled {
  background: #666;
  cursor: not-allowed;
}
.cursor {
  width: 2.24vw;
  height: 2.24vw;
  display: inline-block;
  background: url('@/assets/images/cursor.svg');
  background-size: contain;
  transform: translateY(0.40vw);
  margin-left: 0.5vw;
}


/* Заголовки */
.title        { margin: 0 0 1rem; }
.section-title{ margin: 0 0 1.5rem; }

/* Кнопки */
.btn-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}
.btn {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.67vw;
  padding: 0.8rem 1.2rem;
  border-radius: 0.63vw;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
}

/* ==== КАРТОЧКИ: РОВНО 20.42vw ==== */
.cards-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 0 2vw;
}

.card {
  width: 20.42vw !important;
  height: 11.20vw;
  flex: 0 0 20.42vw;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.63vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: white;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.card-desc {
  flex-grow: 1;
  font-size: 0.9rem;
}

/* Адаптив: на мобиле — 100% */
@media (max-width: 768px) {
  .card {
    width: 90vw !important;
    max-width: 90vw;
    min-width: 90vw;
    flex: 0 0 90vw;
  }
  .btn-group {
    flex-direction: column;
    align-items: center;
  }
}
</style>