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
        <button class="watsapp-button" onclick="window.open('https://wa.me/79678723170?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D1%83', '_blank')"></button>
        <button class="button-2" @click="toggleMenu(); handleCabinetClick()">
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
        onclick="window.open('https://wa.me/79678723170?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D1%83', '_blank')"
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