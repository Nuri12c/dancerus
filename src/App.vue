<template>
  <div>
    <HeaderApp
     :show-dashboard="showDashboard"
      :token="authStore.token"
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-auth-modal="showAuthModal = true"
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
      :password="tempPassword"
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
    <AuthModal
      v-if="showAuthModal"
      @close="closeAll"
      @open-login="
        showLogin = true;
        showAuthModal = false;
      "
      @open-register="
        showRegister = true;
        showAuthModal = false;
      "
    />
  </div>
</template>

<script>
import { useAuthStore } from "./stores/auth.js";
import HeaderApp from "./components/HeaderApp/HeaderApp.vue";
import GuestContent from "./components/guest-content/GuestContent.vue";
import RegisterModal from "./components/modals/RegisterModal.vue";
import CodeInputModal from "./components/modals/CodeInputModal.vue";
import LoginModal from "./components/modals/LoginModal.vue";
import DashboardModal from "./components/registered-content/DashboardModal.vue";
import AuthModal from "./components/modals/AuthModal.vue";

export default {
  components: {
    HeaderApp,
    GuestContent,
    RegisterModal,
    CodeInputModal,
    LoginModal,
    DashboardModal,
    AuthModal,
  },
  data() {
    return {
      showRegister: false,
      showCodeInput: false,
      showLogin: false,
      showAuthModal: false,
      showDashboard: false,
      registerPhone: "",
      tempPassword: "",
      isRestore: false,
      amocrmData: null,
    };
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    closeAll() {
      this.showRegister = false;
      this.showCodeInput = false;
      this.showLogin = false;
      this.showAuthModal = false;
      this.showDashboard = false;
      this.isRestore = false;
      this.tempPassword = "";
    },
    handleRegistered({ phone, password }) {
      this.registerPhone = phone;
      this.tempPassword = password;
      this.showRegister = false;
      this.showCodeInput = true;
      this.isRestore = false;
    },
    handleRestore({ phone }) {
      this.registerPhone = phone;
      this.tempPassword = "";
      this.showLogin = false;
      this.showCodeInput = true;
      this.isRestore = true;
    },
    async handleVerified(token) {
      this.authStore.setToken(token);
      await this.fetchAmoCrmData();
      this.showCodeInput = false;
      this.showDashboard = true;
      this.isRestore = false;
      this.tempPassword = "";
    },
    async handleLoggedIn(token) {
      this.authStore.setToken(token);
      await this.fetchAmoCrmData();
      this.showLogin = false;
      this.showAuthModal = false;
      this.showDashboard = true;
    },
    async fetchAmoCrmData() {

       try {
        const response = await fetch(
          "https://letsdancescores.tech/api/check_and_fetch_amocrm.php",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status === "success") {
          this.amocrmData = data.amocrm_response;
        } else {
          alert("Ошибка AmoCRM: " + data.message);
          this.amocrmData = null;
        }
      } catch {
        alert("Ошибка сети при запросе AmoCRM");
        this.amocrmData = null;
      }
    },
    logout() {
      this.authStore.clearToken();
      this.amocrmData = null;
      this.closeAll();
      alert("Вы вышли из системы");
    },
    switchToSite() {
      this.showDashboard = false;
    },
    async checkToken() {
      if (this.authStore.token) {
        try {
          const response = await fetch(
            "https://letsdancescores.tech/api/check_token.php",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: this.authStore.token }),
            }
          );
          const data = await response.json();
          if (!data.success) {
            this.logout();
          } else {
            await this.fetchAmoCrmData();
            this.showDashboard = true;
          }
        } catch {
          alert("Ошибка проверки токена");
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