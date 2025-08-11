<template class="group">
  <div class="group__container">
    <h2 class="group__title">Сообщество “Танцуй, Россия”</h2>
    <div class="group__cards">
      <div class="group__card group__card--left">
        <slot name="card-left"></slot>
      </div>
      <div class="group__cards-right">
        <div class="group__card group__card--right-top">
          <slot name="card-right-top"></slot>
        </div>
        <div class="group__card group__card--right-bottom">
          <slot name="card-right-bottom"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.group__container {
   padding: 20px 162px;
}
.group__cards {
  display: flex;
  gap: 20px;
}

.group__card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  min-height: 200px;
}

.group__cards-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
}

@media (max-width: 768px) {
  .group__cards {
    flex-direction: column;
  }

  .group__card {
    width: 100%;
  }

  .group__cards-right {
    width: 100%;
  }
}
</style>