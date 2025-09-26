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
          <p class="modal-text" >{{ card.text }}</p>
          <button class="modal-action-button button-1">Подать заявку</button>
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
@import '@/styles/mixins.scss';
.modal-window {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 1.67vw;
  padding: 1.5rem;
  width: 84.32vw;
  position: relative;
  animation: fadeIn 0.3s ease;
  height: auto; /* Изменено с 70vh на auto для подстройки под контент */
  max-height: 70vh; /* Ограничение высоты с возможностью скролла */
  overflow-y: auto;
  border: 2px solid white;
  display: flex; /* Добавляем flex для вертикального расположения */
  flex-direction: column; /* Вертикальное расположение */
  gap: 1.5rem; /* Отступ между modal-content и modal-card */
}
.modal-content {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  height: 100%;
  width: 84.32vw;
}

.modal-img {
  width: 30.16vw;
  height: 29.64vw;
  border-radius: 1.5rem;
  object-fit: cover;
  transition: opacity 0.5s ease-in-out;
  flex-shrink: 0;
}

.modal-text-container {
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  overflow-y: auto;
  max-height: 100%;
  padding-right: 1rem;
}

.modal-text {
  font-size: 0.83vw;
  margin-bottom: 1rem;
  white-space: pre-line;
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .modal-img {
    width: 80vw;
    height: auto;
    max-height: 50vh;
  }

  .modal-text-container {
    width: 80vw;
    align-items: center;
    text-align: center;
    overflow-y: auto;
    max-height: 40vh;
  }

  .modal-text {
    font-size: 4vw;
  }
}

</style>