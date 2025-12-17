<template>
  <section class="team">
    <h2 class="team__title">Наша команда</h2>

    <div class="team__layout">
      <!-- ЛЕВЫЙ БОЛЬШОЙ БЛОК -->
      <div class="team__big-card">
        <div
          class="team__big-photo"
          :style="{ backgroundImage: `url(${ceo.bg})` }"
        ></div>

        <h3 class="team__big-name">{{ ceo.name }}</h3>
        <p class="team__big-role">{{ ceo.role }}</p>
      </div>

      <!-- ПРАВАЯ ЧАСТЬ -->
      <div class="team__right">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="team__card"
        >
          <div
            class="team__card-photo"
            :style="{ backgroundImage: `url(${member.bg})` }"
          ></div>

          <h3 class="team__card-name">{{ member.name }}</h3>
          <p class="team__card-role">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import photo1 from "@/assets/images/team/team-1.png";
import photo2 from "@/assets/images/team/team-2.png";
import photo3 from "@/assets/images/team/team-3.png";
import photo4 from "@/assets/images/team/team-4.png";
import photo5 from "@/assets/images/team/team-5.png";
import photo6 from "@/assets/images/team/team-6.png";
import photo7 from "@/assets/images/team/team-7.png";
import photo8 from "@/assets/images/team/team-8.png";
import photo9 from "@/assets/images/team/team-9.png";

export default {
  name: "TeamSection",
  data() {
    return {
      ceo: {
        bg: photo1,
        name: "Айдар Наилевич",
        role: "Генеральный директор",
      },
      teamMembers: [
        { bg: photo2, name: "Анна Александровна", role: "Исполнительный директор" },
        { bg: photo9, name: "Артур Шамилевич", role: "Отдел продаж" },
        { bg: photo4, name: "Адиля Ильнуровна", role: "Бронирование" },
        { bg: photo5, name: "Диана Вадимовна", role: "Снабжение" },
        { bg: photo7, name: "Дарья Александровна", role: "HR-директор" },
        { bg: photo8, name: "Игорь Андреевич", role: "Финансы" },
        { bg: photo6, name: "Дмитрий Сергеевич", role: "Маркетинг" },
        { bg: photo3, name: "Нурислам Булатович", role: "IT-директор" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.team {
  background-color: #fcf5eb;
  padding: 2vw 10vw;
}


/* ОСНОВНОЙ FLEX */
.team__layout {
  display: flex;
  gap: 3vw;
}

/* ЛЕВАЯ ЧАСТЬ */
.team__big-card {
  flex: 0 0 20%;
  text-align: center;

}

.team__big-photo {
  width: 100%;
  height: 14vw;
  margin: 0 auto 2vw;
  border-radius: 1.5vw;
  background-size: cover;
  background-position: center;
}

.team__big-name {
  font-size: 1.8vw;
  font-weight: 700;
}

.team__big-role {
  font-size: 1.3vw;
  color: #666;
}

/* ПРАВАЯ ЧАСТЬ */
.team__right {
  flex: 0 0 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;

}

/* КАРТОЧКА */
.team__card {
  width: calc(25% - 1.5vw); /* 4 в ряд */
  text-align: center;
}

.team__card-photo {
  width: 6vw;
  height: 6vw;
  margin: 0 auto 1vw;
  border-radius: 1vw;
  background-size: cover;
  background-position: center;
}

.team__card-name {
  font-size: 1.1vw;
  font-weight: 600;
}

.team__card-role {
  font-size: 0.95vw;
  color: #666;
}

/* MOBILE */
@media (max-width: 768px) {
  .team {
    padding: 5vw;
  }

  .team__layout {
    flex-direction: column;
  }

  .team__big-photo {
    width: 40vw;
    height: 40vw;
  }

  .team__right {
    gap: 5vw;
  }

  .team__card {
    width: calc(50% - 2.5vw); /* 2 в ряд */
  }

  .team__card-photo {
    width: 22vw;
    height: 22vw;
  }

  .team__big-name,
  .team__card-name {
    font-size: 4vw;
  }

  .team__big-role,
  .team__card-role {
    font-size: 3.5vw;
  }
}
</style>
