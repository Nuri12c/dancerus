<template>
  <section class="tab-content">
    <!-- Пока данные грузятся -->
    <div v-if="!amocrmData">Загрузка профиля...</div>

    <div v-else>
      <div class="contact">
        <div class="profile-tab">
          <div class="profile-icon"></div>
          <div class="profile-info">
            <!-- РЕДАКТИРОВАНИЕ ИМЕНИ -->
            <div class="name-editor">
              <!-- Плейсхолдер -->
              <h3
                v-if="!isNameConfirmed && !isEditingName"
                class="editable-name placeholder"
                @click="startEditingName"
              >
                Нажмите, чтобы указать ФИО
              </h3>

              <!-- Поле ввода + кнопки с иконками -->
              <div v-else-if="isEditingName" class="name-input-wrapper">
                <input
                  v-model="editingName"
                  @keyup.enter="saveName"
                  @keyup.escape="cancelEditingName"
                  type="text"
                  placeholder="Введите ваше ФИО"
                  class="name-input"
                  ref="nameInput"
                  autofocus
                  :disabled="isSavingName"
                />
                <button
                  @click="saveName"
                  class="save-btn"
                  :class="{ loading: isSavingName }"
                  :disabled="isSavingName"
                  title="Сохранить"
                >
                  <span v-if="!isSavingName">✓</span>
                </button>
                <button
                  @click="cancelEditingName"
                  class="cancel-btn"
                  :disabled="isSavingName"
                  title="Отмена"
                >
                  ✗
                </button>
              </div>

              <!-- Подтверждённое имя -->
              <h3 v-else class="profile-info-name confirmed">
                {{ amocrmData.name || "Без имени" }}
              </h3>
            </div>

            <p class="profile-info-participation">
              Первое участие:
              <strong>{{ firstParticipationDate || "Не указано" }}</strong>
            </p>
          </div>
        </div>

        <!-- Бонусы -->
        <div class="bonuses-container">
          <div class="bonuses-section">
            <h3 class="bonus-header">Денежный грант</h3>
            <div class="bonuses-card white">
              <h1>{{ bonusGrant }} ₽</h1>
            </div>
          </div>
          <div class="bonuses-section">
            <h3 class="bonus-header">Стипендия коллектива</h3>
            <div class="bonuses-card white">
              <h1>{{ authStore.bonusStipendia }} ₽</h1>
            </div>
          </div>
          <div class="bonuses-warning">
            <p class="bonuses-warning-note">
              * Денежный грант может быть использован для оплаты не более 20% от
              полной стоимости участия
            </p>
          </div>
        </div>

        <!-- История участия -->
        <details class="history-accordion" open>
          <summary class="history-header">
            <span>История участия</span>
            <span class="arrow">▼</span>
          </summary>

          <div class="history-panel">
            <!-- Если есть история -->
            <div
              v-if="
                authStore.participationHistory &&
                authStore.participationHistory.length > 0
              "
            >
              <div
                v-for="item in authStore.participationHistory"
                :key="item.name"
                class="project-item"
              >
                <h5 class="project-title">{{ item.name }}</h5>
                <span class="number-entry">{{ item.date }}</span>
              </div>
            </div>

            <!-- Если истории нет -->
            <p v-else class="no-history">История участия не найдена.</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "@/stores/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      isEditingName: false,
      editingName: "",
      isSavingName: false, // ← новый флаг загрузки
    };
  },
  computed: {
    amocrmData() {
      return this.authStore.amocrmData;
    },
    isNameConfirmed() {
      return this.authStore.isNameConfirmed;
    },
    bonusGrant() {
      return this.authStore.bonusGrant;
    },
    // ← Вот правильное вычисление самой ранней даты участия
    firstParticipationDate() {
      const history = this.authStore.participationHistory;

      // Если истории нет или она пустая
      if (!history || history.length === 0) {
        return null;
      }

      // Собираем все валидные даты (на случай, если где-то date пустая)
      const validDates = history
        .map((item) => item.date)
        .filter(
          (date) => date && typeof date === "string" && date.trim() !== ""
        )
        .map((date) => {
          // Предполагаем формат DD.MM.YYYY — самый распространённый в РФ
          const parts = date.split(".");
          if (parts.length === 3) {
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // YYYY-MM-DD для корректного парсинга
          }
          return null;
        })
        .filter((date) => date !== null && !isNaN(date.getTime()));

      if (validDates.length === 0) {
        return null;
      }

      // Находим самую раннюю дату
      const earliest = new Date(Math.min(...validDates));

      // Возвращаем в формате DD.MM.YYYY
      return earliest.toLocaleDateString("ru-RU");
    },
  },
  methods: {
    startEditingName() {
      if (this.isNameConfirmed || this.isSavingName) return;
      this.editingName = ""; // всегда пустое поле, если имя ещё не подтверждено
      this.isEditingName = true;
      this.$nextTick(() => {
        this.$refs.nameInput?.focus();
        this.$refs.nameInput?.select?.();
      });
    },
    cancelEditingName() {
      this.isEditingName = false;
      this.editingName = "";
    },
    async saveName() {
      if (this.isSavingName) return;
      const name = this.editingName.trim();
      if (name.length < 2) {
        alert("Введите корректное ФИО");
        return;
      }

      this.isSavingName = true;

      try {
        const success = await this.authStore.updateUserName(name);
        if (success) {
          this.isEditingName = false;
          this.editingName = "";
          this.showToast("ФИО успешно сохранено!");
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка сохранения");
      } finally {
        this.isSavingName = false;
      }
    },

    // Красивый тост (по желанию можно вынести в миксин)
    showToast(message) {
      const toast = document.createElement("div");
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 10000;
        animation: fadeInOut 3s forwards;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    },
  },
};
</script>

