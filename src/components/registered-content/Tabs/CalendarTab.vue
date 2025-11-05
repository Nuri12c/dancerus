<template>
  <section class="calendar">
    <h2 class="calendar__title">Календарь событий</h2>

    <!-- Ряд 1: 55% + 45% -->
    <div class="calendar__row calendar__row--hero">
      <div
        class="event-card event-card--width-55 event-card--otbor"
        :style="{ backgroundImage: `url(${otbor})` }"
      >
        <h1 class="event-card__heading white">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date">8,9 ноября - Астана</li>
          <li class="event-card__date">16 ноября — Москва</li>
          <li class="event-card__date">
            22 ноября — Новосибирск
          </li>
          <li class="event-card__date">
            30 ноября — Санкт-Петербург
          </li>
          <li class="event-card__date">6 декабря — Казань</li>
          <li class="event-card__date">
            14 декабря — Краснодар
          </li>
        </ul>
        <button class="event-card__button">подать заявку</button>
      </div>

      <div
        class="event-card event-card--width-45 event-card--polufinal"
        :style="{
          backgroundImage: `url(${polufinal})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading white">2026</h1>
        <ul class="event-card__dates white">
          <li clas2уs="event-card__date">
            10,11 марта  - Санкт-Петербург
          </li>
          <li class="event-card__date"><strong>16 ноября</strong> — Москва</li>
          <li class="event-card__date">
            <strong>22 ноября</strong> — Новосибирск
          </li>
          <li class="event-card__date">
            <strong>30 ноября</strong> — Санкт-Петербург
          </li>
          <li class="event-card__date"><strong>6 декабря</strong> — Казань</li>
          <li class="event-card__date">
            <strong>14 декабря</strong> — Краснодар
          </li>
        </ul>
        <button class="event-card__button">подать заявку</button>
      </div>
    </div>

    <!-- Ряд 2: 45% + 55% -->
    <div class="calendar__row calendar__row--second">
      <div
        class="event-card event-card--width-45 event-card--fourfest"
        :style="{
          backgroundImage: `url(${fourfest})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading white">2026</h1>
        <p>Май </p>
        <button class="event-card__button">подать заявку</button>
      </div>

      <div
        class="event-card event-card--width-55 event-card--konkurent"
        :style="{
          backgroundImage: `url(${konkurent})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading white">2026</h1>
        <p>Апрель</p>
        <button class="event-card__button">подать заявку</button>
      </div>
    </div>

    <!-- Ряд 3: 100% -->
    <div class="calendar__row calendar__row--second">
      <div
        class="event-card event-card--width-100 event-card--final"
        :style="{
          backgroundImage: `url(${final})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading white">2026</h1>
        <p>Осень</p>
        <button class="event-card__button">подать заявку</button>
      </div>
    </div>

    <!-- Ряд 4: 100% -->
    <div class="calendar__row calendar__row--second">
      <div
        class="event-card event-card--width-100 event-card--nasledie"
        :style="{
          backgroundImage: `url(${nasledie})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading">2026</h1>
        <p>Декабрь</p>
        <button class="event-card__button">подать заявку</button>
      </div>
    </div>
  </section>
</template>

<script>
import otbor from "@/assets/images/calendar-tab/otbor-bg.png";
import polufinal from "@/assets/images/calendar-tab/polufinal-bg.png";
import fourfest from "@/assets/images/calendar-tab/fourfest-bg.png";
import konkurent from "@/assets/images/calendar-tab/konkurent-bg.png";
import final from "@/assets/images/calendar-tab/final-bg.png";
import nasledie from "@/assets/images/calendar-tab/nasledie-bg.png";

export default {
  data() {
    return {
      otbor,
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
  font-family: 'Gothic'; /* Исправлено название */
  text-transform: none;
  text-align: left;
}

/* === Ряды === */
.calendar__row {
  display: flex;
  gap: 1.04vw;
  margin-bottom: 1.04vw;

  &--hero {
    height: 22.03vw;
  }

  &--second {
    height: 12.4vw;
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
  color: #444;
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
    margin: 0 0 0.83vw;
    font-size: 2.50vw;
    font-weight: medium;
  }

  &__dates {
    font-family: "Inter", sans-serif;
    padding-left: 0.78vw;
    font-size: 0.94vw;

  }

  &__date {
    margin-bottom: 0.31vw;
    color: inherit;

    strong {
      font-weight: 600;
    }
  }

  &__button {

    padding: 0.4vw 0.4vw;
    display: flex;
    max-width: fit-content;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
    background: rgb(255, 255, 255);
    border: 2px solid white;
    color: #1B514B;
    font-size: 1.56vw;
    font-weight: 500;
    border-radius: 0.417vw;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;

    &:hover {
      background: rgb(88, 66, 66);
      color: #000;
    }
  }
}

/* === Адаптивность === */
@media (max-width: 768px) {
  .calendar__row {
    flex-direction: column;
    gap: 0.833vw;
  }

  .event-card {
    padding: 1.30vw;
     height: 30.854vw;
  }
  .event-card {
    &--width-55,
    &--width-45,
    &--width-100 {
      width: 100% !important;
    }


  }

  .calendar__row--hero,
  .calendar__row--second {
    height: auto !important;
    min-height: 6.25vw;
  }
}
</style>