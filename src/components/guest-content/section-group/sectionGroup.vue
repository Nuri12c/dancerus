<template>
  <section class="group">
    <div class="group__layout">
      <!-- Левая большая карточка -->
      <div
        class="group__card-left"
        :style="{ backgroundImage: `url(${cards.left.bg})` }"
      >
        <div class="group__card-left-overlay">
          <h3 class="group__card-heading">{{ cards.left.title }}</h3>
          <p class="group__card-text">{{ cards.left.text }}</p>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="group__right">
        <!-- Заголовок секции -->
        <h2 class="group__title">{{ sectionTitle }}</h2>

        <div class="group__cards-right">
          <!-- Верхний ряд: 2 карточки горизонтально -->
          <div class="group__cards-row">
            <div
              v-for="(card, index) in cards.right.slice(0, 2)"
              :key="index"
              class="group__card-right"
            >
              <div
                class="group__card-img"
                :style="{ backgroundColor: card.bg }"
              ></div>
              <div class="group__card-content">
                <h3 class="group__card-heading">{{ card.title }}</h3>
                <p class="group__card-text">{{ card.text }}</p>
                <div v-if="card.button" class="group__card-button">
                  <button>{{ card.button }}</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Нижняя карточка на всю ширину -->
          <div class="group__card-right group__card-right-full">
            <div
              class="group__card-img"
              :style="{ backgroundColor: cards.right[2].bg }"
            ></div>
            <div class="group__card-content">
              <h3 class="group__card-heading">{{ cards.right[2].title }}</h3>
              <p class="group__card-text">{{ cards.right[2].text }}</p>
              <div v-if="cards.right[2].button" class="group__card-button">
                <button>{{ cards.right[2].button }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import leftImg from "@/assets/images/228.png";

export default {
  name: "GroupSection",
  data() {
    return {
      sectionTitle: "Сообщество “Танцуй, Россия”",
      cards: {
        left: {
          bg: leftImg,
          title: "ФОКУС ГРУППА",
          text:
            "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса.",
        },
        right: [
          {
            bg: "#c4b89a",
            title: "ЧАТ РУКОВОДИТЕЛЕЙ",
            text:
              "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса.",
            button: "Узнать подробнее",
          },
          {
            bg: "#c4b59a",
            title: "НОВОСТИ СОБЫТИЙ",
            text:
              "Выгодное в соотношении качества/цены, главное, что поддержка коллектива идет на каждом этапе конкурса.",
            button: "Подробнее",
          },
          {
            bg: "#c4b59a",
            title: "НОВАЯ КАРТОЧКА",
            text:
              "Описание для нижней карточки, занимает всю ширину правой колонки.",
            button: "Подробнее",
          },
        ],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.group {
  background-color: #fcf5eb;
  padding: 2vw 10vw;
}

.group__layout {
  display: flex;
  gap: 2vw;
}

/* Левая карточка 40% */
.group__card-left {
  flex: 0 0 40%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 1.3vw;
  position: relative;
  min-height: 35vw;
  display: flex;
  align-items: flex-end;
  padding: 2vw;
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.1);
  color: #fff;
}

.group__card-left-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1vw;
  border-radius: 0.8vw;
}

/* Правая колонка 60% */
.group__right {
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
}
.group__cards-right {
  display: flex;

  height: 100%;
  flex-direction: column;
  gap: 1.5vw;
}
.group__title {
  font-size: 2.5vw;
  font-weight: 700;
  margin-bottom: 1vw;
}

/* Верхний ряд карточек */
.group__cards-row {
  display: flex;
  gap: 1.5vw;
}

.group__card-right {
  flex: 1;
  display: flex;
  border-radius: 1vw;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: #ff7373;
}

.group__card-right:hover {
  transform: scale(1.02);
}

.group__card-right-full {
  width: 100%;
}

.group__card-img {
  width: 35%;
  background-size: cover;
  background-repeat: no-repeat;
}

.group__card-content {
  padding: 1.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.group__card-heading {
  font-weight: 600;
  margin-bottom: 0.5vw;
  font-size: 1.2vw;
}

.group__card-text {
  font-size: 1vw;
  margin-bottom: 1vw;
  line-height: 1.4;
}

.group__card-button button {
  background-color: #000;
  color: #fff;
  padding: 0.8vw 1.5vw;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;
  transition: 0.3s;
}

.group__card-button button:hover {
  background-color: #333;
}

/* Адаптив */
@media (max-width: 768px) {
  .group {
    padding: 5vw;
  }

  .group__layout {
    flex-direction: column;
  }

  .group__card-left {
    min-height: 60vw;
    padding: 4vw;
  }

  .group__title {
    font-size: 7vw;
    margin-bottom: 3vw;
  }

  .group__cards-row {
    flex-direction: column;
    gap: 4vw;
  }

  .group__card-right,
  .group__card-right-full {
    flex-direction: row;
  }

  .group__card-img {
    width: 30%;
  }

  .group__card-content {
    padding: 2vw;
  }

  .group__card-heading {
    font-size: 4vw;
  }

  .group__card-text {
    font-size: 3.5vw;
  }

  .group__card-button button {
    padding: 2vw 3vw;
    font-size: 4vw;
  }
}
</style>
