<template>
  <div class="dashboard">
    <AppSidebar
      :tabs="tabs"
      :active-tab="activeTab"
      @update:active-tab="activeTab = $event"
    />

    <!-- Основной контент с динамическим фоном -->
    <div class="content" :class="contentClass">
      <ProfileTab v-if="activeTab === 'profile'" />
      <CalendarTab v-if="activeTab === 'calendar'" />
      <ResidentcardTab v-if="activeTab === 'resident-card'" />
      <PresidentcardTab v-if="activeTab === 'president-card'" />
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

import AppSidebar from './AppSidebar.vue'
import ProfileTab from './Tabs/ProfileTab.vue'
import CalendarTab from './Tabs/CalendarTab.vue'
import ResidentcardTab from './Tabs/ResidentcardTab.vue'
import PresidentcardTab from './Tabs/PresidentcardTab.vue'

export default {
  components: {
    AppSidebar,
    ProfileTab,
    CalendarTab,
    ResidentcardTab,
    PresidentcardTab,
  },

  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },

  data() {
    return {
      activeTab: 'profile',
      tabs: [
        { id: 'profile', name: 'Профиль', icon: require('@/assets/images/sidebar-icons/profile.svg') },
        { id: 'calendar', name: 'Календарь событий', icon: require('@/assets/images/sidebar-icons/calendar.svg') },
        { id: 'resident-card', name: 'Карта резидента', icon: require('@/assets/images/sidebar-icons/resident.svg') },
        { id: 'president-card', name: 'Карта президента', icon: require('@/assets/images/sidebar-icons/president.svg') },
      ],
    }
  },

  computed: {
    residentLevel() {
      return this.authStore.residentLevel
    },
    presidentLevel() {
      return this.authStore.presidentLevel
    },

    contentClass() {
      if (this.activeTab === 'president-card') return 'president-mode'
      if (this.activeTab === 'resident-card') return 'resident-bg'
      return ''
    },
  },
}
</script>
<style scoped>
.dashboard {
  display: flex;
  width: 100%;
 height: 100dvh; /* современный стандарт */
  background-color: #fcf5eb;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 70px 40px 40px 40px;
  overflow-y: auto;
  background-color: #fcf5eb;
  position: relative;
  transition: background-color 0.4s ease, background-image 0.5s ease-in-out;
}

/* === Карта резидента — фоновая картинка === */
.content.resident-bg {
  background-image: url("@/assets/images/cabinet/resident-bg.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
}

/* === Карта президента — чёрный фон + РАМКИ КАК ФОН === */
.content.president-mode {
  background-color: #000;
  color: white;
  padding: 70px 40px 40px 40px; /* Padding остаётся */
}

/* РАМКА СВЕРХУ (как фон под контентом) */
.content.president-mode::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10vw;
  right: 0;
  height: 30vw; /* Высота рамки */
  background-image: url("@/assets/images/cabinet/prezident-frame1.svg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
  pointer-events: none;
  animation: slideDown 0.7s ease-out;
}

/* РАМКА СНИЗУ (как фон под контентом) */
.content.president-mode::after {
  content: "";
  position: absolute;
  bottom: 0; /* прижимаем к низу */
  left: -2vw; /* прижимаем к левому краю */
  width: 20vw; /* ширина рамки (подгони под свой SVG) */
  height: 10vw; /* высота рамки */
  background-image: url("@/assets/images/cabinet/prezident-frame2.svg");
  background-size: contain; /* НЕ растягиваем – показываем в оригинальном размере */
  background-repeat: no-repeat;
  background-position: left bottom; /* левый‑нижний угол блока */
  z-index: 1;
  pointer-events: none;
  animation: slideUp 0.7s ease-out;
}

/* Контент всегда поверх рамок */
.content > * {
  position: relative;
  z-index: 2;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* === Мобильная адаптация === */
@media (max-width: 768px) {
  .content {
    padding-top: 20vw;
    padding-left: 6.07vw;
    padding-right: 6.07vw;
    padding-bottom: 100px;
    overflow-x: hidden;  /* Обрезает справа и слева */
  }

  .content.resident-bg {
    background-attachment: scroll;
  }

  /* Меньшая высота рамок на мобилке */
  .content.president-mode::before,
  .content.president-mode::after {
    height: 50px;
  }
  /* РАМКА СВЕРХУ (как фон под контентом) */
  .content.president-mode::before {
    left: -10vw;
    height: 60%; /* Высота рамки */
  }
  /* РАМКА СНИЗУ (как фон под контентом) */
  .content.president-mode::after {
    content: "";
    position: absolute;
    bottom: 2vw; /* прижимаем к низу */
    left: -4vw; /* прижимаем к левому краю */
    width: 120vw; /* ширина рамки (подгони под свой SVG) */
    height: 60%; /* высота рамки */

  }
}
</style>