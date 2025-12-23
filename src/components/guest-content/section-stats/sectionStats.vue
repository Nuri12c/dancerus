<template>
  <section id="stats" class="stats">
    <h2 class="stats__title">Танцуй, Россия!</h2>

    <div class="stats__content">
      <!-- ЛЕВАЯ КОЛОНКА -->
      <div class="stats__column stats__column--left">
        <div
          class="stats__card"
          v-for="(item, index) in leftCards"
          :key="'left-' + index"
        >
          <div class="stats__card-title">{{ item.title }}</div>
          <div class="stats__card-text">{{ item.text }}</div>
        </div>
      </div>

      <!-- ПРАВАЯ КОЛОНКА -->
      <div class="stats__column">
        <a
          v-for="(item, index) in rightCards"
          :key="'right-' + index"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="stats__card stats__card--with-image"
        >
          <div
            class="stats__image"
            :style="{ backgroundImage: `url(${item.icon})` }"
          ></div>

          <div class="stats__content-text">
            <div class="stats__card-text">{{ item.title }}</div>
            <div class="stats__card-title">{{ item.text }}</div>

          </div>
           <button class="button-1">Присоединиться</button>
        </a>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FlatCardsSection",
  data() {
    return {
      leftCards: [
        { title: "1 000 000+", text: "Зрителей прямых трансляций в год" },
        {
          title: "17 000",
          text: "Коллективов участвовали в проектах “Танцуй, Россия”",
        },
        { title: "40 000+", text: "Участников в год" },
      ],
      rightCards: [
        {
          title: "вконтакте",
          text: "279 000",
          icon: require("@/assets/images/vk.svg"),
          url: "https://vk.com/russia.dancekonkurs", // сюда вставьте ссылку
        },
       /*  {
          title: "инстаграм",
          text: "8 000",
          icon: require("@/assets/images/instagram.svg"),
          url: "https://www.instagram.com/russia.dancekonkurs",
        }, */
        {
          title: "телеграм",
          text: "40 000",
          icon: require("@/assets/images/telegram.svg"),
          url: "https://t.me/RUSSIANDANCEKONKURS",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.stats {
  position: relative;
  background-color: #000;
  padding: 4vw 10vw;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10vw;
    right: -10vw;
    transform: translateY(-50%) scaleX(-1);
    height: 70vw;

    background-image: url("@/assets/images/p-resident-card/line.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;

    z-index: 0;
  }
}

.stats__title {
  color: #fff;
}

.stats__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4vw;

  /* Важно: фиксированная высота контейнера (или min-height) */
  height: 100%; /* или конкретное значение, например 60vh */
  min-height: 70vh; /* если хочешь, чтобы не схлопывался при малом контенте */
}

.stats__column {
  display: flex;
  flex-direction: column;
  gap: 2vw;

  /* Колонка растягивается на всю высоту родителя */
  height: 100%;
}

.stats__card {
  position: relative;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.8vw;

  padding: 1.8vw;
  overflow: hidden;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);

  /* Самое главное — карточки растягиваются на всю доступную высоту колонки */
  flex: 1; /* или flex-grow: 1; */
  height: auto;
}
/* лёгкий блик стекла */
.stats__card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    130deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.02)
  );
  pointer-events: none;
}

/* контент поверх */
.stats__card > * {
  position: relative;
  z-index: 1;
}
.stats__column--left {
  text-align: center;
}
/* карточка с иконкой */
.stats__card--with-image {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5vw;
}

.stats__image {
  width: 8vw;
  height: 8vw;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  border-radius: 0.5vw;
  flex-shrink: 0;
}

.stats__content-text {
  display: flex;
  flex-direction: column;

}

.stats__card-title {
  color: #fff;
  font-weight: 800;
  font-size: 4vw;
  line-height: 1.2;
  font-family: "Gothic", sans-serif;
}

.stats__card-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 2vw;
  line-height: 1;
  font-family: "Inter", sans-serif;
}

/* ───────── mobile ───────── */
@media (max-width: 768px) {
  .stats {
    padding: 6vw 5vw;

    &::before {
      left: -25vw;
      right: -25vw;
      height: 60vw;
    }
  }

  .stats__content {
    grid-template-columns: 1fr;
    gap: 6vw;
  }

  .stats__title {
    font-size: 7vw;
  }

  .stats__card {
    padding: 4vw;
    height: auto;
    border-radius: 4vw;
  }

  .stats__image {
    width: 16vw;
    height: 16vw;
    border-radius: 2vw;
  }

  .stats__card-title {
    font-size: 6vw;
  }

  .stats__card-text {
    font-size: 3.5vw;
  }
}
</style>
