<template>
  <header class="header" :class="{ fixed: isFixed }">
    <div class="logo" @click="$emit('switch-to-site')">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <!-- Гость или на сайте (не в ЛК) -->
    <template v-if="!showDashboard">
      <button class="burger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="buttons" :class="{ open: isMenuOpen }">
        <button class="button-3">Главная</button>
        <button class="button-3">Все конкурсы</button>
        <button class="button-3">Подать заявку</button>
        <button class="button-3">Новости</button>
        <button class="watsapp-button"></button>
        <button class="button-2" @click="handleCabinetClick">
          Личный кабинет
        </button>
      </div>
    </template>

    <!-- В ЛК: кнопка "На сайт" -->
    <button v-else class="back-to-site" @click="$emit('switch-to-site')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      На сайт
    </button>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
    showDashboard: Boolean,
  },
  emits: ['open-auth-modal', 'open-dashboard', 'switch-to-site'],
  data() {
    return {
      isFixed: false,
      isMenuOpen: false,
    };
  },
  methods: {
    handleCabinetClick() {
      if (this.token) {
        this.$emit('open-dashboard');
      } else {
        this.$emit('open-auth-modal');
      }
    },
    handleScroll() {
      this.isFixed = window.scrollY > 40;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>

</style>