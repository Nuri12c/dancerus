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
.header {
  margin-top: 40px;
  width: 100%;
  background-color: #ffffff00;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 47px;
  padding-right: 47px;
  height: 78px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 40px;
  height: 40px;
  background-image: url('@/assets/Logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.logo__text {
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  margin: 0;
  font-size: 18px;
}

.buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.buttons button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>