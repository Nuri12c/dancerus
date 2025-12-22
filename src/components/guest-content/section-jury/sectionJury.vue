<template>
  <section id="jury" class="jury">
    <h2 class="jury__title">Сильнейший состав жюри</h2>

    <div class="jury__layout">
      <div
        v-for="(member, index) in juryMembers"
        :key="index"
        class="jury__card"
      >
        <div
          class="jury__card-photo"
          :style="{ backgroundImage: `url(${member.bg})` }"
        ></div>

        <h3 class="jury__card-name">{{ member.name }}</h3>
      </div>
    </div>
  </section>
</template>

<script>
import photo1 from "@/assets/images/section-jury/jury1.png";
import photo2 from "@/assets/images/section-jury/jury2.png";
import photo3 from "@/assets/images/section-jury/jury3.png";
import photo4 from "@/assets/images/section-jury/jury4.png";
import photo5 from "@/assets/images/section-jury/jury5.png";
import photo6 from "@/assets/images/section-jury/jury6.png";

export default {
  name: "JurySection",
  data() {
    return {
      juryMembers: [
        { bg: photo1, name: "Егор Дружинин"},
        { bg: photo2, name: "Елена Барткайтис" },
        { bg: photo3, name: "Ашот Назаретян" },
        { bg: photo4, name: "Герман Ромазанов" },
        { bg: photo5, name: "Юрий Деревягин" },
        { bg: photo6, name: "Алексей Кузьменко" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.jury {
  background-color: #fcf5eb;
  padding: 2vw 10vw;

  &__title {
    margin-bottom: 2vw;
  }

  &__layout {
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    justify-content: center;
  }

  &__card {
    width: calc(16.66% - 1vw); /* 6 в ряд */
    text-align: center;
    margin-bottom: 2vw;
  }

  &__card-photo {
    width: 8vw;
    height: 8vw;
    margin: 0 auto 1vw;
    border-radius: 1vw;
    background-size: cover;
    background-position: center;
  }

  &__card-name {
    font-size: 1.1vw;
    font-weight: 600;
  }

  &__card-role {
    font-size: 0.95vw;
    color: #666;
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .jury {
    padding: 5vw;

    &__card {
      width: calc(50% - 2.5vw); /* 2 в ряд */
    }

    &__card-photo {
      width: 22vw;
      height: 22vw;
    }

    &__card-name {
      font-size: 4vw;
    }

    &__card-role {
      font-size: 3.5vw;
    }
    &__title {
    margin-bottom:8vw;
  }
  }
}
</style>
