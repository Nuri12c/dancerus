<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Введите 4-значный код из WhatsApp</h2>
          <input
            class="modal-input"
            v-model="code"
            maxlength="4"
            placeholder="Код"
          />
          <input
            v-if="isRestore"
            class="modal-input"
            v-model="newPassword"
            type="password"
            placeholder="Новый пароль"
          />
          <button class="button-2" @click="verifyCode">Подтвердить</button>
          <button class="button-2" @click="resendCode">Отправить ещё раз</button>
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

<style scoped lang="scss">
@import '@/styles/mixins.scss';




</style>