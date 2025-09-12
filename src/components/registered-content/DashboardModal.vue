<template>
  <div class="dashboard">
    <AppSidebar :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
    <div class="content">
      <ProfileTab v-if="activeTab === 'profile'" :amocrmData="amocrmData" />
      <SettingsTab v-if="activeTab === 'settings'" />
      <NotificationsTab v-if="activeTab === 'notifications'" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AppSidebar from "./AppSidebar.vue";
import ProfileTab from "./ProfileTab.vue";
import SettingsTab from "./SettingsTab.vue";
import NotificationsTab from "./NotificationsTab.vue";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "DashboardModal",
  props: {
    amocrmData: {
      type: Object,
      default: null,
    },
  },
  components: {
    AppSidebar,
    ProfileTab,
    SettingsTab,
    NotificationsTab,
  },
  setup() {
    const authStore = useAuthStore();
    const activeTab = ref("profile");
    return { authStore, activeTab };
  },
  data() {
    return {
      tabs: [
        { id: "profile", name: "Профиль", icon: "fa-user" },
        { id: "settings", name: "Настройки", icon: "fa-cog" },
        { id: "notifications", name: "Уведомления", icon: "fa-bell" },
      ],
    };
  },
  mounted() {
    console.log("mounted: amocrmData=", this.amocrmData);
    console.log("mounted: token from authStore=", this.authStore.token);
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: black;
  color: wheat;
  box-sizing: border-box;
}

.content {
  flex-grow: 1;
  padding: 70px 40px 40px 40px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .content {
    padding-bottom: 80px; /* Space for bottom nav */
  }
}
</style>