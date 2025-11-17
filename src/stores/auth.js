import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    amocrmData: null,        // сюда кладём весь объект контакта из amoCRM
    isLoading: false,        // для прелоадеров (по желанию)
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isFullyLoaded: (state) => !!state.token && !!state.amocrmData,

    // Часто используемые значения — выносим сюда, чтобы не писать computed в каждом компоненте
    residentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0
      const field = state.amocrmData.custom_fields_values.find(f => f.field_id === 598151)
      if (!field) return 0
      try {
        const data = JSON.parse(field.values[0].value)
        return parseInt(data.cards.residentCard?.value) || 0
      } catch {
        return 0
      }
    },

    presidentLevel: (state) => {
      if (!state.amocrmData?.custom_fields_values) return 0
      const field = state.amocrmData.custom_fields_values.find(f => f.field_id === 598151)
      if (!field) return 0
      try {
        const data = JSON.parse(field.values[0].value)
        return parseInt(data.cards.presidentCard?.value) || 0
      } catch {
        return 0
      }
    },

    // Пример: денежный грант
    bonusGrant: (state) => {
      if (!state.amocrmData?.custom_fields_values) return '0'
      const field = state.amocrmData.custom_fields_values.find(f => f.field_id === 596967)
      return field?.values?.[0]?.value || '0'
    },

    // Флаг, что имя уже подтверждено
    isNameConfirmed: (state) => {
      if (!state.amocrmData?.custom_fields_values) return false
      const field = state.amocrmData.custom_fields_values.find(f => f.field_id === 598163)
      return field?.values?.[0]?.value === true
    },
  },

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setAmocrmData(data) {
      this.amocrmData = data
    },

    async fetchAmocrmData() {
      if (!this.token) return

      this.isLoading = true
      try {
        const response = await fetch('https://dancerus.ru/api/check_and_fetch_amocrm.php', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        })
        const result = await response.json()

        if (result.status === 'success') {
          this.setAmocrmData(result.amocrm_response)
        } else {
          this.clearUserData()
          alert('Ошибка AmoCRM: ' + result.message)
        }
      } catch (err) {
        console.error(err)
        alert('Ошибка сети при загрузке данных')
        this.clearUserData()
      } finally {
        this.isLoading = false
      }
    },

    // Единая точка входа при загрузке страницы
    async checkTokenAndLoad() {
      if (!this.token) return false

      try {
        const res = await fetch('https://dancerus.ru/api/check_token.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token }),
        })
        const data = await res.json()

        if (data.success) {
          await this.fetchAmocrmData()
          return true
        } else {
          this.clearUserData()
          return false
        }
      } catch (err) {
        console.error(err)
        alert('Ошибка проверки токена')
        this.clearUserData()
        return false
      }
    },

    // Полный выход из системы
    clearUserData() {
      this.token = null
      this.amocrmData = null
      localStorage.removeItem('token')
    },

    // Обновление имени (чтобы не дублировать код в ProfileTab)
    async updateUserName(name) {
      try {
        const response = await fetch('https://dancerus.ru/api/update_name.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Origin: 'https://dancerus.ru',
          },
          body: JSON.stringify({
            token: this.token,
            name,
          }),
        })

        const data = await response.json()

        if (data.status === 'success') {
          // Обновляем локально
          if (this.amocrmData) {
            this.amocrmData.name = name
            let field = this.amocrmData.custom_fields_values.find(f => f.field_id === 598163)
            if (!field) {
              this.amocrmData.custom_fields_values.push({
                field_id: 598163,
                values: [{ value: true }],
              })
            } else {
              field.values[0].value = true
            }
          }
          return true
        } else {
          alert('Ошибка сохранения ФИО: ' + (data.message || 'неизвестная ошибка'))
          return false
        }
      } catch (err) {
        console.error(err)
        alert('Ошибка сети при сохранении имени')
        return false
      }
    },
  },
})