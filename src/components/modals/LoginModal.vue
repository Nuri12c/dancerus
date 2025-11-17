<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Логин</h2>

          <input
            v-model="phone"
            class="modal-input"
            placeholder="+7 900 000 00 00"
            @input="formatPhone"
            maxlength="16"
            :disabled="isLoading"
          />

          <input
            v-model="password"
            class="modal-input"
            type="password"
            placeholder="Пароль"
            :disabled="isLoading"
            @keyup.enter="login"
          />

          <!-- Основная кнопка -->
          <button
            class="button-1"
            @click="login"
            :disabled="isLoading"
            :class="{ loading: isLoading }"
          >
            <span>{{ isLoading ? 'Входим...' : 'Войти' }}</span>
          </button>

          <!-- Кнопка восстановления пароля (показывается только после ошибки "Неверный пароль") -->
          <button
            v-if="showRestoreButton"
            class="button-1 button-restore"
            @click="restorePassword"
            :disabled="isLoading"
            :class="{ loading: isLoading }"
          >
            <span>{{ isLoading ? 'Отправляем...' : 'Восстановить пароль' }}</span>
          </button>

          <!-- Тост-уведомления -->
          <div v-if="notification" class="modal-toast">
            {{ notification }}
          </div>
        </div>
      </div>

      <button class="modal-close" @click="close">✖</button>
    </div>
  </div>
</template>

<script>
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from '@/stores/auth'

export default {
  emits: ['logged-in', 'restore-initiated', 'close'],

  setup() {
    const authStore = useAuthStore()
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
    return { authStore, executeRecaptcha, recaptchaLoaded }
  },

  data() {
    return {
      phone: '+7 ',
      password: '',
      notification: '',
      showRestoreButton: false,
      isLoading: false,           // ← Защита от спама + лоадер
      notifyTimer: null,
    }
  },

  methods: {
    showToast(message) {
      this.notification = message
      clearTimeout(this.notifyTimer)
      this.notifyTimer = setTimeout(() => {
        this.notification = ''
      }, 3000)
    },

    formatPhone() {
      let digits = this.phone.replace(/\D/g, '')
      if (digits.startsWith('8')) digits = '7' + digits.slice(1)
      if (digits.startsWith('77')) digits = '7' + digits.slice(2)

      let formatted = '+7 '
      if (digits.length > 1) formatted += digits.slice(1, 4)
      if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7)
      if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9)
      if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11)

      this.phone = formatted
    },

    async login() {
      if (this.isLoading) return
      this.isLoading = true
      this.showRestoreButton = false

      const rawDigits = this.phone.replace(/\D/g, '')
      if (rawDigits.length !== 11 || !this.password) {
        this.showToast('Введите корректный номер и пароль')
        this.isLoading = false
        return
      }

      const formattedPhone = '+' + rawDigits

      const formData = new FormData()
      formData.append('phone', formattedPhone)
      formData.append('password', this.password)

      try {
        const res = await fetch('https://dancerus.ru/api/login.php', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (data.status === 'success' && data.token) {
          this.authStore.setToken(data.token)
          this.showToast('Вы успешно вошли!')
          this.$emit('logged-in', data.token)
        } else {
          this.showToast(data.message || 'Ошибка входа')
          // Показываем кнопку восстановления только при конкретной ошибке
          this.showRestoreButton = data.message === 'Неверный пароль'
        }
      } catch (err) {
        console.error(err)
        this.showToast('Ошибка сети')
      } finally {
        this.isLoading = false
      }
    },

    async restorePassword() {
      if (this.isLoading) return
      this.isLoading = true

      const rawDigits = this.phone.replace(/\D/g, '')
      if (rawDigits.length !== 11) {
        this.showToast('Введите корректный номер телефона')
        this.isLoading = false
        return
      }

      const formattedPhone = '+' + rawDigits

      try {
        await this.recaptchaLoaded()
        const recaptchaToken = await this.executeRecaptcha('restore_password')

        const formData = new FormData()
        formData.append('phone', formattedPhone)
        formData.append('recaptcha_token', recaptchaToken)

        const res = await fetch('https://dancerus.ru/api/restore_password.php', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (data.status === 'success') {
          this.showToast('Код отправлен в WhatsApp!')
          this.showRestoreButton = false
          this.$emit('restore-initiated', { phone: formattedPhone })
        } else {
          this.showToast(data.message || 'Ошибка восстановления')
        }
      } catch (err) {
        console.error(err)
        this.showToast('Ошибка сети или reCAPTCHA')
      } finally {
        this.isLoading = false
      }
    },

    close() {
      this.showRestoreButton = false
      this.notification = ''
      this.$emit('close')
    },
  },
}
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss";
</style>