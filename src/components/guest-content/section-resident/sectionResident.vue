<template>
  <section class="resident">
    <!-- Заголовок -->
    <h2 class="resident__title">{{ title }}</h2>

    <!-- Основной блок -->
    <div class="resident__main">
      <div class="resident__text-block">
        <p>{{ mainText }}</p>
      </div>
      <!-- Заглушка картинки поверх блока -->
      <div
        class="resident__image-placeholder"
        :style="{ backgroundColor: imagePlaceholderBg }"
      ></div>
    </div>

    <!-- Нижняя картинка в левом углу -->
    <div
      class="resident__corner-image"
      :style="{ backgroundColor: cornerImageBg }"
    ></div>

    <!-- Кнопка по центру -->
    <div class="resident__button-wrapper">
      <button class="resident__button">{{ buttonText }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ResidentSection",
  data() {
    return {
      title: "Карта резидента",
      mainText:
        "Это блок с текстом резидента. Здесь можно разместить описание, условия, контакты или любую другую информацию, которая должна быть выделена.",
      imagePlaceholderBg: "#c4b59a", // цвет заглушки картинки справа
      cornerImageBg: "#a3b59a", // цвет заглушки в левом нижнем углу
      buttonText: "Подробнее",
    };
  },
};
</script>

<style scoped lang="scss">
.resident {
  background-color: #fcf5eb;
  padding: 4vw 10vw;
  position: relative;

  &__main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    margin-bottom: 5vw;

    .resident__text-block {
      flex: 0 0 60%;
      background-color: #fff;
      padding: 2vw;
      border-radius: 1vw;
      box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.1);
      font-size: 1.1vw;
      line-height: 1.5;
    }

    .resident__image-placeholder {
      width: 25%;
      height: 15vw;
      position: absolute;
      right: -5%; /* чтобы выглядело будто поверх блока */
      top: 0;
      border-radius: 1vw;
      box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.1);
    }
  }

  /* Картинка в левом нижнем углу */
  &__corner-image {
    width: 10vw;
    height: 10vw;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0.5vw;
    box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.1);
  }

  /* Кнопка по центру */
  &__button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 5vw;

    .resident__button {
      background-color: #000;
      color: #fff;
      padding: 1vw 2vw;
      font-size: 1.2vw;
      border: none;
      border-radius: 0.5vw;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #333;
      }
    }
  }
}

/* Адаптив */
@media (max-width: 768px) {
  .resident {
    padding: 6vw 5vw;
    
    &__main {
      flex-direction: column;
      align-items: center;

      .resident__text-block {
        width: 100%;
        font-size: 4vw;
        margin-bottom: 5vw;
      }

      .resident__image-placeholder {
        position: relative;
        width: 80%;
        height: 40vw;
        right: 0;
        top: 0;
        margin-bottom: 5vw;
      }
    }

    &__corner-image {
      width: 20vw;
      height: 20vw;
      bottom: auto;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 5vw;
    }

    &__button-wrapper {
      .resident__button {
        padding: 3vw 5vw;
        font-size: 5vw;
      }
    }
  }
}
</style>
