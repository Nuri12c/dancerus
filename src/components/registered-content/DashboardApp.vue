<template>
  <div class="dashboard">
    <AppSidebar :tabs="tabs" :activeTab="activeTab" @update:activeTab="activeTab = $event" />
    <div class="content">
      <ProfileTab v-if="activeTab === 'profile'" :amocrmData="amocrmData" />
      <CalendarTab v-if="activeTab === 'calendar'" />
      <ResidentcardTab v-if="activeTab === 'resident-card'" />
      <PresidentcardTab v-if="activeTab === 'president-card'"/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AppSidebar from "./AppSidebar.vue";
import ProfileTab from "./Tabs/ProfileTab.vue";
import CalendarTab from "./Tabs/CalendarTab.vue";
import ResidentcardTab from "./Tabs/ResidentcardTab.vue";
import PresidentcardTab from "./Tabs/PresidentcardTab.vue";
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
    CalendarTab,
    ResidentcardTab,
    PresidentcardTab
  },
  setup() {
    const authStore = useAuthStore();
    const activeTab = ref("profile");
    return { authStore, activeTab };
  },
  data() {
    return {
      tabs: [
        { id: "profile", name: "Профиль", icon: require('@/assets/images/sidebar-icons/profile.svg' )},
        { id: "calendar", name: "Календарь событий", icon: require('@/assets/images/sidebar-icons/calendar.svg' )},
        { id: "resident-card", name: "Карта резидента", icon: require('@/assets/images/sidebar-icons/resident.svg' )},
        { id: "president-card", name: "Карта президента", icon: require('@/assets/images/sidebar-icons/president.svg' )},
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
  background-color: #FCF5EB;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  overflow: hidden;
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