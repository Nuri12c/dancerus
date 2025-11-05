<template>
  <header class="header" :class="{ fixed: isFixed }">
    <div v-if="!showDashboard" class="logo" @click="$emit('switch-to-site')">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <!-- Гость или на сайте (не в ЛК) -->
    <template v-if="!showDashboard">
      <button
        class="burger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
      >
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

    <div v-else class="dashboard-header">
         <!-- 1. Логотип (только иконка) -->
      <div class="logo-icon" @click="$emit('switch-to-site')">
        <div class="icon"></div>
      </div>
      <div class="dashboard-container">
      <!-- 3. Кнопка "На сайт" -->
      <button class="back-to-site" @click="$emit('switch-to-site')">
        ← На сайт
      </button>
      <!-- 2. WhatsApp -->
      <button
        class="watsapp-button dashboard"
        title="Написать в WhatsApp"
      ></button>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
    showDashboard: Boolean,
  },
  emits: ["open-auth-modal", "open-dashboard", "switch-to-site"],
  data() {
    return {
      isFixed: false,
      isMenuOpen: false,
    };
  },
  methods: {
    handleCabinetClick() {
      if (this.token) {
        this.$emit("open-dashboard");
      } else {
        this.$emit("open-auth-modal");
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
</style>