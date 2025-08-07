<template>
  <div class="register-modal">
    <h2 class="register-modal__title">Регистрация</h2>
    <input
      class="register-modal__input"
      v-model="localPhone"
      placeholder="+7 900 000 00 00"
      @input="formatPhone"
      maxlength="16"
    />
    <input
      class="register-modal__input"
      v-model="password"
      type="password"
      placeholder="Пароль"
    />
    <button class="register-modal__button" @click="register">Зарегистрироваться</button>
    <button class="register-modal__button" @click="$emit('close')">Отмена</button>
    <div v-if="notification" class="register-modal__toast">{{ notification }}</div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';


export default {
  props: {
    phone: String,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      localPhone: this.phone || '+7 ',
      password: '',
      notification: '',
      notifyTimer: null,
    };
  },
  watch: {
    phone(newPhone) {
      this.localPhone = newPhone || '+7 ';
    },
    localPhone(newValue) {
      this.$emit('update:phone', newValue);
    },
  },
  methods: {
    showToast(message) {
      this.notification = message;
      clearTimeout(this.notifyTimer);
      this.notifyTimer = setTimeout(() => {
        this.notification = '';
      }, 3000);
    },
    formatPhone() {
      let digits = this.localPhone.replace(/\D/g, '');
      if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
      } else if (digits.startsWith('77')) {
        digits = '7' + digits.slice(2);
      }
      let formatted = '+7 ';
      if (digits.length > 1) formatted += digits.slice(1, 4);
      if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7);
      if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9);
      if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11);
      this.localPhone = formatted.trim();
    },
    register() {
      const rawDigits = this.localPhone.replace(/\D/g, '');
      if (rawDigits.length !== 11 || !this.password) {
        this.showToast('Введите корректный номер и пароль');
        return;
      }
      const formattedPhone = '+' + rawDigits;

      const formData = new FormData();
      formData.append('phone', formattedPhone);
      formData.append('password', this.password);

      fetch('https://letsdancescores.tech/api/register.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!');
            this.$emit('registered', { phone: formattedPhone, password: this.password });
          } else {
            this.showToast(data.message || 'Ошибка регистрации');
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети');
        });
    },
  },
};
</script>
<style scoped>
.register-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Центрирование содержимого */

}

</style>
