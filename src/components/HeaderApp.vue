<template>
  <header>
    <button v-if="!token" @click="$emit('open-register')">Регистрация</button>
    <button v-if="!token" @click="$emit('open-login')">Войти</button>
    <button v-if="token" @click="$emit('open-dashboard')">Личный кабинет</button>
    <button v-if="token" @click="$emit('switch-to-site')">Сайт</button>
  </header>
</template>

<script>
export default {
  props: {
    token: String,
  },
};
</script>

<style>
header {
  padding: 10px;
  background: #f0f0f0;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
}
</style>
