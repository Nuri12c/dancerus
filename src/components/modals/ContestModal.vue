<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <h3 class="modal-title">{{ card.heading }}</h3>
        <p class="modal-subtitle">Оставьте номер телефона — мы свяжемся с вами и расскажем подробности участия в конкурсе</p>

        <form @submit.prevent="submitPhone" class="phone-form">
          <input
            type="tel"
            v-model="phone"
            placeholder="+7 ___ ___ __ __"
            class="phone-input"
            required
            pattern="\+?[0-9\s\-\(\)]{10,}"
          />
          <button type="submit" class="submit-button button-1">
            Отправить
          </button>
        </form>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>

      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      phone: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async submitPhone() {
      // Здесь можно добавить реальную отправку на сервер
      // Пока сделаем имитацию успешной отправки

      if (!this.phone.trim()) {
        this.errorMessage = 'Пожалуйста, введите номер телефона';
        return;
      }

      try {
        // Пример: отправка на backend (закомментировано)
        // await fetch('/api/submit-phone', {
        //   method: 'POST',
        //   body: JSON.stringify({ contest: this.card.heading, phone: this.phone })
        // });

        this.successMessage = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
        this.errorMessage = '';
        this.phone = '';

        // Автозакрытие модалки через 3 секунды после успеха
        setTimeout(() => {
          this.$emit('close');
        }, 3000);
      } catch (err) {
        this.errorMessage = 'Ошибка отправки. Попробуйте позже.';
        this.successMessage = '';
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/mixins.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-window {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1.67vw;
  padding: 2.5rem;
  width: 84.32vw;
  max-width: 1200px;
  max-height: 80vh;
  position: relative;
  border: 2px solid white;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  color: white;
  text-align: center;
}

.modal-title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5vw;
  text-transform: uppercase;
  margin: 0 0 1rem;
}

.modal-subtitle {
  font-size: 1.2vw;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.phone-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}

.phone-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2vw;
  border-radius: 50px;
  border: 2px solid white;
  background: transparent;
  color: white;
  text-align: center;
}

.phone-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.submit-button {
  align-self: center;
}

.success-message {
  margin-top: 1.5rem;
  color: #a0ffa0;
  font-size: 1.3vw;
}

.error-message {
  margin-top: 1.5rem;
  color: #ffaaaa;
  font-size: 1.1vw;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: white;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Адаптив */
@media (max-width: 768px) {
  .modal-window {
    width: 92vw;
    padding: 2rem;
    border-radius: 4vw;
  }

  .modal-title {
    font-size: 6vw;
  }

  .modal-subtitle {
    font-size: 4vw;
  }

  .phone-input {
    font-size: 4.5vw;
    padding: 1.2rem;
  }

  .submit-button {
    font-size: 4vw;
    padding: 1rem 2rem;
  }

  .success-message,
  .error-message {
    font-size: 4vw;
  }

  .modal-close {
    font-size: 5vw;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>