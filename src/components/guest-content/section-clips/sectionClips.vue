<template>
  <section class="clips">
    <div class="clips__grid">
    <!--   <div class="clips__card">
        <iframe
          src="https://vk.com/video_ext.php?oid=-160233006&id=456241249"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>

      <div class="clips__card">
        <iframe
          src="https://vk.com/video_ext.php?oid=-160233006&id=456241266"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>

      <div class="clips__card">
        <iframe
          src="https://vk.com/video_ext.php?oid=-160233006&id=456241258"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          frameborder="0"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "ClipsSection",
};
</script>

<style scoped>
/* ===============================
   ОБЩИЕ СТИЛИ
================================ */

.clips {
  background-color: #fcf5eb;
  padding: 1.04vw 10.44vw;
  margin: 0 auto;
}

.clips__grid {
  margin: 0 auto;
  display: flex;
  gap: 2.04vw;
  justify-content: space-between;
}

/* ===============================
   КАРТОЧКА КЛИПА
================================ */

.clips__card {
  flex: 1;
  aspect-ratio: 9 / 16;
  max-height: 42vw; /* 👈 клипы ниже */
  background: #000;
  border-radius: 1.3vw;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.clips__card:hover {
  transform: scale(1.02);
}

/* iframe растягивается правильно */
.clips__card iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* ===============================
   МОБИЛЬНАЯ АДАПТАЦИЯ
================================ */

@media (max-width: 768px) {
  .clips {
    padding: 5vw;
  }

  .clips__title {
    font-size: 7vw;
    margin-bottom: 6vw;
  }

  .clips__grid {
    flex-direction: column;
    gap: 4vw;
  }

  .clips__card {
    max-height: 180vw; /* 👈 не пропадают на мобилках */
  }

  .clips__card:hover {
    transform: none;
  }
}
</style>
