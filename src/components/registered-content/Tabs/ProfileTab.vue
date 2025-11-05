<template>
  <section class="tab-content">
    <div v-if="amocrmData">
      <div class="contact">
        <div class="profile-tab">
          <div class="profile-icon"></div>
          <div class="profile-info">
            <h3 class="profile-info-name">
              {{ amocrmData.name || "Без имени" }}
            </h3>
            <p class="profile-info-participation">
              День рождения: {{ firstParticipationDate || "Не указано" }}
            </p>
          </div>
        </div>
        <div class="bonuses-container">
          <div class="bonuses-section">
            <h3 class="bonus-header">Денежный грант</h3>
            <div class="bonuses-card white">
              <h1>{{ bonusFieldValue || "0" }} ₽</h1>
            </div>
          </div>
          <div class="bonuses-section">
            <h3 class="bonus-header">Стипендия коллектива</h3>
            <div class="bonuses-card white">
              <h1>{{ directInclusionBonuses || "0" }} ₽</h1>
            </div>
          </div>
        </div>
        <details class="history-accordion" open>
          <summary class="history-header">
            <span>История участия</span>
            <svg
              class="chevron"
              :class="{ rotated: isOpen }"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </summary>

          <!-- Отдельный блок для контента -->
          <div class="history-panel">
            <div v-if="historyData">
              <div
                v-for="(project, projectName) in historyData"
                :key="projectName"
                class="project-item"
              >
                <h5 class="project-title">{{ projectName }}</h5>

                <!-- Все номера в одной строке, через разделитель -->
                <div class="numbers-line">
                  <span
                    v-for="(details, numberName) in project"
                    :key="numberName"
                    class="number-entry"
                  >
                    <strong>{{ numberName }}</strong
                    >:
                    <span v-if="projectName !== 'Прямое Включение'">
                      {{ details.city || "Не указано" }},
                    </span>
                    {{ details.date || "Не указано" }}
                    <span v-if="details.place">, {{ details.place }}</span>
                    <span v-if="details.bonuses"
                      >, Бонусы: {{ details.bonuses }}</span
                    >
                  </span>
                </div>
              </div>
            </div>
            <p v-else class="no-history">История участия не найдена.</p>
          </div>
        </details>
      </div>
    </div>
    <p v-else>Нет данных контакта или запрос не выполнен.</p>
  </section>
</template>

<script>
export default {
  props: {
    amocrmData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: true, // по умолчанию открыто (можно false)
      allowedFieldIds: [
        379829, // Телефон
        583299, // Имя
        595289, // Результаты ПФ Прямой эфир
        597163, // Участие История
      ],
    };
  },
  computed: {
    historyData() {
      const historyField = this.amocrmData?.custom_fields_values?.find(
        (field) => field.field_id === 597163
      );
      if (historyField && historyField.values[0]?.value) {
        try {
          return JSON.parse(historyField.values[0].value);
        } catch {
          return null;
        }
      }
      return null;
    },
    bonusFieldValue() {
      const bonusField = this.amocrmData?.custom_fields_values?.find(
        (field) => field.field_id === 596967
      );
      return bonusField?.values[0]?.value || "0";
    },
    directInclusionBonuses() {
      let total = 0;
      if (this.historyData && this.historyData["Прямое Включение"]) {
        Object.values(this.historyData["Прямое Включение"]).forEach(
          (details) => {
            if (details.bonuses && !isNaN(parseInt(details.bonuses))) {
              total += parseInt(details.bonuses);
            }
          }
        );
      }
      return total;
    },
    firstParticipationDate() {
      if (!this.historyData) return null;
      const allDates = [];
      Object.values(this.historyData).forEach((project) => {
        Object.values(project).forEach((details) => {
          if (details.date) allDates.push(details.date);
        });
      });
      allDates.sort((a, b) => {
        const dateA = new Date(a.split(".").reverse().join("-"));
        const dateB = new Date(b.split(".").reverse().join("-"));
        return dateA - dateB;
      });
      return allDates[0] || null;
    },
    filteredFields(fields) {
      if (!fields || !Array.isArray(fields)) {
        return [];
      }
      return fields.filter(
        (field) =>
          this.allowedFieldIds.includes(field.field_id) &&
          field.field_id !== 597163
      );
    },
  },
  methods: {
    formatFieldValue(field) {
      const value = field.values[0]?.value;
      if (!value) return "Не указано";
      if (field.field_type === "date" || field.field_type === "date_time") {
        return new Date(value * 1000).toLocaleString("ru-RU");
      }
      if (field.field_type === "checkbox") {
        return value ? "Да" : "Нет";
      }
      return value;
    },
  },
};
</script>


