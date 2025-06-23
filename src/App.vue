
<template>
  <div>
    <HeaderApp
      :token="token"
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-dashboard="showDashboard = true"
      @switch-to-site="switchToSite"
    />
    <GuestContent v-if="!showDashboard" />
    <RegisterModal
      v-if="showRegister"
      v-model:phone="registerPhone"
      @close="closeAll"
      @registered="handleRegistered"
    />
    <CodeInputModal
      v-if="showCodeInput"
      @close="closeAll"
      @verified="handleVerified"
      :phone="registerPhone"
    />
    <LoginModal
      v-if="showLogin"
      @close="closeAll"
      @logged-in="handleLoggedIn"
    />
    <DashboardModal
      v-if="showDashboard"
      @close="closeAll"
      @logout="logout"
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
    };
  },
  methods: {
    closeAll() {
      this.showRegister = false;
      this.showCodeInput = false;
      this.showLogin = false;
      this.showDashboard = false;
    },
    handleRegistered({ phone }) {
      this.registerPhone = phone;
      this.showRegister = false;
      this.showCodeInput = true;
    },
    handleVerified(token) {
      this.token = token;
      localStorage.setItem('token', token);
      this.showCodeInput = false;
      this.showDashboard = true;
    },
    handleLoggedIn(token) {
      this.token = token;
      localStorage.setItem('token', token);
      this.showLogin = false;
      this.showDashboard = true;
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
      this.closeAll();
      alert('Вы вышли из системы');
    },
    switchToSite() {
      this.showDashboard = false;
    },
    checkToken() {
      if (this.token) {
        fetch('https://letsdancescores.tech/api/check_token.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: this.token }),
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
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>
