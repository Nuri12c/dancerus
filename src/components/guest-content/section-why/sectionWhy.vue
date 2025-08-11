<template class="why">
  <div class="why__container">
    <h2 class="why__title">ПОЧЕМУ НАС ВЫБИРАЮТ?</h2>
    <div class="why__cards">
      <div class="why__card"><slot name="card-1"></slot></div>
      <div class="why__card"><slot name="card-2"></slot></div>
      <div class="why__card"><slot name="card-3"></slot></div>
      <div class="why__card"><slot name="card-4"></slot></div>
      <div class="why__card"><slot name="card-5"></slot></div>
      <div class="why__card"><slot name="card-6"></slot></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.why__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.why__title {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.why__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.why__card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  min-height: 150px;
}

@media (max-width: 768px) {
  .why__cards {
    grid-template-columns: 1fr;
  }
}
</style>