<style scoped>
.placeholder {
  color: #999;
  cursor: pointer;
  font-weight: normal;
  font-size: 1.1em;
  transition: color 0.2s;
}
.placeholder:hover {
  color: #ff6b6b;
}

.name-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

.name-input {
  padding: 8px 12px;
  font-size: 1.1em;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 260px;
}

.save-btn,
.cancel-btn {
  background: none;
  border: none;
  font-size: 1.4em;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.save-btn {
  color: #4caf50;
}
.save-btn:hover {
  background: rgba(76, 175, 80, 0.1);
}

.cancel-btn {
  color: #f44336;
}
.cancel-btn:hover {
  background: rgba(244, 67, 54, 0.1);
}

.confirmed {
  color: #2e7d32;
  font-weight: 600;
}

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
  align-items: stretch; /* 🔥 ВАЖНО */
}

.bonuses-card {
  width: 18.75vw;
  height: 10.31vw;
  background: url(@/assets/images/cabinet/bonuses.png);
  background-size: cover;
  padding: 15px;
  border-radius: 1vw;
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
.bonuses-warning {
  display: flex;
  flex-direction: column;
  height: auto; /* или убери height вообще */
  padding: 0;
}

.bonuses-warning-note {
  margin-top: auto; /* ⬅️ теперь РЕАЛЬНО прижимает */
  margin-bottom: 0;
  padding: 1vw;
  background: rgba(0, 0, 0, 0.1);
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

.arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}
.history-accordion[open] .arrow {
  transform: rotate(180deg);
}
/* === Внутренние элементы === */
.project-item {
  padding-bottom: 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #515151;
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

.number-entry {
  white-space: nowrap;
}

.number-entry:not(:last-child)::after {
  content: "  •  ";
  color: #aaa;
  margin: 0 8px;
  font-weight: bold;
}
.save-btn,
.cancel-btn {
  background: none;
  border: none;
  font-size: 1.6em;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  color: #4caf50;
}
.save-btn:hover {
  background: rgba(76, 175, 80, 0.15);
}
.save-btn.loading {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}
.save-btn.loading::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid transparent;
  border-top-color: #4caf50;
  border-radius: 50%;
  animation: button-spin 0.8s linear infinite;
}

.cancel-btn {
  color: #f44336;
}
.cancel-btn:hover {
  background: rgba(244, 67, 54, 0.15);
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (max-width: 768px) {
  /* === ТОЛЬКО профиль: аватар сверху, имя снизу по центру === */
  .profile-tab {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px; /* расстояние между аватаром и именем */
  }

  .profile-icon {
    width: 35.92vw;
    height: 35.92vw;
    max-width: 160px;
    max-height: 160px;
    margin-right: 0 !important;
    margin-bottom: 0;
  }

  .profile-info {
    align-items: center;
    margin-bottom: 24px;
  }

  /* === Редактирование имени — инпут + кнопки на одной строке === */
  .name-input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    max-width: 340px;
    margin: 0 auto;
  }

  .name-input {
    flex: 1;
    min-width: 0;
    font-size: 17px !important; /* важно для iOS */
    padding: 14px 16px;
    border-radius: 12px;
    border: 2px solid #ddd;
  }

  .save-btn,
  .cancel-btn {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    font-size: 1.8em;
  }

  /* === Всё остальное — оставляем как у тебя было === */
  h1 {
    font-size: 32px !important;
  }
  h3 {
    font-size: 18px !important;
  }
  .profile-info-name {
    font-size: 20px !important;
    line-height: 1.2;
  }
  .profile-info-participation {
    font-size: 14px !important;
  }

  .bonuses-container {
    flex-direction: column;
    gap: 12px;
  }
  .bonuses-card {
    width: auto;
    height: 26.042vw;
    border-radius: 3.5vw;
  }
  .bonuses-card h1 {
    font-size: 16.3vw !important;
  }

  .history-header {
    padding: 12px 14px;
    font-size: 16px;
    border-radius: 3.5vw;
  }
  .chevron {
    width: 16px;
    height: 16px;
  }

  .project-title {
    font-size: 15px;
  }
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

  .tab-content {
    padding: 0;
  }
  .history-panel {
    padding: 12px 14px !important;
  }
  .history-accordion[open] .history-panel {
    max-height: 2000px;
  }
  .bonuses-card {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Плейсхолдер "Нажмите, чтобы указать ФИО" */
  .placeholder {
    font-size: 18px;
  }
  .bonuses-warning {
    display: flex;
    flex-direction: column;
    height: auto; /* или убери height вообще */
    padding: 0;
  }

  .bonuses-warning-note {
    font-size: 3vw;
  }
}
</style>