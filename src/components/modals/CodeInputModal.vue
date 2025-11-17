<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">
            {{ isRestore ? 'Восстановление пароля' : 'Введите код из WhatsApp' }}
          </h2>

          <!-- Поле для кода -->
          <input
            v-model="code"
            class="modal-input code-input"
            placeholder="••••"
            maxlength="4"
            inputmode="numeric"
            autocomplete="one-time-code"
            :disabled="isLoading"
            @keyup.enter="verifyCode"
            ref="codeInput"
          />

          <!-- Поле нового пароля (только при восстановлении) -->
          <input
            v-if="isRestore"
            v-model="newPassword"
            class="modal-input"
            type="password"
            placeholder="Новый пароль"
            :disabled="isLoading"
            @keyup.enter="verifyCode"
          />

          <!-- Основная кнопка -->
          <button
            class="button-1"
            @click="verifyCode"
            :disabled="isLoading || code.length !== 4"
            :class="{ loading: isLoading }"
          >
            <span>{{ isLoading ? 'Проверяем...' : 'Подтвердить' }}</span>
          </button>

          <!-- Кнопка повторной отправки -->
          <button
            class="button-1 button-resend"
            @click="resendCode"
            :disabled="isLoading || resendCooldown > 0"
            :class="{ loading: isLoading }"
          >
            <span>
              {{ resendCooldown > 0
                ? `Повторить через ${resendCooldown}с`
                : 'Отправить код ещё раз'
              }}
            </span>
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
import { useAuthStore } from '@/stores/auth'

export default {
  props: {
    phone: { type: String, required: true },
    isRestore: { type: Boolean, default: false },
  },

  emits: ['verified', 'close'],

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  data() {
    return {
      code: '',
      newPassword: '',
      notification: '',
      isLoading: false,
      notifyTimer: null,
      resendCooldown: 0,        // таймер между повторными отправками
      cooldownInterval: null,
    }
  },

  watch: {
    code(newVal) {
      // Автоматически отправляем, как только ввели 4 цифры (по желанию)
      if (newVal.length === 4 && !this.isLoading) {
        this.verifyCode()
      }
    },
  },

  mounted() {
    // Фокус на поле кода при открытии
    this.$nextTick(() => this.$refs.codeInput?.focus())
  },

  beforeUnmount() {
    clearInterval(this.cooldownInterval)
  },

  methods: {
    showToast(message, duration = 3000) {
      this.notification = message
      clearTimeout(this.notifyTimer)
      this.notifyTimer = setTimeout(() => {
        this.notification = ''
      }, duration)
    },

    startResendCooldown(seconds = 30) {
      this.resendCooldown = seconds
      this.cooldownInterval = setInterval(() => {
        if (this.resendCooldown > 0) {
          this.resendCooldown--
        } else {
          clearInterval(this.cooldownInterval)
        }
      }, 1000)
    },

    async verifyCode() {
      if (this.isLoading) return
      if (this.code.length !== 4) {
        this.showToast('Введите 4-значный код')
        return
      }
      if (this.isRestore && !this.newPassword) {
        this.showToast('Введите новый пароль')
        return
      }

      this.isLoading = true

      const formData = new FormData()
      formData.append('phone', this.phone)
      formData.append('code', this.code)
      if (this.isRestore) {
        formData.append('new_password', this.newPassword)
      }

      try {
        const res = await fetch('https://dancerus.ru/api/verify.php', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (data.status === 'success' && data.token) {
          this.authStore.setToken(data.token)
          this.showToast(
            this.isRestore
              ? 'Пароль успешно изменён!'
              : 'Добро пожаловать!'
          )
          setTimeout(() => {
            this.$emit('verified', data.token)
          }, 800)
        } else {
          this.showToast(data.message || 'Неверный код')
          this.code = ''
        }
      } catch (err) {
        console.error(err)
        this.showToast('Ошибка сети')
      } finally {
        this.isLoading = false
      }
    },

    async resendCode() {
      if (this.isLoading || this.resendCooldown > 0) return

      this.isLoading = true

      const formData = new FormData()
      formData.append('phone', this.phone)

      try {
        const res = await fetch('https://dancerus.ru/api/restore_password.php', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()

        if (data.status === 'success') {
          this.showToast('Код отправлен повторно!', 5000)
          this.startResendCooldown(30)
          this.code = ''
          this.$refs.codeInput?.focus()
        } else {
          this.showToast(data.message || 'Ошибка отправки')
        }
      } catch (err) {
        this.showToast('Ошибка сети')
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

