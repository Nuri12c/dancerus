
<template>
  <div class="modal">
    <h2>Логин</h2>
    <input
      v-model="phone"
      placeholder="+7 900 000 00 00"
      @input="formatPhone"
      maxlength="16"
    />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
    <button v-if="showRestoreButton" @click="restorePassword">Восстановить пароль</button>
    <button @click="close">Отмена</button>

    <!-- Плашка уведомления -->
    <div v-if="notification" class="toast">{{ notification }}</div>
  </div>
</template>

<script>
export default {
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
        this.notification = ''; // Сбрасываем только уведомление
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
        this.showRestoreButton = false; // Сбрасываем при некорректных данных
        return;
      }
      const formattedPhone = '+' + rawDigits;

      const formData = new FormData();
      formData.append('phone', formattedPhone);
      formData.append('password', this.password);

      fetch('https://letsdancescores.tech/api/login.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.token) {
            this.showToast('Вы успешно вошли!');
            this.showRestoreButton = false; // Сбрасываем при успешном входе
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

      fetch('https://letsdancescores.tech/api/restore_password.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!');
            this.showRestoreButton = false; // Сбрасываем после отправки
            this.$emit('restore-initiated', { phone: formattedPhone });
          } else {
            this.showToast(data.message || 'Ошибка восстановления');
            this.showRestoreButton = true; // Оставляем кнопку, если ошибка
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети');
          this.showRestoreButton = true;
        });
    },
    close() {
      this.showRestoreButton = false; // Сбрасываем при закрытии
      this.notification = '';
      this.$emit('close');
    },
  },
};
</script>



<style scoped>
.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

input {
  width: max-content;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #61daff;
}

button {
  margin: 5px;
  width: 100%;
  padding: 10px 20px;
  background: #61daff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #40c4e6;
}

.toast {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 9999;
  animation: fadein 0.3s ease;
}

@keyframes fadein {
  from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}
</style>
