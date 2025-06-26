<template>
  <div class="modal">
    <h2>Введите 4-значный код из WhatsApp</h2>
    <input v-model="code" maxlength="4" placeholder="Код" />
    <input
      v-if="isRestore"
      v-model="newPassword"
      type="password"
      placeholder="Новый пароль"
    />
    <button @click="verifyCode">Подтвердить</button>
    <button @click="resendCode">Отправить ещё раз</button>
    <button @click="$emit('close')">Отмена</button>
    <div v-if="notification" class="toast">{{ notification }}</div>
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
    isRestore: { type: Boolean, default: false }, // Флаг для восстановления пароля
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
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  max-width: 90%;
  text-align: center;
  z-index: 1000;
}

h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background: #61daff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

button:hover {
  background: #42b8e0;
}
</style>
