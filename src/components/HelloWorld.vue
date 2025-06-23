<template>
  <div>
    <header>
      <button v-if="!token" @click="showRegister = true; showLogin = false">Регистрация</button>
      <button v-if="!token" @click="showLogin = true; showRegister = false">Логин</button>
      <button v-if="token" @click="showDashboard = true">Личный кабинет</button>
    </header>

    <!-- Модальное окно регистрации -->
    <div v-if="showRegister" class="modal">
      <h2>Регистрация</h2>
      <input v-model="registerPhone" placeholder="Телефон" />
      <input v-model="registerPassword" type="password" placeholder="Пароль" />
      <button @click="register">Зарегистрироваться</button>
      <button @click="closeAll">Отмена</button>
    </div>

    <!-- Модальное окно ввода кода -->
    <div v-if="showCodeInput" class="modal">
      <h2>Введите 4-значный код из WhatsApp</h2>
      <input v-model="verificationCode" maxlength="4" placeholder="Код" />
      <button @click="verifyCode">Подтвердить</button>
      <button @click="closeAll">Отмена</button>
    </div>

    <!-- Модальное окно логина -->
    <div v-if="showLogin" class="modal">
      <h2>Логин</h2>
      <input v-model="loginPhone" placeholder="Телефон" />
      <input v-model="loginPassword" type="password" placeholder="Пароль" />
      <button @click="login">Войти</button>
      <button @click="closeAll">Отмена</button>
    </div>

    <!-- Модальное окно личного кабинета -->
    <div v-if="showDashboard" class="modal">
      <h2>Личный кабинет</h2>
      <p>Добро пожаловать, пользователь!</p>
      <button @click="logout">Выйти</button>
      <button @click="closeAll">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token') || null,
      showRegister: false,
      showCodeInput: false,
      showLogin: false,
      showDashboard: false,

      registerPhone: '',
      registerPassword: '',
      verificationCode: '',

      loginPhone: '',
      loginPassword: '',
    }
  },
  methods: {
    closeAll() {
      this.showRegister = false;
      this.showCodeInput = false;
      this.showLogin = false;
      this.showDashboard = false;
    },
    register() {
      if (!this.registerPhone || !this.registerPassword) {
        alert('Заполните все поля');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.registerPhone);
      formData.append('password', this.registerPassword);

      fetch('https://letsdancescores.tech/api/register.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          alert('Регистрация успешна! Код: ' + data.code);
          this.showRegister = false;
          this.showCodeInput = true;
        } else {
          alert('Ошибка: ' + data.message);
        }
      })
      .catch(() => alert('Ошибка сети'));
    },
    verifyCode() {
      if (!this.verificationCode || this.verificationCode.length !== 4) {
        alert('Введите 4-значный код');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.registerPhone);
      formData.append('code', this.verificationCode);

      fetch('https://letsdancescores.tech/api/verify.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.token) {
          this.token = data.token;
          localStorage.setItem('token', data.token);
          alert('Код подтвержден! Вы вошли в систему.');
          this.showCodeInput = false;
          this.showDashboard = true;
        } else {
          alert('Ошибка: ' + data.message);
        }
      })
      .catch(() => alert('Ошибка сети'));
    },
    login() {
      if (!this.loginPhone || !this.loginPassword) {
        alert('Заполните все поля');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.loginPhone);
      formData.append('password', this.loginPassword);

      fetch('https://letsdancescores.tech/api/login.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.token) {
          this.token = data.token;
          localStorage.setItem('token', data.token);
          alert('Вы успешно вошли!');
          this.showLogin = false;
          this.showDashboard = true;
        } else {
          alert('Ошибка: ' + data.message);
        }
      })
      .catch(() => alert('Ошибка сети'));
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.closeAll();
      alert('Вы вышли из системы');
    }
  },
  mounted() {
    if (this.token) {
      fetch('https://letsdancescores.tech/api/check_token.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.token })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          this.logout();
        }
      })
      .catch(() => {
        alert('Ошибка проверки токена');
        this.logout();
      });
    }
  }
}
</script>

<style>
.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border: 1px solid #aaa;
  box-shadow: 0 0 10px #333;
}
</style>
