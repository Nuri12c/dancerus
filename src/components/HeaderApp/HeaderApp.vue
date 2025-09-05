<template>
  <header class="header" :class="{ fixed: isFixed }">
    <div class="logo">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <button class="burger" :class="{ active: isMenuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="buttons" :class="{ open: isMenuOpen, 'dashboard-active': showDashboard }">
      <template v-if="!showDashboard">
        <button class="button-3">Главная</button>
        <button class="button-3" href="#contest">Все конкурсы</button>
        <button class="button-3">Подать заявку</button>
        <button class="button-3">Новости</button>
      </template>
      <button class="watsapp-button"></button>
      <button class="button-3" v-if="token && showDashboard" @click="$emit('switch-to-site')">
        Вернуться на сайт
      </button>
      <button class="button-2" @click="handleCabinetClick">
        {{ token && !showDashboard ? "Личный кабинет" : token && showDashboard ? "Выйти" : "Личный кабинет" }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
    showDashboard: Boolean,
  },
  data() {
    return {
      isFixed: false,
      isMenuOpen: false,
    };
  },
  methods: {
    handleCabinetClick() {
      if (this.token) {
        if (this.showDashboard) {
          this.$emit("logout"); // Выйти, если в личном кабинете
        } else {
          this.$emit("open-dashboard"); // Открыть личный кабинет, если на сайте
        }
      } else {
        this.$emit("open-auth-modal"); // Открыть модалку авторизации, если токена нет
      }
    },
    handleScroll() {
      this.isFixed = window.scrollY > 40;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? "hidden" : "";
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
/* Ваши стили */
</style>