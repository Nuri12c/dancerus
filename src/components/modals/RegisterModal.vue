<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Регистрация</h2>

          <input
            v-model="localPhone"
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
            placeholder="Придумайте пароль"
            :disabled="isLoading"
            @keyup.enter="register"
          />

          <!-- Основная кнопка регистрации -->
          <button
            class="button-1"
            @click="register"
            :disabled="isLoading"
            :class="{ loading: isLoading }"
          >
            <span>{{ isLoading ? 'Отправляем код...' : 'Зарегистрироваться' }}</span>
          </button>

          <!-- Уведомление -->
          <div v-if="notification" class="modal-toast">
            {{ notification }}
          </div>
        </div>
      </div>

      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from '@/stores/auth'

export default {
  props: {
    phone: String, // если передаёшь телефон извне (например, из главной модалки)
  },

  emits: ['update:phone', 'registered', 'close'],

  setup() {
    const authStore = useAuthStore()
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
    return { authStore, executeRecaptcha, recaptchaLoaded }
  },

  data() {
    return {
      localPhone: this.phone || '+7 ',
      password: '',
      notification: '',
      isLoading: false,        // ← Защита от спама + лоадер
      notifyTimer: null,
    }
  },

  watch: {
    phone(newVal) {
      this.localPhone = newVal || '+7 '
    },
    localPhone(newVal) {
      this.$emit('update:phone', newVal)
    },
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
      let digits = this.localPhone.replace(/\D/g, '')

      // Автозамена 8 → 7 и 77 → 7
      if (digits.startsWith('8') && digits.length > 1) {
        digits = '7' + digits.slice(1)
      }
      if (digits.startsWith('77')) {
        digits = '7' + digits.slice(2)
      }

      let formatted = '+7 '
      if (digits.length > 1) formatted += digits.slice(1, 4)
      if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7)
      if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9)
      if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11)

      this.localPhone = formatted
    },

    async register() {
      if (this.isLoading) return
      this.isLoading = true

      const rawDigits = this.localPhone.replace(/\D/g, '')

      if (rawDigits.length !== 11) {
        this.showToast('Введите корректный номер телефона')
        this.isLoading = false
        return
      }

      if (!this.password || this.password.length < 4) {
        this.showToast('Пароль должен быть не менее 4 символов')
        this.isLoading = false
        return
      }

      const formattedPhone = '+' + rawDigits

      try {
        // reCAPTCHA
        await this.recaptchaLoaded()
        const recaptchaToken = await this.executeRecaptcha('register')

        const formData = new FormData()
        formData.append('phone', formattedPhone)
        formData.append('password', this.password)
        formData.append('recaptcha_token', recaptchaToken)

        const res = await fetch('https://dancerus.ru/api/register.php', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()

        if (data.status === 'success') {
          this.showToast('Код отправлен в WhatsApp!')
          this.$emit('registered', {
            phone: formattedPhone,
            password: this.password,
          })
        } else {
          this.showToast(data.message || 'Ошибка регистрации')
        }
      } catch (err) {
        console.error(err)
        this.showToast('Ошибка сети или reCAPTCHA')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

