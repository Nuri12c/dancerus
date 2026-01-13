<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Авторизация</h2>
          <button class="button-1" @click="$emit('open-login')">Войти</button>
          <button class="button-1" @click="$emit('open-register')">Регистрация</button>
        </div>
      </div>
      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['open-login', 'open-register', 'close'],
}
</script>
<style scoped lang="scss">
@use '@/styles/mixins.scss';

</style>