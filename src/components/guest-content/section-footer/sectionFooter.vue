<template>
  <footer class="footer">
    <div class="footer__content">
      <!-- ЛЕВАЯ КОЛОНКА -->
      <div class="footer__left">
        <div class="footer__socials">
          <a
            v-for="(item, index) in socialLinks"
            :key="index"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-icon"
          >
            <img :src="item.icon" :alt="item.title" />
          </a>
        </div>

        <a :href="`tel:${phoneNumber}`" class="footer__phone">{{
          phoneNumber
        }}</a>

        <a href="/privacy-policy" class="footer__privacy"
          >Политика конфиденциальности</a
        >
      </div>

      <!-- ПРАВАЯ КОЛОНКА -->
      <div class="footer__right">
        <div class="logo">
          <div class="icon"></div>
          <a class="logo__text">Танцуй, Россия</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
  data() {
    return {
      socialLinks: [
        {
          title: "ВКонтакте",
          icon: require("@/assets/images/vk.svg"),
          url: "https://vk.com/russia.dancekonkurs",
        },
        {
          title: "Макс",
          icon: require("@/assets/images/max.svg"),
          url: "https://max.ru/u/f9LHodD0cOIg_g7TqSfoB1__5xd40KnwFBQkmTdNxrGK4vj89PEh10BXkKk",
        },
        {
          title: "Телеграм",
          icon: require("@/assets/images/telegram.svg"),
          url: "https://t.me/tantsuytantsuy",
        },
      ],
      phoneNumber: "+7 916 (123) 45-67",
    };
  },
};
</script>

<style scoped lang="scss">
.footer {
  background-color: #000; /* тот же цвет, что у stats */
  padding: 4vw 10vw;
  color: #fff;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2vw;
    flex-wrap: wrap;
  }

  &__left {
    display: flex;
    flex-direction: column;
    gap: 1.5vw;
  }

  &__socials {
    display: flex;
    gap: 1vw;

    .footer__social-icon img {
      width: 3vw;
      height: 3vw;
      object-fit: contain;
    }
  }

  &__phone {
    font-family: "Oswald", sans-serif; /* Добавлен запасной шрифт */
    font-size: 1.2vw;
    color: #ffffff;
    text-decoration: none;
    text-decoration: underline;
  }

  &__privacy {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.5vw;
    text-decoration: underline;
  }

  &__right img {
    width: 8vw;
    height: auto;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.52vw;
  }
  .logo__text {
    font-family: "Oswald", sans-serif;
    font-weight: 400;
    font-size: 2vw;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
  }

  .icon {
    width: 4.01vw;
    height: 4.01vw;
    background-image: url("@/assets/Logo.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
  /* ───────── mobile ───────── */
  @media (max-width: 768px) {
    padding: 6vw 5vw;

    &__content {
      flex-direction: column;
      align-items: flex-start;
      gap: 4vw;
         align-items: center; /* центрируем весь контент */
    }
    &__left {
      display: flex;
      flex-direction: column;
      align-items: center; /* соцсети, телефон, политика по центру */
      gap: 1.5vw; /* оставлено твое значение */
    }

    &__phone {
      font-size: 4vw;
    }

    &__privacy {
      font-size: 3.5vw;
    }

    &__right img {
      width: 30vw;
    }
    .logo__text {
      font-size: 4vw;
    }

    .icon {
      width: 7.01vw;
      height: 7.01vw;
      background-image: url("@/assets/Logo.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
    .footer__social-icon img {
      width: 6vw;
      height: 6vw;
      object-fit: contain;
    }
  }
}
</style>
