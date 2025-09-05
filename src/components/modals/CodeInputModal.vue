<template>
  <div class="code-input-modal">
    <h2 class="code-input-modal__title">Введите 4-значный код из WhatsApp</h2>
    <input
      class="code-input-modal__input"
      v-model="code"
      maxlength="4"
      placeholder="Код"
    />
    <input
      v-if="isRestore"
      class="code-input-modal__input"
      v-model="newPassword"
      type="password"
      placeholder="Новый пароль"
    />
    <button class="code-input-modal__button" @click="verifyCode">Подтвердить</button>
    <button class="code-input-modal__button" @click="resendCode">Отправить ещё раз</button>
    <button class="code-input-modal__button" @click="$emit('close')">Отмена</button>
    <div v-if="notification" class="code-input-modal__toast">{{ notification }}</div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';


export default {
  props: {
    phone: String,
    isRestore: { type: Boolean, default: false },
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      code: '',
      newPassword: '',
      notification: '',
      notifyTimer: null,
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
    verifyCode() {
      if (!this.code || this.code.length !== 4) {
        this.showToast('Введите 4-значный код');
        return;
      }
      if (this.isRestore && !this.newPassword) {
        this.showToast('Введите новый пароль');
        return;
      }

      const formData = new FormData();
      formData.append('phone', this.phone);
      formData.append('code', this.code);
      if (this.isRestore) {
        formData.append('new_password', this.newPassword);
      }

      fetch('https://letsdancescores.tech/api/verify.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.token) {
            this.authStore.setToken(data.token);
            this.showToast(this.isRestore ? 'Пароль успешно изменён!' : 'Код подтверждён! Вы вошли в систему.');
            this.$emit('verified', data.token);
          } else {
            this.showToast(data.message || 'Ошибка');
          }
        })
        .catch(() => this.showToast('Ошибка сети'));
    },
    resendCode() {
      const formData = new FormData();
      formData.append('phone', this.phone);

      fetch('https://letsdancescores.tech/api/restore_password.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!');
          } else {
            this.showToast(data.message || 'Ошибка отправки');
          }
        })
        .catch(() => this.showToast('Ошибка сети'));
    },
  },
};
</script>
<style scoped>
.code-input-modal {
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
  z-index: 1000; /* Убедитесь, что модалка поверх других элементов */
}

.code-input-modal__title {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.code-input-modal__input {
  width: 200px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.code-input-modal__button {
  padding: 10px 20px;
  margin: 5px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.code-input-modal__button:hover {
  background-color: #0056b3;
}

.code-input-modal__toast {
  position: fixed;
  bottom: 20px;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>