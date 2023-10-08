<template>
  <div class="grid grid-cols-4 gap-4 p-8" v-if="!isLoading">
    <BookItem
      v-for="book in books"
      :key="book.id"
      :is-favorite-book="favoriteBook === book.id"
      @on-change-favorite="onChangeFavorite"
      :book="book"
      :list="false"
    />
  </div>
  <div class="flex h-full w-full items-center justify-center" v-else>
    <img src="@/assets/Book.gif" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getBooks, getFavoriteBook } from "@/services/books";
import BookItem from "@/components/BookItem.vue";
import { TBook } from "@/types/index";

@Component({
  components: {
    BookItem,
  },
})
export default class BookList extends Vue {
  books: TBook[] = [];
  favoriteBook = "";
  username = "";
  isLoading = true;

  async created() {
    this.getData();
  }

  async getData() {
    this.isLoading = true;
    this.books = (await getBooks()) as TBook[];
    this.username = localStorage.getItem("username") as string;
    if (this.username) {
      this.favoriteBook = await getFavoriteBook(this.username);
    }
    localStorage.setItem("favorite-book-id", this.favoriteBook);
    this.isLoading = false;
  }
  onChangeFavorite(bookId: string) {
    if (this.favoriteBook !== bookId) {
      this.favoriteBook = bookId;
    }
  }
}
</script>
