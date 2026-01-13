<template>
  <header class="header" :class="{ fixed: isFixed }">
    <!-- Гость: полный хедер -->
    <div v-if="!authStore.isOpenCabinet" class="logo">
      <div class="icon"></div>
      <a href="#hero" class="logo__text">Танцуй, Россия</a>
    </div>

    <!-- Гость: меню -->
    <template v-if="!authStore.isOpenCabinet">
      <!-- Бургер-кнопка -->
      <button
        class="burger"
        :class="{ active: isMenuOpen }"
        @click.stop="toggleMenu"
        aria-label="Открыть меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Меню (один @click на весь блок — магия закрытия) -->
      <div
        class="buttons"
        :class="{ open: isMenuOpen }"
        @click="closeMenuOnItemClick"
      >
        <a href="#contests" class="button-3">Наши конкурсы </a>
        <a href="#reviews" class="button-3">Отзывы </a>
        <a href="#jury" class="button-3">Жюри </a>
        <a href="#resident" class="button-3">Карта резидента </a>
        <a href="#sponsor" class="button-3">Наш спонсор </a>
        <a class="button-3" @click="openPhoneModal">Подать заявку</a>


          <div class="social-icons">
            <button
              class="tg-button"
              @click.stop="openTG"
              title="Написать в Telegram"
            ></button>
            <button
              class="max-button"
              @click.stop="openMax"
              title="Написать в Max"
            ></button>
          </div>
          <a href="tel:+79161234567" class="phone-number">+79161234567</a>

        <button class="button-2" @click.stop="handleCabinetClick">
          Личный кабинет
        </button>
      </div>
    </template>

    <!-- Личный кабинет: упрощённый хедер -->
    <div v-if="authStore.isOpenCabinet" class="dashboard-header">
      <div class="logo-icon">
        <div class="icon"></div>
      </div>
      <div class="dashboard-container">
        <button class="back-to-site" @click.stop="handleCabinetClick">
          ← На сайт
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
  emits: ["open-auth-modal"],

  computed: {
    ...mapStores(useAuthStore),
  },

  data() {
    return {
      isFixed: false,
      isMenuOpen: false,
    };
  },

  methods: {
    openPhoneModal() {
      this.authStore.openPhoneModal()
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      document.body.style.overflow = this.isMenuOpen ? "hidden" : "";
    },

    // Закрывает меню при клике на любой пункт (кроме WhatsApp и ЛК)
    closeMenuOnItemClick() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = "";
      }
    },

    handleCabinetClick() {
      this.closeMenuOnItemClick(); // закрываем меню
      if (this.authStore.token && this.authStore.isOpenCabinet === false) {
        this.authStore.openCabinet();
        console.log("open cabinet");
      } else if (
        this.authStore.token &&
        this.authStore.isOpenCabinet === true
      ) {
        this.authStore.closeCabinet();
        console.log("close cabinet");
      } else {
        this.$emit("open-auth-modal");
      }
    },
    openTG() {
      this.closeMenuOnItemClick(); // тоже закрываем
      window.open("https://t.me/tantsuytantsuy", "_blank");
    },
    openMax() {
      this.closeMenuOnItemClick(); // тоже закрываем
      window.open(
        "https://max.ru/u/f9LHodD0cOIg_g7TqSfoB1__5xd40KnwFBQkmTdNxrGK4vj89PEh10BXkKk",
        "_blank"
      );
    },

    handleScroll() {
      this.isFixed = window.scrollY > 40;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.body.style.overflow = "";
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/mixins.scss";

.header {
  position: fixed;
  top: 1.6vw;
  left: 0;
  width: 100%;
  background-color: #ffffff00;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 2.45vw;
  box-sizing: border-box;
  height: 4.06vw;
  transition: top 0.3s ease;
  z-index: 10;
}

.header.fixed {
  top: 0;
  height: 4.69vw;
  background-color: #262626cc;
  backdrop-filter: blur(10px);
  border-radius: 0 0 10px 10px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.52vw;
}
.logo__text {
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  font-size: 1.6vw;
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
}

.icon {
  width: 3.01vw;
  height: 3.01vw;
  background-image: url("@/assets/Logo.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vw;
}

.social-icons {
  display: flex;
  gap: 1vw; /* расстояние между иконками */
}

.tg-button {
  background: url("@/assets/images/telegram.svg");
}
.max-button {
  background: url("@/assets/images/max.svg");
}
.watsapp-button,
.tg-button,
.max-button {
  width: 2vw;  /* уменьшили размер */
  height: 2vw;
  background-size: contain;
  border: none;
  background-repeat: no-repeat;
}

.phone-number {
  font-family: 'Oswald', sans-serif; /* Добавлен запасной шрифт */
  font-size: 1.2vw;
  color: #ffffff;
  text-decoration: none;
  text-decoration: underline;
}
.burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 7.46vw;
  height: 5.97vw;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2; /* Выше меню */
}

.burger span {
  width: 100%;
  height: 1.49vw;
  background-color: #fcf5eb;
  border-radius: 2px; /* Мягкие края */
  transition: all 0.3s ease;
}

.burger.active span:nth-child(1) {
  transform: rotate(45deg) translate(3vw, 0);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(3vw, 0);
}

/* -------------------------------------------------
   1. Кнопка «На сайт» (замена кнопки «Выйти»)
   ------------------------------------------------- */
.dashboard-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center; /* ← ЭТА СТРОКА ЦЕНТРИРУЕТ ВСЁ ПО ВЫСОТЕ */
  height: 60px;
  padding: 0 3vw;
}

