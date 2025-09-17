<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <img
          v-if="currentImage"
          :src="currentImage"
          :alt="card.heading"
          class="modal-img"
          loading="lazy"
          @error="handleImageError"
        />
        <div class="modal-text-container">
          <h3 class="modal-title">{{ card.heading }}</h3>
          <p class="modal-date">{{ card.date }}</p>
          <p class="modal-text">{{ card.text }}</p>
          <button class="modal-action-button">Подать заявку</button>
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
      currentIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    currentImage() {
      return this.card.imagePaths[this.currentIndex] || require('@/assets/images/liveStream.png');
    },
  },
  methods: {
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src);
      event.target.src = require('@/assets/images/liveStream.png');
    },
  },
  mounted() {
    if (this.card.imagePaths && this.card.imagePaths.length > 1) {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.card.imagePaths.length;
      }, 5000);
    }
  },
  beforeUnmount() {
    if (this.intervalId) clearInterval(this.intervalId);
  },
};
</script>

<style scoped lang="scss">
.modal-img {
  width: 35.16vw;
  height: 34.64vw;
  border-radius: 1.5rem;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
}

@import '@/styles/mixins.scss';
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1.67vw;
  padding: 1.5rem;
  width: 84.32vw;
  position: relative;
  animation: fadeIn 0.3s ease;
  height: 70vh;
  overflow-y: auto;
  border: 2px solid white;
  overflow: hidden;
}

.modal-content {
  display: flex;
  gap: 1.5rem;
}

.modal-text-container {
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-date {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-text {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.modal-action-button {
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  width: fit-content;
}

.modal-action-button:hover {
  background: #0056b3;
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
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>