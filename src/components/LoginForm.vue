<template>
  <div
    class="bg-white p-8 rounded-2xl flex flex-col min-w-[600px] items-start gap-6"
    v-if="!showFavoriteSection"
  >
    <p class="text-2xl font-bold uppercase">
      {{ isLogin ? "login" : "sign up" }}
    </p>
    <form class="flex flex-col gap-6 w-full" action="">
      <input
        v-model="form.username"
        class="input w-full"
        type="text"
        placeholder="Username"
      />
      <input
        v-model="form.password"
        class="input w-full"
        type="password"
        placeholder="Password"
      />
      <p class="text-base font-medium text-left text-rose-800" v-if="showError">
        Check your credentials and try again
      </p>
      <button
        class="primary-btn font-semibold uppercase text-white rounded-xl py-2 px-6"
        :disabled="isDisabled"
        @click="onSubmitForm"
      >
        {{ isLogin ? "login" : "sign up" }}
      </button>
    </form>
    <p>
      Not an user yet?
      <router-link
        :to="{ name: isLogin ? 'register' : 'login' }"
        class="uppercase font-semibold"
        >{{ !isLogin ? "login" : "sign up" }}</router-link
      >
    </p>
  </div>
  <div
    class="bg-white py-8 rounded-2xl flex flex-col max-h-3/4 overflow-hidden h-3/4 min-w-[600px] gap-6"
    v-else
  >
    <FavoriteBook :username="form.username" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { TUser, TBook } from "@/types/index";

import FavoriteBook from "@/components/FavoriteBook.vue";

import { signUp, signIn } from "@/services/auth";
import { getBooks } from "@/services/books";

@Component({
  components: {
    FavoriteBook,
  },
})
export default class LoginForm extends Vue {
  @Prop() isLogin!: boolean;
  form: TUser = { username: "", password: "" };
  books: TBook[] = [];
  showFavoriteSection = false;
  showError = false;

  get isDisabled() {
    return this.form.username === "" || this.form.password === "";
  }

  async onSubmitForm(e: Event) {
    e.preventDefault();
    const user: TUser = {
      username: this.form.username,
      password: this.form.password,
    };
    if (this.isLogin) {
      const response = await signIn(user);
      if (response === "success") {
        localStorage.setItem("username", this.form.username);
        this.$router.push({
          name: "dashboard",
          params: { username: this.form.username },
        });
      } else {
        this.showError = true;
      }
    } else {
      const response = await signUp(user);
      if (response === "success") {
        localStorage.setItem("username", this.form.username);
        this.books = await getBooks();
        this.showFavoriteSection = true;
      } else {
        this.showError = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.primary-btn {
  background: var(--pink-primary);
  transition: opacity 0.4s;
}
.primary-btn:hover {
  opacity: 0.75;
}
.primary-btn:disabled {
  background: var(--bg-color-primary);
}
.input {
  border: 1px solid var(--bg-color);
  height: 50px;
  background: #fff;
  padding-left: 8px;
  border-radius: 10px;
}
</style>