.dashboard-container {
  margin-left: auto; /* ← прижимает к правому краю */
  display: flex;
  align-items: center; /* ← центрирует кнопки внутри по высоте */
  gap: 2.5vw; /* ← расстояние между WhatsApp и кнопкой */
  height: 100%; /* ← можно убрать, не нужно */
}
.back-to-site {
  padding: 0.9375vw 1.25vw; /* 18px и 24px при 1920px */
  background-color: #27272797;
  border: 0.15vw solid white; /* 2px при 1920px */
  color: white;
  border-radius: 0.52vw; /* 10px при 1920px */
  font-family: "Oswald", sans-serif;
  font-weight: 200;
  font-size: 1.25vw; /* 32px при 1920px */
  text-transform: uppercase;
  cursor: pointer;

}

.back-to-site:hover {

  transform: translateY(-0.1vw);
}


/* -------------------------------------------------
   2. Адаптив для кнопки «На сайт» (моб.)
   ------------------------------------------------- */

@media (max-width: 768px) {
  .header {
    top: 5.95vw;
    padding: 3.22vw 5.22vw;
    height: 2.22vw;
    flex-wrap: nowrap;
  }

  .header.fixed {
    height: 6.39vw;
    padding: 6.22vw 5.22vw;
  }

  .icon {
    width: 10.97vw;
    height: 10.97vw;
  }

  .logo__text {
    font-size: 4.98vw;

  }

  .buttons {
    display: none;
  }

  .buttons.open {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4.98vw;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh; /* Полный экран */
    background-color: #262626f5; /* Полупрозрачный фон */
    backdrop-filter: blur(10px); /* Размытие всегда */
    padding: 24.88vw 4.98vw;
    box-sizing: border-box;
    z-index: 1; /* Ниже бургера */
  }

  .burger {
    display: flex;
  }

  .back-to-site {
    padding: 1.48vw 2.48vw; /* 18px при 402px */
    color: #ffffff;
    height: auto;
    font-size: 3.97vw; /* 24px при 402px */
  }
  .watsapp-button {
    width: 8.92vw;
    height: 8.92vw;
    background-size: contain;
    border: none;
    background-repeat: no-repeat;
  }
  .tg-button {
    width: 8.92vw;
    height: 8.92vw;
    background-size: contain;
    border: none;
    background-repeat: no-repeat;
  }
  .max-button {
    width: 8.92vw;
    height: 8.92vw;
    background-size: contain;
    border: none;
    background-repeat: no-repeat;
  }
  .phone-number {
  font-size: 3.98vw;
}
}
</style>