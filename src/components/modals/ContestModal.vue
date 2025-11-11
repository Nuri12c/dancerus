<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-text-container">
        <h3 class="modal-title">{{ card.heading }}</h3>
        <p class="modal-text" v-html="formatText(card.text)"></p>
        <button class="modal-action-button button-1">Подать заявку</button>
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
  methods: {
    formatText(text) {
      // Заменяем <br> на реальный перенос строки для v-html
      return text.replace(/<br\s*\/?>/gi, '<br>');
    }
  }
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
  padding: 2rem;
  width: 84.32vw;
  max-width: 1200px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid white;
  animation: fadeIn 0.3s ease;
}

.modal-text-container {
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-title {
  font-family: 'Oswald', sans-serif;
  font-size: 2.5vw;
  text-transform: uppercase;
  margin: 0;
}

.modal-text {
  font-size: 1.1vw;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.modal-action-button {
  align-self: flex-start;
  margin-top: 1rem;
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
    width: 90vw;
    padding: 1.5rem;
    border-radius: 3.98vw;
  }

  .modal-title {
    font-size: 6vw;
  }

  .modal-text {
    font-size: 4vw;
  }

  .modal-close {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 5vw;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>