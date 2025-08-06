<template>
  <header class="header">
    <div class="container">
      <div class="logo">💃 LetsDance</div>
      <div class="buttons">
        <button v-if="!token" @click="$emit('open-register')">Регистрация</button>
        <button v-if="!token" @click="$emit('open-login')">Войти</button>
        <button v-if="token" @click="$emit('switch-to-site')">Сайт</button>
        <button v-if="token" @click="$emit('open-dashboard')">Личный кабинет</button>
        <button v-if="token" @click="$emit('logout')">Выйти</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background-color: #ffffff00;
  margin-top: 0;
  padding: 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

.buttons button {
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: 0.3s;
}

.buttons button:hover {
  background: #f0f0f0;
}
</style>
