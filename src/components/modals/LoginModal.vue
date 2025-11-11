<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Логин</h2>
          <input
            class="modal-input"
            v-model="phone"
            placeholder="+7 900 000 00 00"
            @input="formatPhone"
            maxlength="16"
          />
          <input
            class="modal-input"
            v-model="password"
            type="password"
            placeholder="Пароль"
          />
          <button class="button-2" @click="login">Войти</button>
          <button v-if="showRestoreButton" class="button-2" @click="restorePassword">Восстановить пароль</button>
          <div v-if="notification" class="modal-toast">{{ notification }}</div>
        </div>
      </div>
      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      phone: '+7 ',
      password: '',
      notification: '',
      notifyTimer: null,
      showRestoreButton: false,
    };
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
      let digits = this.phone.replace(/\D/g, '');
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
      this.phone = formatted.trim();
    },
    login() {
      const rawDigits = this.phone.replace(/\D/g, '');
      if (rawDigits.length !== 11 || !this.password) {
        this.showToast('Введите корректный номер и пароль');
        this.showRestoreButton = false;
        return;
      }
      const formattedPhone = '+' + rawDigits;

      const formData = new FormData();
      formData.append('phone', formattedPhone);
      formData.append('password', this.password);

      fetch('https://dancerus.ru/api/login.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.token) {
            this.authStore.setToken(data.token);
            this.showToast('Вы успешно вошли!');
            this.showRestoreButton = false;
            this.$emit('logged-in', data.token);
          } else {
            this.showToast(data.message || 'Ошибка входа');
            this.showRestoreButton = data.message === 'Неверный пароль';
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети');
          this.showRestoreButton = false;
        });
    },
    restorePassword() {
      const rawDigits = this.phone.replace(/\D/g, '');
      if (rawDigits.length !== 11) {
        this.showToast('Введите корректный номер');
        this.showRestoreButton = false;
        return;
      }
      const formattedPhone = '+' + rawDigits;

      const formData = new FormData();
      formData.append('phone', formattedPhone);

      fetch('https://dancerus.ru/api/restore_password.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!');
            this.showRestoreButton = false;
            this.$emit('restore-initiated', { phone: formattedPhone });
          } else {
            this.showToast(data.message || 'Ошибка восстановления');
            this.showRestoreButton = true;
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети');
          this.showRestoreButton = true;
        });
    },
    close() {
      this.showRestoreButton = false;
      this.notification = '';
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/mixins.scss';

</style>