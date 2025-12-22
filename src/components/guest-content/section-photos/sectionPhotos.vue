<template>
  <section id="photos" class="photos">
    <h2 class="photos__title">Фотографии</h2>

    <div class="photos__layout">
      <!-- ЛЕВАЯ ЧАСТЬ — 70% ширины, 4 больших фото -->
      <div class="photos__left">
        <div
          v-for="(photo, index) in leftPhotos"
          :key="'left-' + index"
          class="photo photo--big"
          :style="{ backgroundImage: photo.bg }"
        ></div>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ — 30% ширины, 8 маленьких фото -->
      <div class="photos__right">
        <div class="photos__col">
          <div
            v-for="(photo, index) in rightPhotosCol1"
            :key="'right-1-' + index"
            class="photo photo--small"
            :style="{ backgroundImage: photo.bg }"
          ></div>
        </div>

        <div class="photos__col">
          <div
            v-for="(photo, index) in rightPhotosCol2"
            :key="'right-2-' + index"
            class="photo photo--small"
            :style="{ backgroundImage: photo.bg }"
          ></div>
        </div>
      </div>
    </div>
    <div class="photos__button-wrapper">
  <a href="https://vk.com/albums-160233006"
     class="button-2 dark"
     target="_blank"
     rel="noopener noreferrer">
    СМОТРЕТЬ ВСЕ ФОТО
  </a>
</div>
  </section>
</template>

<script>
import photo1 from "@/assets/images/section-photos/photo-1.png";
import photo2 from "@/assets/images/section-photos/photo-2.png";
import photo3 from "@/assets/images/section-photos/photo-3.png";
import photo4 from "@/assets/images/section-photos/photo-4.png";
import photo5 from "@/assets/images/section-photos/photo-5.png";
import photo6 from "@/assets/images/section-photos/photo-6.png";
import photo7 from "@/assets/images/section-photos/photo-7.png";
import photo8 from "@/assets/images/section-photos/photo-8.png";
import photo9 from "@/assets/images/section-photos/photo-9.png";
import photo10 from "@/assets/images/section-photos/photo-10.png";
import photo11 from "@/assets/images/section-photos/photo-11.png";
import photo12 from "@/assets/images/section-photos/photo-12.png";

export default {
  name: "PhotosSection",

  data() {
    return {
      leftPhotos: [
        { bg: `url(${photo1})` },
        { bg: `url(${photo2})` },
        { bg: `url(${photo3})` },
        { bg: `url(${photo4})` },
      ],

      // Пока оставим цветные плейсхолдеры для правой части
      // Когда добавишь фото — замени на url(${photoX})
      rightPhotosCol1: [
        { bg: `url(${photo5})` },
        { bg: `url(${photo6})` },
        { bg: `url(${photo7})` },
        { bg: `url(${photo8})` },
      ],

      rightPhotosCol2: [
        { bg: `url(${photo9})` },
        { bg: `url(${photo10})` },
        { bg: `url(${photo11})` },
        { bg: `url(${photo12})` },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dark {
  color: #262626 !important;
  border: #262626 2px solid !important;
  font-weight: 500;
}
/* ОБЩИЕ СТИЛИ */
.photos {
  background-color: #fcf5eb;
  padding: 1.04vw 10.44vw;
}

.photos__button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 3vw;
}
/* ОСНОВНОЙ КОНТЕЙНЕР */
.photos__layout {
  display: flex;
  gap: 1vw;
  height: 42vw; /* Меняй по необходимости */
}

/* ЛЕВАЯ ЧАСТЬ */
.photos__left {
  flex: 0 0 70%;
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  height: 100%;
}

.photo--big {
  flex: 0 0 calc(50% - 0.5vw);
  height: calc(50% - 0.5vw);
}

/* ПРАВАЯ ЧАСТЬ */
.photos__right {
  flex: 0 0 30%;
  display: flex;
  gap: 1vw;
  height: 100%;
}

.photos__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  height: 100%;
}

.photo--small {
  flex: 1;
}

/* ГЛАВНОЕ: ОБЩИЕ СТИЛИ ФОНОВОГО ИЗОБРАЖЕНИЯ */
.photo {
  border-radius: 1.3vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; /* ← Теперь работает! */
  transition: transform 0.3s ease;
}

.photo:hover {
  transform: scale(1.03);
}

/* МОБИЛЬНАЯ АДАПТАЦИЯ */
@media (max-width: 768px) {
  .photos {
    padding: 5vw;
  }

  .photos__layout {
    flex-direction: column;
    gap: 6vw;
    height: auto; /* Оставляем auto */
  }

  .photos__left {
    display: flex;
    flex-wrap: wrap;
    gap: 4vw;
    height: auto;
  }

  /* Ключевое изменение: убираем фиксированную height у больших фото */
  .photo--big {
    flex: 0 0 calc(50% - 2vw);
    aspect-ratio: 1 / 1; /* Вместо height — используем aspect-ratio */
  }

  .photos__right {
    display: flex;
    gap: 4vw;
    height: auto;
  }

  .photos__col {
    flex: 1;
    gap: 4vw;
  }

  /* Маленькие фото тоже используют aspect-ratio */
  .photo--small {
    aspect-ratio: 1 / 1;
  }

  .photo:hover {
    transform: none;
  }
}
</style>