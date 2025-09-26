<template>
  <section class="tab-content">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>
    <div v-if="amocrmData">
      <div class="contact">
        <h3 class="user-info">
          {{ amocrmData.name || "Без имени" }}
        </h3>
        <p class="first-participation">
          <strong>Первое участия</strong> {{ firstParticipationDate || "Не указано" }}
        </p>
        <div class="bonuses-container">
           <div class="bonuses-section">
          <div class="bonus-header">Бонусы за финал</div>
          <div class="bonuses-card white">
            <h1>{{ bonusFieldValue || "0" }}</h1>
          </div>
        </div>
        <div class="bonuses-section">
          <div class="bonus-header">Бонусы за прямое включение</div>
          <div class="bonuses-card white">
            <h1>{{ directInclusionBonuses || "0" }} Р</h1>
          </div>
        </div>
        </div>

        <details class="history-details">
          <summary>История участия</summary>
          <div v-if="historyData">
            <div v-for="(project, projectName) in historyData" :key="projectName">
              <h5>{{ projectName }}</h5>
              <ul>
                <li v-for="(details, person) in project" :key="person">
                  <strong>{{ person }}:</strong>
                  <span v-if="projectName !== 'Прямое Включение'">
                    {{ details.city || "Не указано" }},
                  </span>
                  {{ details.date || "Не указано" }}
                  <span v-if="details.place">, {{ details.place }}</span>
                  <span v-if="details.bonuses">, Бонусы: {{ details.bonuses }}</span>
                </li>
              </ul>
            </div>
          </div>
          <p v-else>История участия не найдена.</p>
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
        Object.values(this.historyData["Прямое Включение"]).forEach((details) => {
          if (details.bonuses && !isNaN(parseInt(details.bonuses))) {
            total += parseInt(details.bonuses);
          }
        });
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
          this.allowedFieldIds.includes(field.field_id) && field.field_id !== 597163
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
.tab-content {
  max-width: 800px;
  padding: 20px;
  overflow: hidden;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.user-info {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
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
}

.bonuses-card h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.bonuses-card p,
.bonuses-card ul {
  font-size: 16px;
  color: #444;
}

.bonuses-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.bonuses-card li {
  margin-bottom: 8px;
}

.total-bonuses {
  font-size: 18px;
  color: #333;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.history-details {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.history-details summary {
  font-size: 18px;
  color: #333;
  cursor: pointer;
  padding: 10px;
  font-weight: 500;
}

.history-details summary:hover {
  background-color: #f0f0f0;
  border-radius: 4px;
}

.history-details h5 {
  font-size: 16px;
  color: #333;
  margin-top: 15px;
  margin-bottom: 10px;
}

.history-details ul {
  list-style: none;
  padding: 0;
}

.history-details li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #444;
}

.contact p {
  font-size: 14px;
  color: #666;
}
</style>