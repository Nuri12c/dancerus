/* import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    amocrmData: null, // сюда кладём весь объект контакта из amoCRM
    isLoading: false, // для прелоадеров (по желанию)
    isPhoneModalOpen: false, // единственный флаг
    isOpenCabinet: false,
    isMessageModalOpen: false,
    isRulesModalOpen = false;
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isFullyLoaded: (state) => !!state.token && !!state.amocrmData,

    // Часто используемые значения — выносим сюда, чтобы не писать computed в каждом компоненте
    residentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598151
      );
      if (!field) return 0;
      try {
        const data = JSON.parse(field.values[0].value);
        return parseInt(data.cards.residentCard?.value) || 0;
      } catch {
        return 0;
      }
    },

    presidentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598151
      );
      if (!field) return 0;
      try {
        const data = JSON.parse(field.values[0].value);
        return parseInt(data.cards.presidentCard?.value) || 0;
      } catch {
        return 0;
      }
    },
    participationHistory: (state) => {
    if (!state.amocrmData?.custom_fields_values) return null;

    const field = state.amocrmData.custom_fields_values.find(
      f => f.field_id === 598403
    );

    if (!field?.values?.[0]?.value) return null;

    try {
      const parsed = JSON.parse(field.values[0].value);

      // Возвращаем сразу удобный формат: массив объектов
      // [{ name: "Прямое Включение", date: "19.09.2025" }, ...]
      // или оставляем объект — как тебе удобнее
      return Object.entries(parsed).map(([name, date]) => ({
        name,
        date,
      }));
    } catch (e) {
      console.error("Ошибка парсинга истории участия", e);
      return null;
    }
  },
    // Пример: денежный грант
    bonusGrant: (state) => {
      if (!state.amocrmData?.custom_fields_values) return "0";
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598399
      );
      return field?.values?.[0]?.value || "0";
    },
    bonusStipendia: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;

      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598401 // ←←←←←← замени на настоящий ID поля с бонусами ПВ
      );

      return parseInt(field?.values?.[0]?.value) || 0;
    },

    // Флаг, что имя уже подтверждено
    isNameConfirmed: (state) => {
      if (!state.amocrmData?.custom_fields_values) return false;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598163
      );
      return field?.values?.[0]?.value === true;
    },
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    setAmocrmData(data) {
      this.amocrmData = data;
    },

    async fetchAmocrmData() {
      if (!this.token) return;

      this.isLoading = true;
      try {
        const response = await fetch(
          "https://dancerus.ru/api/check_and_fetch_amocrm.php",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (result.status === "success") {
          this.setAmocrmData(result.amocrm_response);
        } else {
          this.clearUserData();
          alert("Ошибка AmoCRM: " + result.message);
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка сети при загрузке данных");
        this.clearUserData();
      } finally {
        this.isLoading = false;
      }
    },

    // Единая точка входа при загрузке страницы
    async checkTokenAndLoad() {
      if (!this.token) return false;

      try {
        const res = await fetch("https://dancerus.ru/api/check_token.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: this.token }),
        });
        const data = await res.json();

        if (data.success) {
          await this.fetchAmocrmData();
          return true;
        } else {
          this.clearUserData();
          return false;
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка проверки токена");
        this.clearUserData();
        return false;
      }
    },

    // Полный выход из системы
    clearUserData() {
      this.token = null;
      this.amocrmData = null;
      localStorage.removeItem("token");
    },
openPhoneModal() {
    this.isPhoneModalOpen = true;
  },
  openCabinet() {
    this.isOpenCabinet = true;
  },

  closeCabinet() {
    this.isOpenCabinet = false;
  },
  closePhoneModal() {
    this.isPhoneModalOpen = false;
  },
  closeMessageModal() {
      this.isMessageModalOpen = false;
    },
  openMessageModal() {
      this.isMessageModalOpen = true;
    },
    // Обновление имени (чтобы не дублировать код в ProfileTab)
    async updateUserName(name) {
      try {
        const response = await fetch(
          "https://dancerus.ru/api/update_name.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://dancerus.ru",
            },
            body: JSON.stringify({
              token: this.token,
              name,
            }),
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          // Обновляем локально
          if (this.amocrmData) {
            this.amocrmData.name = name;
            let field = this.amocrmData.custom_fields_values.find(
              (f) => f.field_id === 598163
            );
            if (!field) {
              this.amocrmData.custom_fields_values.push({
                field_id: 598163,
                values: [{ value: true }],
              });
            } else {
              field.values[0].value = true;
            }
          }
          return true;
        } else {
          alert(
            "Ошибка сохранения ФИО: " + (data.message || "неизвестная ошибка")
          );
          return false;
        }
      } catch (err) {
        console.error(err);
        alert("Ошибка сети при сохранении имени");
        return false;
      }
    },
  },
});
 */
