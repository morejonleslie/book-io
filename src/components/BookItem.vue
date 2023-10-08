<template>
  <div
    class="flex flex-col bg-white rounded-2xl p-4 gap-1 items-start book-container"
    v-if="list === false"
  >
    <img :src="cover_url" class="rounded-2xl mb-4" />
    <p
      :class="{ 'favorite-tag': isFavoriteBook }"
      @click="setFavoriteBook"
      class="text-white text-base font-semibold py-1 px-6 rounded-xl bg-gray-300 cursor-pointer"
    >
      Favorite
    </p>
    <p class="text-3xl font-bold text-left">{{ title }}</p>
    <p class="text-2xl font-semibold text-gray-500 text-left">{{ author }}</p>
    <p class="text-base font-medium text-left">{{ description }}</p>
  </div>
  <div
    :class="{ active: isBookActive }"
    class="fav-book flex gap-4 rounded-2xl border p-4 cursor-pointer"
    v-else
    @click="onSelectBook"
  >
    <img :src="cover_url" class="rounded-2xl w-[120px]" />
    <div class="flex flex-col">
      <p class="text-xl font-bold text-left">{{ title }}</p>
      <p class="text-base font-semibold text-gray-500 text-left">
        {{ author }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setFavoriteBook } from "@/services/books";
import { TBook } from "@/types/index";

@Component
export default class FavoriteBook extends Vue {
  @Prop() book!: TBook;
  @Prop() list!: boolean;
  @Prop() isFavoriteBook!: boolean;
  @Prop() isBookActive!: boolean;

  get title() {
    return this.book.title;
  }

  get description() {
    return this.book.description;
  }

  get cover_url() {
    return this.book.cover_url;
  }

  get author() {
    return this.book.author;
  }

  get id() {
    return this.book.id;
  }

  onSelectBook() {
    this.$emit("on-change-favorite", this.id);
  }
  async setFavoriteBook() {
    const username = localStorage.getItem("username");
    if (username) {
      await setFavoriteBook(username, this.id);
      this.$emit("on-change-favorite", this.id);
    }
  }
}
</script>

<style scoped>
.favorite-tag {
  background: var(--pink-primary);
}
.book-container {
  box-shadow: 0px 0px 8px 1px #333;
}
.fav-book {
  border-color: var(--pink-primary);
}

.fav-book:hover,
.fav-book.active {
  background: var(--bg-color-primary);
}
</style>
