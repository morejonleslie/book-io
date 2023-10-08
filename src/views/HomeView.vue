<template>
  <div class="home w-full h-full">
    <Navbar />
    <Sidebar />
    <div class="content w-full h-full">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

@Component({
  components: {
    Sidebar,
    Navbar,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped>
.content {
  background: var(--bg-color-secondary);
  position: relative;
  width: calc(100vw - var(--sidebar-width));
  left: var(--sidebar-width);
  height: calc(100vh - var(--navbar-height));
  top: var(--navbar-height);
  overflow-y: auto;
}
</style>
