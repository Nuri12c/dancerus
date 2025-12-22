<template>
  <section id="resident" class="resident">
    <h2 class="resident__title">Карта резидента “Танцуй, Россия!”</h2>
    <div class="resident__content">
      <!-- ===== ЛЕВАЯ КОЛОНКА ===== -->
      <div class="resident__left">
        <p class="resident__subtitle">
          Мы дарим эксклюзивные подарки и возможности каждому коллективу,
          который участвует в проектах от движения «Танцуй, Россия»!
        </p>
        <div class="resident__book">
          <img src="@/assets/images/p-resident-card/book-2.png" alt="Книга" />
          <img src="@/assets/images/p-resident-card/book.png" alt="Книга" />
        </div>

        <p class="resident__subtitle">
          Карта резидента уже доступна в вашем личном кабинете!
        </p>

        <button class="button-1 resident__button" @click.stop="handleCabinetClick">
          Личный кабинет
        </button>
      </div>

      <!-- ===== ПРАВАЯ КОЛОНКА ===== -->
      <div class="resident__right">
        <div class="resident__grid">
          <!-- 4 квадрата -->
          <div
            class="resident__card"
            v-for="(item, index) in cards"
            :key="index"
          >
            <div
              class="resident__card-image"
              :style="{ backgroundImage: `url(${item.bg})` }"
            ></div>

            <p class="resident__card-text">
              {{ item.text }}
            </p>
          </div>

          <!-- длинный блок -->
          <div class="resident__card resident__card--wide">
            <div
              class="resident__card-image"
              :style="{ backgroundImage: `url(${wideCard.bg})` }"
            ></div>

            <p class="resident__card-text">
              {{ wideCard.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/auth";
import photo1 from "@/assets/images/p-resident-card/p-res-2-3.jpg";
import photo2 from "@/assets/images/p-resident-card/res-2.jpg";
import photo3 from "@/assets/images/p-resident-card/res-4.jpg";
import photo4 from "@/assets/images/p-resident-card/res-5.jpg";
import photo5 from "@/assets/images/p-resident-card/res-6.jpg";

export default {
  name: "ResidentSection",
  computed: {
    ...mapStores(useAuthStore),
  },
  emits: ["open-auth-modal"],
  methods: {
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
    }, // Закрывает меню при клике на любой пункт (кроме WhatsApp и ЛК)
    closeMenuOnItemClick() {
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
        document.body.style.overflow = "";
      }
    },
  },
  data() {
    return {
      cards: [
        {
          text: "Видео-разбор номера от профессионального хореографа-постановщика",
          bg: photo1, // просто путь к картинке
        },
        {
          text: "Ежемесячная стипендия в размере на каждого участника в проектах «Танцуй, Россия»",
          bg: photo2,
        },
        {
          text: "Личный мастер-класс по вашему направлению от одного из лучших хореографов РФ",
          bg: photo3,
        },
        {
          text: "Фирменная футболка и шоппер  от нашего движения каждому ребёнку",
          bg: photo4,
        },
      ],

      wideCard: {
        text: "Постановочный номер от хореографа по направлению для группы",
        bg: photo5,
      },
    };
  },
};
</script>

<style scoped lang="scss">
/* === СЕКЦИЯ === */
.resident {
  position: relative;
  background-color: #000;
  padding: 4vw 10vw;
  overflow: hidden;

  /* SVG фон */
  &::before {
    content: "";
    position: absolute;
    top: 60%;
    left: -10vw;
    right: -10vw;
    transform: translateY(-50%);
    height: 70vw;

    background-image: url("@/assets/images/p-resident-card/line.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;

    z-index: 0;
  }
}

/* === ОСНОВНОЙ КОНТЕНТ === */
.resident__content {
  position: relative;
  z-index: 1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4vw;
}

/* === ЛЕВАЯ КОЛОНКА === */
.resident__left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1vw;
}

.resident__title {
  color: #fff;
}
.resident__subtitle {
  color: #fff;
  font-size: 1.4vw;
  line-height: 1.2;
  text-align: center;
}
.resident__book {
  display: flex;
  width: 70%;
}

.resident__book img {
  width: 70%;
  display: block;
}
.resident__book img {
  flex: 1;
  display: block;

  transform-origin: center;
}

.resident__book img:first-child {
  transform: scale(2) translateX(5%); /* увеличили сами картинки */
}
.resident__book img:last-child {
  transform: scale(1.4) translateY(-10%); /* увеличили сами картинки */
}
.resident__text {
  color: #fff;
  font-size: 1.1vw;
  line-height: 1.5;
}
.resident__button {
  align-self: center;
  padding: 0.8vw 2.2vw;
}
/* === ПРАВАЯ КОЛОНКА === */
.resident__right {
  display: flex;
  align-items: center;
}

/* === GRID КАРТОЧЕК === */
.resident__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2vw 4vw;
  width: 100%;
}

/* === КАРТОЧКИ === */
.resident__card {
  display: flex;
  flex-direction: column;
  gap: 0.1vw;
}

.resident__card-image {
  width: 100%;
  height: 9.25vw;
  aspect-ratio: 1 / 1;
  border-radius: 0.5vw;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.resident__card-text {
  color: #fff;
  font-size: 1vw;
}

/* === ДЛИННЫЙ БЛОК === */
.resident__card--wide {
  grid-column: span 2;

  .resident__card-image {
    aspect-ratio: 2 / 1;
  }
}

/* === АДАПТИВ === */
@media (max-width: 768px) {
  .resident {
    padding: 6vw 5vw;

    &::before {
      left: -25vw;
      right: -25vw;
      height: 60vw;
    }
  }

  .resident__content {
    grid-template-columns: 1fr;
    gap: 8vw;
  }

  .resident__title {
    font-size: 7vw;
  }

  .resident__subtitle {
  font-size: 4.2vw;
  line-height: 1.2;

}

  .resident__grid {
    gap: 4vw;
  }
  .resident__card-image {

    height: 22.65625vw;

  }
  .resident__card-text {
    font-size: 3.5vw;
  }
}
</style>
