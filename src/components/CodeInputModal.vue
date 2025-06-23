<template>
  <div class="modal">
    <h2>Введите 4-значный код из WhatsApp</h2>
    <input v-model="code" maxlength="4" placeholder="Код" />
    <button @click="verifyCode">Подтвердить</button>
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
      code: '',
    };
  },
  methods: {
    verifyCode() {
      if (!this.code || this.code.length !== 4) {
        alert('Введите 4-значный код');
        return;
      }
      const formData = new FormData();
      formData.append('phone', this.phone);
      formData.append('code', this.code);

      fetch('https://letsdancescores.tech/api/verify.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.token) {
            alert('Код подтвержден! Вы вошли в систему.');
            this.$emit('verified', data.token);
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
