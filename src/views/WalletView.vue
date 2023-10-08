<template>
  <div class="wallet w-full h-full flex items-center justify-center">
    <p class="text-4xl font-semibold">Your wallet is empty for now.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class WalletView extends Vue {}
</script>
