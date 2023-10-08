<template>
    <div
      class="px-4 top-0 h-full left-0 bg:red-400 flex flex-col sidebar items-center"
    >
      <img
        class="w-[140px]"
        src="https://cdn-edmbc.nitrocdn.com/cwhjsirvUYqaieilJZKJfDyTFhVLqZXs/assets/images/optimized/rev-a0ee7e7/book.io/wp-content/uploads/ct-logos/logo_da6731bea610a008565a9a32bbe2d671_2x.png"
      />
      <ul class="mt-10 w-full flex flex-col gap-1">
        <li class="link-item py-2 px-4 rounded-2xl text-left">
          <router-link class="w-full block" :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li class="link-item py-2 px-4 rounded-2xl text-left">
          <router-link class="w-full block" :to="{ name: 'wallet' }">Wallet</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  
  @Component
  export default class Sidebar extends Vue {
  }
  </script>

<style scoped>
.sidebar {
  position: fixed;
  width: var(--sidebar-width);
  background: var(--bg-color-primary);
}

.link-item {
  transition: all 0.5s;
}

.link-item:hover, .link-item:has(> .router-link-exact-active) {
    background: var(--bg-color);
    color: white;
  }
</style>
  