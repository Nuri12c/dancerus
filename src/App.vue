<template>
  <div>
    <!-- КНОПКА ДЛЯ ТЕСТА -->
    <button
      style="position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 8px 12px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;"
      @click="setTempToken"
    >
      Установить тестовый токен
    </button>

    <HeaderApp
      :show-dashboard="showDashboard"
      @open-register="showRegister = true"
      @open-login="showLogin = true"
      @open-auth-modal="showAuthModal = true"
      @open-dashboard="showDashboard = true"
      @switch-to-site="switchToSite"
      @logout="logout"
    />

    <GuestContent v-if="!showDashboard" />

    <DashboardApp v-if="showDashboard" />

    <!-- Модалки -->
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
    // КНОПКА: Установить тестовый токен + моковые данные
    setTempToken() {
      this.authStore.setToken('test-token-123')
      this.loadMockData()
      this.showDashboard = true
      console.log('Тест: токен установлен, моковые данные загружены')
    },

    // Загрузка моковых данных
    loadMockData() {
      this.authStore.setAmocrmData({
        id: 49109253,
        name: 'Нурислам Ганеев4',
        first_name: 'Нурислам',
        last_name: 'Ганеев',
        custom_fields_values: [
          {
            field_id: 379829,
            field_name: 'Телефон',
            values: [{ value: '+79027155011' }],
          },
          {
            field_id: 598163,
            field_name: 'Имя заполнено',
            values: [{ value: false }], // имя подтверждено
          },
          {
            field_id: 596967,
            field_name: 'Денежный грант',
            values: [{ value: '15000' }],
          },
          {
            field_id: 597163,
            field_name: 'Участие История',
            values: [
              {
                value:
                  '{"Отборочный этап Конкурент":{"Гуреева Галина Сергеевна":{"city":"Москва","date":"09.12.23"}},"Полуфинал Зажигай":{"Гуреева Галина Сергеевна":{"city":"Москва","date":"06.04.24"}},"Финал Зажигай":{"Гуреева Галина Сергеевна":{"city":"Москва","date":"06.04.24"}},"Прямое Включение":{"GLITCHES":{"date":"19.09.25","place":"Лауреат 1","bonuses":"10000"},"Спортики":{"date":"19.09.25","place":"Дипломант 1","bonuses":""},"Пазлы":{"date":"19.09.25","place":"Лауреат 1","bonuses":"10000"}}}',
              },
            ],
          },
          {
            field_id: 598151,
            field_name: 'Карты лояльности',
            values: [
              {
                value: '{"cards":{"residentCard":{"value":"3"},"presidentCard":{"value":"5"}}}',
              },
            ],
          },
        ],
      })
    },

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

    handleVerified(token) {
      this.authStore.setToken(token)
      this.loadMockData()
      this.showCodeInput = false
      this.showDashboard = true
    },

    handleLoggedIn(token) {
      this.authStore.setToken(token)
      this.loadMockData()
      this.showLogin = false
      this.showAuthModal = false
      this.showDashboard = true
    },

    logout() {
      this.authStore.clearUserData()
      this.showDashboard = false
      this.closeAll()
      alert('Вы вышли из системы')
    },

    switchToSite() {
      this.showDashboard = false
    },
  },

  mounted() {
    // Автозагрузка при старте (можно включить/выключить)
    // this.setTempToken()
  },
}
</script>


<!--
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
</script> -->