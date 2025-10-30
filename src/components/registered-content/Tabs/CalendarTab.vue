<template>
  <section class="tab-content">
    <h2>Календарь событий</h2>
    <div class="grid-row hero-row">
      <div class="block w-55 otbor" :style="{ backgroundImage: `url(${otbor})` }">
        <h1>2025</h1>
        <ul>
          <li><strong>8, 9 ноября</strong> — Астана</li>
          <li><strong>16 ноября</strong> — Москва</li>
          <li><strong>22 ноября</strong> — Новосибирск</li>
          <li><strong>30 ноября</strong> — Санкт-Петербург</li>
          <li><strong>6 декабря</strong> — Казань</li>
          <li><strong>14 декабря</strong> — Краснодар</li>
        </ul>
        <button>подать заявку</button>
      </div>
      <div
        class="block w-45 polufinal"
        :style="{ backgroundImage: `url(${polufinal})` ,backgroundPosition: 'right center'}"
      >
          <h1>2025</h1>
        <ul>
          <li><strong>8, 9 ноября</strong> — Астана</li>
          <li><strong>16 ноября</strong> — Москва</li>
          <li><strong>22 ноября</strong> — Новосибирск</li>
          <li><strong>30 ноября</strong> — Санкт-Петербург</li>
          <li><strong>6 декабря</strong> — Казань</li>
          <li><strong>14 декабря</strong> — Краснодар</li>
        </ul>
        <button>подать заявку</button>
      </div>
    </div>

    <!-- Ряд 2: 40% + 60% -->
    <div class="grid-row second-row">
      <div
        class="block w-45 fourfest"
        :style="{ backgroundImage: `url(${fourfest})` ,backgroundPosition: 'right center'}"
      >
          <h1>2025</h1>
        <ul>
          <li><strong>Май</strong></li>
        </ul>
        <button>подать заявку</button>
      </div>
      <div
        class="block w-55 konkurent"
        :style="{
          backgroundImage: `url(${konkurent})`,
          backgroundPosition: 'right center'
        }"
      >
         <h1>2025</h1>
        <ul>
          <li><strong>Май</strong></li>
        </ul>
        <button>подать заявку</button>
      </div>
    </div>

    <!-- Ряд 3: 100% -->
    <div class="grid-row second-row">
      <div
        class="block w-100 final"
        :style="{
          backgroundImage: `url(${final})`,
          backgroundPosition: 'right center'
        }"
      >
        <h1>2025</h1>
        <ul>
          <li><strong>Май</strong></li>
        </ul>
        <button>подать заявку</button>
      </div>
    </div>

    <!-- Ряд 4: 100% -->
    <div class="grid-row second-row">
      <div
        class="block w-100 final"
        :style="{
          backgroundImage: `url(${nasledie})`,
          backgroundPosition: 'right center',
        }"
      >
         <h1>2025</h1>
        <ul>
          <li><strong>Май</strong></li>
        </ul>
        <button>подать заявку</button>
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
.hero-row {
  height: 22.03vw;
}
.second-row {
  height: 12.4vw;
}

.tab-content {
  max-width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

h2 {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}

/* === Сетка === */
.grid-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.block {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  font-weight: 500;
  color: #444;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  background-size: cover;
  background-repeat: no-repeat;
}

.block:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* === Только width в % === */
.w-55 {
  width: 55%;
}
.w-45 {
  width: 45%;
}
.w-100 {
  width: 100%;
}

/* === Адаптивность === */
/* === Адаптивность === */
@media (max-width: 768px) {
  .grid-row {
    flex-direction: column;
    gap: 16px;
  }

  .w-55,
  .w-45,
  .w-100 {
    width: 100% !important; /* ← ПОЛНАЯ ШИРИНА */
  }

  /* Высота блоков — по содержимому, а не фиксированная */
  .hero-row,
  .second-row {
    height: auto !important;
    min-height: 120px; /* чтобы не было слишком мелко */
  }

  /* Сбрасываем позицию фона на мобильных — центр */
  .block {
    background-position: center !important;
  }
}
</style>