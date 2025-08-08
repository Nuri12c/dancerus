<template>
  <header class="header" :class="{ fixed: isFixed }">
    <div class="logo">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <div class="buttons">
      <button class="button-3">Главная</button>
      <button class="button-3">Все конкурсы</button>
      <button class="button-3">Подать заявку</button>
      <button class="button-3">Новости</button>
      <button class="watsapp-button"></button>
      <button class="button-2" @click="handleCabinetClick">
        {{ token ? 'Выйти' : 'Личный кабинет' }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
  },
  data() {
    return {
      isFixed: false
    };
  },
  methods: {
    handleCabinetClick() {
      if (this.token) {
        this.$emit('logout');
      } else {
        this.$emit('open-auth-modal');
      }
    },
    handleScroll() {
      this.isFixed = window.scrollY > 40;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>

</style>
