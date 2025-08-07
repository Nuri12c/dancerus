<template>
  <header class="header">
    <div class="logo">
      <div class="icon"></div>
      <h3 class="logo__text">Танцуй, Россия</h3>
    </div>

    <div class="buttons">
      <button>Главная</button>
      <button>Все конкурсы</button>
      <button>Подать заявку</button>
      <button>Новости</button>
      <button>Ватсап</button>
      <button @click="handleCabinetClick">
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
  methods: {
    handleCabinetClick() {
      if (this.token) {
        this.$emit('logout'); // Если авторизован, вызываем выход
      } else {
        this.$emit('open-auth-modal'); // Если не авторизован, открываем модалку с выбором
      }
    },
  },
};
</script>

<style scoped>

</style>