// stores/auth.js  (или где у тебя сейчас useAuthStore)

import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "457г46г", // имитируем, что залогинены
    isLoading: false,
    isPhoneModalOpen: false, // единственный флаг
    isOpenCabinet: false,
    isRulesModalOpen: false,
    isMessageModalOpen: false,
    // Полные моковые данные контакта из amoCRM
    amocrmData: {
      id: 12345678,
      name: "Иванов Иван Иванович", // если хочешь протестировать без имени — поставь null или ""

      custom_fields_values: [
        // 1. Денежный грант
        {
          field_id: 596967,
          values: [{ value: "45000" }],
        },

        // 2. Бонусы «Прямое Включение» / Стипендия коллектива
        {
          field_id: 599999, // ← твой реальный ID, когда подключишь
          values: [{ value: "18700" }],
        },

        // 3. История участия (новый простой формат)
        {
          field_id: 597163,
          values: [
            {
              value: JSON.stringify({
                "Отборочный этап Конкурент Москва": "09.12.2023",
                "Прямое Включение": "19.09.2025",
                "Финал Санкт-Петербург": "15.06.2024",
                "Мастер-класс с судьёй": "01.11.2024",
              }),
            },
          ],
        },

        // 4. Флаг, что ФИО уже подтверждено
        {
          field_id: 598163,
          values: [{ value: true }], // false — если хочешь протестировать ввод имени
        },

        // 5. Уровни карт (резидент/президент) — опционально
        {
          field_id: 598151,
          values: [
            {
              value: JSON.stringify({
                cards: {
                  residentCard: { value: 3 },
                  presidentCard: { value: 1 },
                },
              }),
            },
          ],
        },
      ],
    },
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isFullyLoaded: (state) => !!state.token && !!state.amocrmData,

    residentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598151
      );
      if (!field) return 0;
      try {
        const data = JSON.parse(field.values[0].value);
        return parseInt(data.cards.residentCard?.value) || 0;
      } catch {
        return 0;
      }
    },

    presidentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598151
      );
      if (!field) return 0;
      try {
        const data = JSON.parse(field.values[0].value);
        return parseInt(data.cards.presidentCard?.value) || 0;
      } catch {
        return 0;
      }
    },
    participationHistory: (state) => {
      if (!state.amocrmData?.custom_fields_values) return null;

      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 597163
      );

      if (!field?.values?.[0]?.value) return null;

      try {
        const parsed = JSON.parse(field.values[0].value);

        // Возвращаем сразу удобный формат: массив объектов
        // [{ name: "Прямое Включение", date: "19.09.2025" }, ...]
        // или оставляем объект — как тебе удобнее
        return Object.entries(parsed).map(([name, date]) => ({
          name,
          date,
        }));
      } catch (e) {
        console.error("Ошибка парсинга истории участия", e);
        return null;
      }
    },
    bonusGrant: (state) => {
      if (!state.amocrmData?.custom_fields_values) return "0";
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 596967
      );
      return field?.values?.[0]?.value || "0";
    },

    bonusStipendia: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 599999
      );
      return parseInt(field?.values?.[0]?.value) || 0;
    },

    isNameConfirmed: (state) => {
      if (!state.amocrmData?.custom_fields_values) return false;
      const field = state.amocrmData.custom_fields_values.find(
        (f) => f.field_id === 598163
      );
      return field?.values?.[0]?.value === true;
    },
  },

  actions: {
    // Заглушки — ничего не делают, данные уже в state
    setToken() {},
    setAmocrmData() {},
    async fetchAmocrmData() {},
    async checkTokenAndLoad() {
      return true; // сразу считаем, что всё загружено
    },
    clearUserData() {
      this.token = null;
      this.amocrmData = null;
    },
    async updateUserName() {
      return true; // имитируем успешное сохранение
    },
    openPhoneModal() {
      this.isPhoneModalOpen = true;
    },
    openMessageModal() {
      this.isMessageModalOpen = true;
    },
    openRulesModal() {
      this.isRulesModalOpen = true;
    },
    closeRulesModal() {
      this.isRulesModalOpen = false;
    },

    closePhoneModal() {
      this.isPhoneModalOpen = false;
    },
    closeMessageModal() {
      this.isMessageModalOpen = false;
    },
    openCabinet() {
      this.isOpenCabinet = true;
    },
    closeCabinet() {
      this.isOpenCabinet = false;
    }
  },
});
