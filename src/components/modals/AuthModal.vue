<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Авторизация</h2>

          <button class="button-1" @click="openLogin">
            Войти
          </button>

          <button class="button-1" @click="openRegister">
            Регистрация
          </button>
        </div>
      </div>

      <button class="modal-close" @click="close">
        ✖
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Закрытие модального окна
const close = () => {
  authStore.closeAuthChoice()
}

// Переход к форме входа
const openLogin = () => {
  authStore.closeAuthChoice()
  authStore.openLogin()
}

// Переход к форме регистрации
const openRegister = () => {
  authStore.closeAuthChoice()
  authStore.openRegister()
}
</script>
<style scoped lang="scss">
@use '@/styles/mixins.scss';

</style>