<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <p class="modal-subtitle">
          Оставьте номер телефона — мы свяжемся с вами в ближайшее время
        </p>

        <form @submit.prevent="submitPhone" class="phone-form">
          <input
            type="text"
            v-model="name"
            placeholder="Ваше имя"
            class="name-input"
            required
          />

          <input
            type="tel"
            v-model="phone"
            placeholder="+7 (___) ___-__-__"
            class="phone-input"
            required
          />

          <button
            type="submit"
            class="submit-button button-1"
            :disabled="isLoading"
          >
            {{ isLoading ? "Отправка..." : "Отправить" }}
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
  data() {
    return {
      name: "",
      phone: "",
      successMessage: "",
      errorMessage: "",
      isLoading: false,
    };
  },

  methods: {
    normalizePhone(rawPhone) {
      // убираем всё кроме цифр
      let digits = rawPhone.replace(/\D/g, "");

      if (digits.startsWith("8")) {
        digits = "7" + digits.slice(1);
      }

      if (digits.startsWith("7")) {
        digits = "+" + digits;
      }

      // итоговый формат: +7XXXXXXXXXX
      if (!/^\+7\d{10}$/.test(digits)) {
        return null;
      }

      return digits;
    },

    async submitPhone() {
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.name.trim() || !this.phone.trim()) {
        this.errorMessage = "Пожалуйста, заполните все поля";
        return;
      }

      const normalizedPhone = this.normalizePhone(this.phone);

      if (!normalizedPhone) {
        this.errorMessage = "Введите корректный номер телефона";
        return;
      }

      this.isLoading = true;

      try {
        const response = await fetch(
          "https://dancerus.ru/api/submit_phone.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: this.name,
              phone: normalizedPhone,
            }),
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          this.successMessage =
            data.message || "Спасибо! Мы свяжемся с вами скоро.";
          this.name = "";
          this.phone = "";

          setTimeout(() => this.$emit("close"), 3000);
        } else {
          this.errorMessage = data.message || "Ошибка отправки";
        }
      } catch (e) {
        this.errorMessage = "Ошибка сети. Попробуйте позже.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/styles/mixins.scss";

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
  font-family: "Oswald", sans-serif;
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
.name-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2vw;
  border-radius: 50px;
  border: 2px solid white;
  background: transparent;
  color: white;
  text-align: center;
}
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.name-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
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
  .name-input {
    font-size: 4.5vw;
    padding: 1.2rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>