
<template>
  <div class="modal">
    <h2>Регистрация</h2>
    <input v-model="localPhone" placeholder="Телефон" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button @click="register">Зарегистрироваться</button>
    <button @click="$emit('close')">Отмена</button>
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
  },
  data() {
    return {
      localPhone: this.phone || '', // Локальная копия phone
      password: '',
    };
  },
  watch: {
    phone(newPhone) {
      this.localPhone = newPhone; // Синхронизация с пропсом
    },
    localPhone(newValue) {
      this.$emit('update:phone', newValue); // Эмитим событие для обновления в родителе
    },
  },
  methods: {
    register() {
      if (!this.localPhone || !this.password) {
        alert('Заполните все поля');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.localPhone);
      formData.append('password', this.password);

      fetch('https://letsdancescores.tech/api/register.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            alert('Регистрация успешна! Код: ' + data.code);
            this.$emit('registered', { phone: this.localPhone });
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