<style scoped>
h1 {
  font-size: 5vw;
}
h3 {
  font-size: 1.67vw;
}
.profile-tab {
  display: flex;
}
.profile-icon {
  width: 13.75vw;
  height: 13.75vw;
  margin-bottom: 15px;
  background-color: #f4a76f;
  border-radius: 20px;
  margin-right: 2.08vw;
}
.profile-info {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}
.profile-info-participation {
  color: #333;
  font-weight: normal;
}
.tab-content {
  widows: 100%;
  overflow: hidden;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.first-participation {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.bonuses-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.bonuses-card {
  width: 18.75vw;
  height: 10.31vw;
  background: url(@/assets/images/bonuses.jpg);
  background-size: cover;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
  display: flex;
  align-items: center;
}

.bonuses-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.bonuses-card li {
  margin-bottom: 8px;
}

/* === АККОРДЕОН: История участия === */
.history-accordion {
  margin-top: 20px;
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  box-shadow: none;
}

/* Заголовок — отдельная фиолетовая плашка */
.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: #8c66ad;
  cursor: pointer;
  user-select: none;
  border-radius: 12px; /* Только верхние углы */
  transition: background 0.2s ease;
  list-style: none;
}

.history-header:hover {
  background: #7a5599;
}

.history-header::-webkit-details-marker {
  display: none;
}

/* Контент — отдельный белый блок под плашкой */
.history-panel {
  background: white;
  border-top: none;
  border-radius: 0 0 12px 12px; /* Только нижние углы */
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 16px;
  box-sizing: border-box;
}

/* Когда открыт — показываем контент */
.history-accordion[open] .history-panel {
  max-height: 1200px;
  padding: 16px;
}

/* Стрелка */
.chevron {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  color: white;
}

.chevron.rotated {
  transform: rotate(180deg);
}

/* === Внутренние элементы === */
.project-item {
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
}

.project-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.project-title {
  font-size: 16px;
  font-weight: 600;
  color: #8c66ad;
  margin: 0 0 8px 0;
  padding-bottom: 4px;
  border-bottom: 1px dashed #d0b8e0;
}

.participation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.participation-item {
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  line-height: 1.5;
}

.no-history {
  color: #999;
  font-style: italic;
  margin: 8px 0;
  text-align: center;
}
.numbers-line {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  color: #444;
  margin-top: 8px;
}

.number-entry {
  white-space: nowrap;
}

.number-entry:not(:last-child)::after {
  content: "  •  ";
  color: #aaa;
  margin: 0 8px;
  font-weight: bold;
}
@media (max-width: 768px) {
  /* 1. Шрифты — фиксированные, а не vw (чтобы не мельчили) */
  h1 { font-size: 32px !important; }
  h3 { font-size: 18px !important; }
  .profile-info { font-size: 16px !important; }
  .profile-info-name { font-size: 20px !important; line-height: 1.2; }
  .profile-info-participation { font-size: 14px !important; }

  /* 2. Профиль */
  .profile-tab {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .profile-icon {
    width: 80px !important;
    height: 80px !important;
    margin: 0 auto 12px !important;
  }
  .profile-info {
    align-items: center;
    margin-bottom: 16px;
  }

  /* 3. Бонусы — вертикально */
  .bonuses-container {
    flex-direction: column;
    gap: 12px;
  }
  .bonuses-card {
    width: auto;
    height: 26.042vw;
  }
  .bonuses-card h1 {
    font-size: 28px !important;
  }

  /* 4. Аккордеон */
  .history-header {
    padding: 12px 14px;
    font-size: 16px;
  }
  .chevron { width: 16px; height: 16px; }

  /* 5. История участия */
  .project-title { font-size: 15px; }
  .numbers-line {
    flex-direction: column;
    gap: 8px;
    font-size: 13px;
  }
  .number-entry {
    white-space: normal;
  }
  .number-entry:not(:last-child)::after {
    content: "" !important;
  }

  /* 6. Отступы и паддинги */
  .tab-content { padding: 0; }
  .history-panel { padding: 12px 14px !important; }
  .history-accordion[open] .history-panel { max-height: 2000px; }

  /* 7. Убираем лишние тени/бордеры на маленьком экране */
  .bonuses-card { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
}
</style>