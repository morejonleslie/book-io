<template>
  <nav class="px-8 flex items-center navbar">
    <button class="bg-white py-2 px-4 rounded-xl ml-auto" @click="onLogout">
      Log out
    </button>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  onLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("favorite-book-id");
    this.$router.push({ name: "login" });
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: calc(100vw - var(--sidebar-width));
  left: var(--sidebar-width);
  height: 60px;
  background: var(--bg-color-light);
}
</style>
