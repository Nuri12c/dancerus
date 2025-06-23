
<template>
  <div class="modal">
    <h2>Личный кабинет</h2>
    <p>Добро пожаловать, пользователь!</p>
    <button @click="$emit('logout')">Выйти</button>
    <button @click="$emit('close')">Закрыть</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border: 1px solid #aaa;
  box-shadow: 0 0 10px #333;
}
</style>
