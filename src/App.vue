
<template>
  <div>
    <HeaderApp
      :show-dashboard="showDashboard"
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-auth-modal="showAuthModal = true"
      @open-dashboard="showDashboard = true"
      @switch-to-site="switchToSite"
      @logout="authStore.clearUserData"
    />

    <GuestContent v-if="!showDashboard" />

    <DashboardApp v-if="showDashboard" />

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
import { useAuthStore } from '@/stores/auth'
import HeaderApp from './components/HeaderApp/HeaderApp.vue'
import GuestContent from './components/guest-content/GuestContent.vue'
import RegisterModal from './components/modals/RegisterModal.vue'
import CodeInputModal from './components/modals/CodeInputModal.vue'
import LoginModal from './components/modals/LoginModal.vue'
import DashboardApp from './components/registered-content/DashboardApp.vue'
import AuthModal from './components/modals/AuthModal.vue'

export default {
  components: {
    HeaderApp,
    GuestContent,
    RegisterModal,
    CodeInputModal,
    LoginModal,
    DashboardApp,
    AuthModal,
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  data() {
    return {
      showRegister: false,
      showCodeInput: false,
      showLogin: false,
      showAuthModal: false,
      showDashboard: false,
      registerPhone: '',
      tempPassword: '',
      isRestore: false,
    }
  },

  methods: {
    closeAll() {
      this.showRegister = false
      this.showCodeInput = false
      this.showLogin = false
      this.showAuthModal = false
      this.isRestore = false
      this.tempPassword = ''
    },

    handleRegistered({ phone, password }) {
      this.registerPhone = phone
      this.tempPassword = password
      this.showRegister = false
      this.showCodeInput = true
      this.isRestore = false
    },

    handleRestore({ phone }) {
      this.registerPhone = phone
      this.tempPassword = ''
      this.showLogin = false
      this.showCodeInput = true
      this.isRestore = true
    },

    async handleVerified(token) {
      this.authStore.setToken(token)
      await this.authStore.fetchAmocrmData()
      this.showCodeInput = false
      this.showDashboard = true
    },

    async handleLoggedIn(token) {
      this.authStore.setToken(token)
      await this.authStore.fetchAmocrmData()
      this.showLogin = false
      this.showAuthModal = false
      this.showDashboard = true
    },

    switchToSite() {
      this.showDashboard = false
    },
  },

  mounted() {
    if (this.authStore.token) {
      this.authStore.checkTokenAndLoad().then(success => {
        if (success) {
          this.showDashboard = true
        }
      })
    }
  },
}
</script> 