<template>
  <div class="sidebar">
    <ul class="nav-tabs">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="$emit('update:activeTab', tab.id)"
      >
        <img class="tab-icon" :src="tab.icon" alt="">
        <p class="tab-name">{{ tab.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 22.55vw ;
  min-width: 22.55vw;            /* ← ДОБАВЬ */
  flex-shrink: 0;
  background-color: #8C66AD;
  padding-top: 9.90vw;
  height: 100vh;
  border-right: 1px solid #333;
}

.nav-tabs {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-tabs li {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: wheat;
  padding:  0 0 0 3.33vw;
  position: relative;
  transition: color 0.3s ease;
}

.nav-tabs li:hover,
.nav-tabs li.active {
  color: white;
}

/* Подчёркивание при наведении и активности */
.nav-tabs li::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 3.13vw;
  right: 3.13vw;
  height: 1px;
  background-color: white;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-tabs li:hover::after,
.nav-tabs li.active::after {
  transform: scaleX(1);
}

.tab-icon {
  width: 2.08vw;
  margin-right: 0.52vw;
  flex-shrink: 0;
}

.tab-name {
  font-weight: 400;
}

/* === Мобильная версия === */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: 15.417vw;
    position: fixed;
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: 1px solid #333;
    background-color: #1a1a1a;
    z-index: 5;
    padding: 0;
  }

  .nav-tabs {
    display: flex;
    justify-content: space-around;
  }

  .nav-tabs li {
    flex: 1;
    flex-direction: column;
    text-align: center;
    padding-top: 0.66vw;
  }

  .nav-tabs li::after {
    left: 5.302vw;
    right: 2.302vw;
    bottom: 0.521vw;
  }

  .tab-icon {
    width: 8.125vw;
    height: 8.125vw;
    margin-right: 0;
    margin-bottom: 0;
  }

  .tab-name {
    font-size: 1.563vw;
    line-height: 0;
    padding-bottom: 0.8vw;
  }
}
</style>