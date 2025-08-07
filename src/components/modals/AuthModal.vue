<template>
  <div class="auth-modal">
    <div class="auth-modal__content">
      <h2 class="auth-modal__title">Авторизация</h2>
      <button class="auth-modal__button" @click="$emit('open-login')">Войти</button>
      <button class="auth-modal__button" @click="$emit('open-register')">Регистрация</button>
      <button class="auth-modal__button" @click="$emit('close')">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['open-login', 'open-register', 'close'],
};
</script>

<style scoped>
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.auth-modal__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.auth-modal__title {
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.auth-modal__button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>