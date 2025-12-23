<template>
  <section class="calendar">
    <h2 class="calendar__title">Календарь событий</h2>

    <!-- Ряд 1: 55% + 45% -->
    <div class="calendar__row calendar__row--hero">
      <div
        class="event-card event-card--width-55 event-card--polufinal"
        :style="{
          backgroundImage: `url(${polufinal})`,
          backgroundPosition: 'right bottom',
        }"
      >
        <h1 class="event-card__heading">2026</h1>
        <ul class="event-card__dates">
          <li clas2уs="event-card__date">10,11 марта - Санкт-Петербург</li>
          <li class="event-card__date">
            <strong>4-5 апреля</strong> — Новосибирск
          </li>

          <li class="event-card__date"><strong>4,5 апреля</strong> — Казань</li>
          <li class="event-card__date"><strong>11,12 апреля</strong> — Сочи</li>
          <li class="event-card__date">
            <strong>18,19 апреля</strong> — Москва
          </li>
          <li class="event-card__date">
            <strong>25,26 апреля </strong> - Астана
          </li>
        </ul>
        <button class="button-1 event-card__button">подать заявку</button>
      </div>
      <div
        class="event-card event-card--width-45 event-card--fourfest"
        :style="{
          backgroundImage: `url(${fourfest})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading">2026</h1>
        <p class="event-card__mounth">Май</p>
        <button class="button-1 event-card__button">подать заявку</button>
      </div>
    </div>

    <!-- Ряд 2: 45% + 55% -->
    <div class="calendar__row calendar__row--second">
      <div
        class="event-card event-card--width-45 event-card--konkurent"
        :style="{
          backgroundImage: `url(${konkurent})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading">2026</h1>
        <p class="event-card__mounth">Апрель</p>
        <button class="button-1 event-card__button">подать заявку</button>
      </div>
      <div
        class="event-card event-card--width-55 event-card--final"
        :style="{
          backgroundImage: `url(${final})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading">2026</h1>
        <p class="event-card__mounth">Осень</p>
        <button class="button-1 event-card__button">подать заявку</button>
      </div>
    </div>

    <!-- Ряд 3: 100% -->
    <div class="calendar__row calendar__row--second">
      <div
        class="event-card event-card--width-100 event-card--nasledie"
        :style="{
          backgroundImage: `url(${nasledie})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading dark">2026</h1>
        <p class="event-card__mounth dark">Декабрь</p>
        <button class="button-1 event-card__button--dark">подать заявку</button>
      </div>
    </div>
  </section>
</template>

<script>
import polufinal from "@/assets/images/calendar-tab/polufinal-bg.png";
import fourfest from "@/assets/images/calendar-tab/fourfest-bg.png";
import konkurent from "@/assets/images/calendar-tab/konkurent-bg.png";
import final from "@/assets/images/calendar-tab/final-bg.png";
import nasledie from "@/assets/images/calendar-tab/nasledie-bg.png";

export default {
  data() {
    return {
      polufinal,
      fourfest,
      konkurent,
      final,
      nasledie,
    };
  },
};
</script>

<style scoped lang="scss">
.calendar {
  max-width: 100%;
  box-sizing: border-box;
}
.calendar__title {
  margin-bottom: 1.25vw;
  font-size: 3.49vw;
  color: #333;
  font-family: "Gothic"; /* Исправлено название */
  text-transform: none;
  text-align: left;
}

/* === Ряды === */
.calendar__row {
  display: flex;
  gap: 1vw;
  margin-bottom: 0.6vw;

  &--hero {
    height: 18.03vw;
  }

  &--second {
    height: 10.4vw;
  }
}

/* === Карточка === */
.event-card {
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.04vw 2.083vw 1.04vw 2.08vw;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.2s ease;
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.313vw 0.625vw rgba(0, 0, 0, 0.1);
  }

  /* === Ширины === */
  &--width-55 {
    width: 55%;
  }
  &--width-45 {
    width: 45%;
  }
  &--width-100 {
    width: 100%;
  }

  &__heading {
    font-family: "Inter", sans-serif;
    margin: 0;
    font-size: 2.5vw;
    font-weight: medium;
  }

  &__dates {
    font-family: "Inter", sans-serif;
    padding-left: 0.78vw;
    font-size: 0.94vw;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__date {
    margin-bottom: 0.31vw;
    color: inherit;

    strong {
      font-weight: 600;
    }
  }
}
.event-card__mounth {
  font-family: "Inter", sans-serif;
  margin: 0;
  font-size: 1.5vw;
  font-weight: 200;
}
.event-card__button {
  width: fit-content;
}
.event-card__button--dark {
  border-color: #333;
  color: #333;
  width: fit-content;
}
/* === Адаптивность === */
@media (max-width: 768px) {
  .calendar__row {
    flex-direction: column;
    gap: 0.833vw;
  }
  .calendar__title {
    font-size: 6.8vw;
    margin-bottom: 6.5vw;
  }

  .event-card {
    padding: 2.3vw 2.3vw 2.3vw 3.3vw;
    height: 30.854vw;
  }
  .event-card {
    &__dates {
      padding-left: 2.78vw;
      font-size: 3.71vw;
      margin: 0;
    }
    &__mounth {
      font-size: 3.64vw;
      line-height: 0;
      margin: 0;
    }
    &__heading {
      font-size: 6.78vw;
    }
    &__button {
      font-size: 3.78vw;
      padding: 1.2vw 1.2vw;
      border-radius: 1.21vw;
    }
    &--width-55,
    &--width-45,
    &--width-100 {
      width: auto !important;
    }
    &--otbor,
    &--polufinal {
      height: 52.18vw;
    }

    &--fourfest {
      height: 32.18vw;
    }
    &--konkurent,
    &--final,
    &--nasledie {
      height: 22.43vw;
    }
  }

  .calendar__row--hero,
  .calendar__row--second {
    height: auto !important;
    min-height: 6.25vw;
  }
}
</style>