<template>
    <div class="dashboard w-full h-full">
      <BookList />
    </div>
  </template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BookList from "@/components/BookList.vue";

@Component({
  components: {
    BookList,
  },
})
export default class DashboardView extends Vue {
}
</script>