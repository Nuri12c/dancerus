<template>
  <div>
    <button @click="setTempToken">Установить тестовый токен</button>
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
      @open-login="showLogin = true; showAuthModal = false"
      @open-register="showRegister = true; showAuthModal = false"
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
    setTempToken() {
      this.authStore.setToken("test-token-123");
      this.checkToken();
    },
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
      // Моковые данные для тестов
      this.amocrmData = {
        id: 48757940,
        name: "Нурислам Булатович Ганеев",
        first_name: "Нурислам Булатович",
        last_name: "Ганеев",
        responsible_user_id: 6929671,
        group_id: 0,
        created_by: 1644829,
        updated_by: 1644829,
        created_at: 1739176150,
        updated_at: 1756823007,
        closest_task_at: null,
        is_deleted: false,
        is_unsorted: false,
        custom_fields_values: [
          {
            field_id: 379831,
            field_name: "Email",
            field_code: "EMAIL",
            field_type: "multitext",
            values: [{ value: "nurislam.ganieiev@mail.ru", enum_id: 866751, enum_code: "WORK" }],
          },
          {
            field_id: 379829,
            field_name: "Телефон",
            field_code: "PHONE",
            field_type: "multitext",
            values: [{ value: "+79027155011", enum_id: 866739, enum_code: "WORK" }],
          },
          {
            field_id: 595287,
            field_name: "ПВ Прямой эфир",
            field_code: null,
            field_type: "checkbox",
            values: [{ value: true }],
          },
          {
            field_id: 595289,
            field_name: "Результаты ПФ Прямой эфир",
            field_code: null,
            field_type: "text",
            values: [{ value: "1122" }],
          },
          {
            field_id: 596967,
            field_name: "Ваши Бонусы",
            field_code: null,
            field_type: "text",
            values: [{ value: "500" }],
          },
        ],
        account_id: 11782735,
        _links: {
          self: {
            href: "https://academyfunny.amocrm.ru/api/v4/contacts/48757940?query=%2B79027155011&page=1&limit=250",
          },
        },
        _embedded: {
          tags: [],
          companies: [],
        },
      };
      console.log("Тест: загружены моковые данные AmoCRM");
      // Реальный запрос закомментирован
      /*
      try {
        const response = await fetch("https://letsdancescores.tech/api/check_and_fetch_amocrm.php", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.authStore.token}`,
            "Content-Type": "application/json",
          },
        });
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
      */
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
        console.log("Тест: токен считается валидным");
        await this.fetchAmoCrmData();
        this.showDashboard = true;
      }
      // Реальная проверка закомментирована
      /*
      if (this.authStore.token) {
        try {
          const response = await fetch("https://letsdancescores.tech/api/check_token.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: this.authStore.token }),
          });
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
      */
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>


<!--
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
</script>  -->