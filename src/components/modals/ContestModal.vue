<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <h3 class="modal-title">{{ card.heading }}</h3>
      <p class="modal-date">{{ card.date }}</p>
      <img :src="card.img" :alt="card.heading" class="modal-img" />
      <button class="modal-close" @click="$emit('close')">✖</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-window {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;       /* чуть меньше */
  max-width: 400px;      /* уменьшаем максимально допустимую ширину */
  width: 80%;            /* ширина по умолчанию */
  position: relative;
  animation: fadeIn 0.3s ease;
  max-height: 70vh;       /* не больше 80% высоты экрана */
  overflow-y: auto;       /* появится скролл, если контента больше */
}


.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-date {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #666;
}

.modal-img {
  width: 100%;
  border-radius: 8px;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: transparent;
  font-size: 1.3rem;
  cursor: pointer;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
