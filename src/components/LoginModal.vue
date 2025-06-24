
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
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

input {
  width: max-content;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #61daff;
}

button {
  margin: 5px;
  width: 100%;
  padding: 10px 20px;
  background: #61daff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #40c4e6;
}
</style>
