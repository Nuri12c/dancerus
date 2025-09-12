<template>
  <div class="sidebar">
    <ul class="nav-tabs">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: activeTab === tab.id }"
        @click="$emit('update:activeTab', tab.id)"
      >
        <i :class="'fas ' + tab.icon"></i>
        <span class="tab-name">{{ tab.name }}</span>
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
  width: 250px;
  background-color: #1a1a1a;
  padding: 20px;
  height: 100%;
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
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  color: wheat;
}

.nav-tabs li i {
  margin-right: 10px;
  font-size: 18px;
}

.nav-tabs li:hover {
  background-color: #333;
}

.nav-tabs li.active {
  background-color: #444;
  border-left: 4px solid wheat;
  font-weight: bold;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    border-right: none;
    border-top: 1px solid #333;
    background-color: #1a1a1a;
    z-index: 1000;
  }

  .nav-tabs {
    display: flex;
    justify-content: space-around;
  }

  .nav-tabs li {
    flex: 1;
    text-align: center;
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }

  .nav-tabs li i {
    margin-right: 0;
    margin-bottom: 5px;
    font-size: 20px;
  }

  .nav-tabs li .tab-name {
    font-size: 12px;
  }

  .nav-tabs li.active {
    border-left: none;
    border-top: 4px solid wheat;
  }
}
</style>