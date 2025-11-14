<script>
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useAuthStore } from '@/stores/auth.js'

export default {
  props: {
    phone: String,
  },
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
      notifyTimer: null,
    }
  },
  watch: {
    phone(newPhone) {
      this.localPhone = newPhone || '+7 '
    },
    localPhone(newValue) {
      this.$emit('update:phone', newValue)
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
      if (digits.startsWith('8')) digits = '7' + digits.slice(1)
      else if (digits.startsWith('77')) digits = '7' + digits.slice(2)

      let formatted = '+7 '
      if (digits.length > 1) formatted += digits.slice(1, 4)
      if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7)
      if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9)
      if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11)
      this.localPhone = formatted.trim()
    },
    async register() {
      const rawDigits = this.localPhone.replace(/\D/g, '')
      if (rawDigits.length !== 11 || !this.password) {
        this.showToast('Введите корректный номер и пароль')
        return
      }
      const formattedPhone = '+' + rawDigits

      // Ждём загрузки reCAPTCHA
      await this.recaptchaLoaded()

      // Получаем токен (action = 'register')
      const recaptchaToken = await this.executeRecaptcha('register')

      const formData = new FormData()
      formData.append('phone', formattedPhone)
      formData.append('password', this.password)
      formData.append('recaptcha_token', recaptchaToken) // ТОКЕН

      fetch('https://dancerus.ru/api/register.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!')
            this.$emit('registered', { phone: formattedPhone, password: this.password })
          } else {
            this.showToast(data.message || 'Ошибка регистрации')
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети')
        })
    },
  },
}
</script>