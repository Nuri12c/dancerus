<template>
  <header class="header" :class="{ fixed: isFixed }">
    <!-- Гость: полный хедер -->
    <div v-if="!showDashboard" class="logo" @click="$emit('switch-to-site')">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <!-- Гость: меню -->
    <template v-if="!showDashboard">
      <!-- Бургер-кнопка -->
      <button
        class="burger"
        :class="{ active: isMenuOpen }"
        @click.stop="toggleMenu"
        aria-label="Открыть меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Меню (один @click на весь блок — магия закрытия) -->
      <div
        class="buttons"
        :class="{ open: isMenuOpen }"
        @click="closeMenuOnItemClick"
      >
        <button class="button-3" @click="$router?.push('/')">Главная</button>
        <button class="button-3" @click="$router?.push('/contests')">
          Все конкурсы
        </button>
        <button class="button-3" @click="$router?.push('/application')">
          Подать заявку
        </button>
        <button class="button-3" @click="$router?.push('/news')">
          Новости
        </button>

        <!-- WhatsApp и Личный кабинет — .stop, чтобы не срабатывало закрытие дважды -->
        <button
          class="watsapp-button"
          @click.stop="openWhatsApp"
          title="Написать в WhatsApp"
        ></button>

        <button
          class="button-2"
          @click.stop="handleCabinetClick"
        >
          Личный кабинет
        </button>
      </div>
    </template>

    <!-- Личный кабинет: упрощённый хедер -->
    <div v-if="showDashboard" class="dashboard-header">
      <div class="logo-icon" @click="$emit('switch-to-site')">
        <div class="icon"></div>
      </div>
      <div class="dashboard-container">
        <button class="back-to-site" @click="$emit('switch-to-site')">
          ← На сайт
        </button>
        <button
          class="watsapp-button dashboard"
          title="Написать в WhatsApp"
          @click="openWhatsApp"
        ></button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default {
  props: {
    showDashboard: Boolean,
  },
  emits: ['open-auth-modal', 'open-dashboard', 'switch-to-site'],

  computed: {
    ...mapStores(useAuthStore),
  },

  data() {
    return {
      isFixed: false,
      isMenuOpen: false,
    }
  },

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },

    // Закрывает меню при клике на любой пункт (кроме WhatsApp и ЛК)
    closeMenuOnItemClick() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false
        document.body.style.overflow = ''
      }
    },

    handleCabinetClick() {
      this.closeMenuOnItemClick() // закрываем меню
      if (this.authStore.token) {
        this.$emit('open-dashboard')
      } else {
        this.$emit('open-auth-modal')
      }
    },

    openWhatsApp() {
      this.closeMenuOnItemClick() // тоже закрываем
      window.open(
        'https://wa.me/79678723170?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D1%83',
        '_blank'
      )
    },

    handleScroll() {
      this.isFixed = window.scrollY > 40
    },
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    document.body.style.overflow = ''
  },
}
</script>

<style scoped>
</style>