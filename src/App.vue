<template>
  <div>
    <HeaderApp
      :token="token"
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-dashboard="showDashboard = true"
      @switch-to-site="switchToSite"
      @logout="logout"
    />
    <GuestContent v-if="!showDashboard" />
    <DashboardModal v-if="showDashboard" :amocrm-data="amocrmData" />
    <RegisterModal
      v-if="showRegister"
      v-model:phone="registerPhone"
      @close="closeAll"
      @registered="handleRegistered"
    />
    <CodeInputModal
      v-if="showCodeInput"
      :phone="registerPhone"
      :isRestore="isRestore"
      @close="closeAll"
      @verified="handleVerified"
    />
    <LoginModal
      v-if="showLogin"
      @close="closeAll"
      @logged-in="handleLoggedIn"
      @restore-initiated="handleRestore"
    />
  </div>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';
import GuestContent from './components/GuestContent.vue';
import RegisterModal from './components/RegisterModal.vue';
import CodeInputModal from './components/CodeInputModal.vue';
import LoginModal from './components/LoginModal.vue';
import DashboardModal from './components/DashboardModal.vue';

export default {
  components: {
    HeaderApp,
    GuestContent,
    RegisterModal,
    CodeInputModal,
    LoginModal,
    DashboardModal,
  },
  data() {
    return {
      token: localStorage.getItem('token') || null,
      showRegister: false,
      showCodeInput: false,
      showLogin: false,
      showDashboard: false,
      registerPhone: '',
      isRestore: false, // Добавляем флаг для восстановления пароля
      amocrmData: null,
    };
  },
  methods: {
    closeAll() {
      this.showRegister = false;
      this.showCodeInput = false;
      this.showLogin = false;
      this.showDashboard = false;
      this.isRestore = false; // Сбрасываем флаг
    },
    handleRegistered({ phone }) {
      this.registerPhone = phone;
      this.showRegister = false;
      this.showCodeInput = true;
      this.isRestore = false; // Регистрация, не восстановление
    },
    handleRestore({ phone }) {
      this.registerPhone = phone;
      this.showLogin = false;
      this.showCodeInput = true;
      this.isRestore = true; // Восстановление пароля
    },
    async handleVerified(token) {
      this.token = token;
      localStorage.setItem('token', token);
      await this.fetchAmoCrmData();
      this.showCodeInput = false;
      this.showDashboard = true;
      this.isRestore = false; // Сбрасываем после верификации
    },
    async handleLoggedIn(token) {
      this.token = token;
      localStorage.setItem('token', token);
      await this.fetchAmoCrmData();
      this.showLogin = false;
      this.showDashboard = true;
    },
    async fetchAmoCrmData() {
      try {
        const response = await fetch('https://letsdancescores.tech/api/check_and_fetch_amocrm.php', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          this.amocrmData = data.amocrm_response;
        } else {
          alert('Ошибка AmoCRM: ' + data.message);
          this.amocrmData = null;
        }
      } catch {
        alert('Ошибка сети при запросе AmoCRM');
        this.amocrmData = null;
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.amocrmData = null;
      this.closeAll();
      alert('Вы вышли из системы');
    },
    switchToSite() {
      this.showDashboard = false;
    },
    async checkToken() {
      if (this.token) {
        try {
          const response = await fetch('https://letsdancescores.tech/api/check_token.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: this.token }),
          });
          const data = await response.json();
          if (!data.success) {
            this.logout();
          } else {
            await this.fetchAmoCrmData();
          }
        } catch {
          alert('Ошибка проверки токена');
          this.logout();
        }
      }
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
