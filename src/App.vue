
<template>
  <div>
    <HeaderApp
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-auth-modal="showAuthModal = true"
      @logout="authStore.clearUserData"
    />

    <GuestContent @open-auth-modal="showAuthModal = true" v-show="!authStore.isOpenCabinet" />

    <DashboardApp v-show="authStore.isOpenCabinet" />

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
    <PhoneModal
      v-if="authStore.isPhoneModalOpen"
      @close="authStore.closePhoneModal"
    />
    <RulesModal
      v-if="authStore.isRulesModalOpen"
      @close="authStore.closeRulesModal"
    />
    <MessageModal
      v-if="authStore.isMessageModalOpen"
      @close="authStore.closeMessageModal"
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
import PhoneModal from './components/modals/PhoneModal.vue'
import RulesModal from './components/modals/RulesModal.vue'
import MessageModal from './components/modals/MessageModal.vue'

export default {
  components: {
    HeaderApp,
    GuestContent,
    RegisterModal,
    CodeInputModal,
    LoginModal,
    DashboardApp,
    AuthModal,
    PhoneModal,
    RulesModal,
    MessageModal
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
      this.authStore.openCabinet()
    },

    async handleLoggedIn(token) {
      this.authStore.setToken(token)
      await this.authStore.fetchAmocrmData()
      this.showLogin = false
      this.showAuthModal = false
      this.authStore.openCabinet()
    },

    switchToSite() {
      this.authStore.closeCabinet()
    },
  },

  mounted() {
    this.authStore.closeCabinet(),
    this.authStore.checkTokenAndLoad()
  },
}
</script>