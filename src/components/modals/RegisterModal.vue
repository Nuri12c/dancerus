<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-text-container">
          <h2 class="modal-title">Регистрация</h2>
          <input
            class="modal-input"
            v-model="localPhone"
            placeholder="+7 900 000 00 00"
            @input="formatPhone"
            maxlength="16"
          />
          <input
            class="modal-input"
            v-model="password"
            type="password"
            placeholder="Пароль"
          />
          <button class="button-2" @click="register">Зарегистрироваться</button>
          <button class="button-2" @click="$emit('close')">Отмена</button>
          <div v-if="notification" class="modal-toast">{{ notification }}</div>
        </div>
      </div>
      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js';

export default {
  props: {
    phone: String,
  },
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      localPhone: this.phone || '+7 ',
      password: '',
      notification: '',
      notifyTimer: null,
    };
  },
  watch: {
    phone(newPhone) {
      this.localPhone = newPhone || '+7 ';
    },
    localPhone(newValue) {
      this.$emit('update:phone', newValue);
    },
  },
  methods: {
    showToast(message) {
      this.notification = message;
      clearTimeout(this.notifyTimer);
      this.notifyTimer = setTimeout(() => {
        this.notification = '';
      }, 3000);
    },
    formatPhone() {
      let digits = this.localPhone.replace(/\D/g, '');
      if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
      } else if (digits.startsWith('77')) {
        digits = '7' + digits.slice(2);
      }
      let formatted = '+7 ';
      if (digits.length > 1) formatted += digits.slice(1, 4);
      if (digits.length >= 4) formatted += ' ' + digits.slice(4, 7);
      if (digits.length >= 7) formatted += ' ' + digits.slice(7, 9);
      if (digits.length >= 9) formatted += ' ' + digits.slice(9, 11);
      this.localPhone = formatted.trim();
    },
    register() {
      const rawDigits = this.localPhone.replace(/\D/g, '');
      if (rawDigits.length !== 11 || !this.password) {
        this.showToast('Введите корректный номер и пароль');
        return;
      }
      const formattedPhone = '+' + rawDigits;

      const formData = new FormData();
      formData.append('phone', formattedPhone);
      formData.append('password', this.password);

      fetch('https://letsdancescores.tech/api/register.php', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            this.showToast('Код отправлен в WhatsApp!');
            this.$emit('registered', { phone: formattedPhone, password: this.password });
          } else {
            this.showToast(data.message || 'Ошибка регистрации');
          }
        })
        .catch(() => {
          this.showToast('Ошибка сети');
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/mixins.scss';


</style>