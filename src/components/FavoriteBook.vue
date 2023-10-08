<template>
  <div class="flex flex-col gap-8 min-w-[620px]">
    <p class="text-xl font-semibold mb-5">
      Almost there! We just need you to select your favorite book
    </p>
    <div class="w-full px-8">
      <input
        class="input w-full"
        type="text"
        placeholder="Search by book name"
        @input="onInput"
      />
    </div>
    <div class="flex flex-col h-[570px] overflow-y-auto gap-4 px-8">
      <BookItem
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
        :list="true"
        :is-book-active="activeBookId === book.id"
        @on-change-favorite="onChangeFavorite"
      />
    </div>

    <button
      class="primary-btn font-semibold uppercase text-white rounded-xl py-2 px-6 mx-8"
      :disabled="isDisabled"
      @click="onSubmitFavoriteBook"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getBooks, setFavoriteBook } from "@/services/books";
import BookItem from "@/components/BookItem.vue";
import { TBook } from "@/types/index";

@Component({
  components: {
    BookItem
  }
})

export default class FavoriteBook extends Vue {
  @Prop() username!: string;
  books: TBook[] = [];
  searchStr = '';
  activeBookId = '';

  get isDisabled() {
    return this.activeBookId === '';
  }

  get filteredBooks(): TBook[] | [] {
    if (this.searchStr === "") {
      return this.books;
    }
    return this.books.filter((book: TBook) => {
      return book.title.toLowerCase().includes(this.searchStr.toLowerCase());
    });
  }

  async created() {
    this.books = (await getBooks()) as TBook[];
  }

  onInput(event :any) {
    this.searchStr = event.target.value;
  }
  async onSubmitFavoriteBook() {
    const response = await setFavoriteBook(this.username, this.activeBookId);
    if (response === "success") {
      this.$router.push({
        name: "dashboard",
        params: { username: this.username },
      });
    }
  }

  onChangeFavorite(bookId: string) {
    if (this.activeBookId !== bookId) {
      this.activeBookId = bookId;
    }
  }
}
</script>
