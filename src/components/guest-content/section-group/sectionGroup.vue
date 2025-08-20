<template >
  <section class="group">
    <h2 class="group__title">Сообщество “Танцуй, Россия”</h2>
    <div class="group__cards">
      <div class="group__card group__card-left">
        <slot name="card-left"></slot>
      </div>
      <div class="group__cards-right">
        <div class="group__card group__card--right-top">
          <slot name="card-right-top">
            <h3 class="group__card-heading">ФОКУС ГРУППА</h3>
            <p class="group__card-p">
              Выгодное в соотношении качества/цены, главное, что поддержка
              коллектива идет на каждом этапе конкурса, все понятно доносят,
              условия проживания комфортные, команада “Танцуй, Россия” очень
              отзычивая.
            </p>
            <div class="contest__button">
            <button class="contest__button-element">Узнать подробнее</button>
            <span class="contest__button-icon"></span>
          </div>
          </slot>
        </div>
        <div class="group__card group__card--right-bottom">
          <slot name="card-right-bottom">
             <h3 class="group__card-heading">ЧАТ РУКОВОДИТЕЛЕЙ</h3>
            <p class="group__card-p">
              Выгодное в соотношении качества/цены, главное, что поддержка
              коллектива идет на каждом этапе конкурса, все понятно доносят,
              условия проживания комфортные, команада “Танцуй, Россия” очень
              отзычивая.
            </p>
            <div class="contest__button">
            <button class="contest__button-element">Узнать подробнее</button>
            <span class="contest__button-icon"></span>
          </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
</style>