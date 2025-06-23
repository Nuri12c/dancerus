
<template>
  <div class="modal">
    <h2>Логин</h2>
    <input v-model="phone" placeholder="Телефон" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="login">Войти</button>
    <button @click="$emit('close')">Отмена</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (!this.phone || !this.password) {
        alert('Заполните все поля');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.phone);
      formData.append('password', this.password);

      fetch('https://letsdancescores.tech/api/login.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.token) {
            alert('Вы успешно вошли!');
            this.$emit('logged-in', data.token);
          } else {
            alert('Ошибка: ' + data.message);
          }
        })
        .catch(() => alert('Ошибка сети'));
    },
  },
};
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
