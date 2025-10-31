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
          <li class="event-card__date"></li>
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

      <div
        class="event-card event-card--width-45 event-card--polufinal"
        :style="{
          backgroundImage: `url(${polufinal})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading white">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date">
            <strong>8, 9 ноября</strong> — Астана
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
        <h1 class="event-card__heading white">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date"><strong>Май</strong></li>
        </ul>
        <button class="event-card__button">подать заявку</button>
      </div>

      <div
        class="event-card event-card--width-55 event-card--konkurent"
        :style="{
          backgroundImage: `url(${konkurent})`,
          backgroundPosition: 'right center',
        }"
      >
        <h1 class="event-card__heading event-card__heading--white">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date"><strong>Май</strong></li>
        </ul>
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
        <h1 class="event-card__heading white">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date"><strong>Май</strong></li>
        </ul>
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
        <h1 class="event-card__heading">2025</h1>
        <ul class="event-card__dates">
          <li class="event-card__date"><strong>Май</strong></li>
        </ul>
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
  padding: 20px;
  box-sizing: border-box;
}

.calendar__title {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}

/* === Ряды === */
.calendar__row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

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
  padding: 20px 40px 20px 40px;
  font-weight: 500;
  color: #444;
  transition: all 0.2s ease;
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
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
    margin: 0 0 16px;
    font-size: 48px;
    font-weight: medium;
  }

  &__dates {
    font-family: "Inter", sans-serif;
    padding-left: 15px;
    margin: 0 0 20px;
    font-size: 18px;
  }

  &__date {
    margin-bottom: 6px;
    color: inherit;

    strong {
      font-weight: 600;
    }
  }

  &__button {
    width: 12.60416667vw;
    height: 3.4375vw;

    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
    background: rgb(255, 255, 255);
    border: 2px solid white;
    color: #1B514B;
    font-size: 1.56vw;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;

    &:hover {
      background: white;
      color: #000;
    }
  }
}

/* === Адаптивность === */
@media (max-width: 768px) {
  .calendar__row {
    flex-direction: column;
    gap: 16px;
  }

  .event-card {
    &--width-55,
    &--width-45,
    &--width-100 {
      width: 100% !important;
    }

    background-position: center !important;
  }

  .calendar__row--hero,
  .calendar__row--second {
    height: auto !important;
    min-height: 120px;
  }
}
</style>