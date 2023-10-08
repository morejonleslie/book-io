<template>
  <div class="login w-full h-full flex items-center justify-center">
    <LoginForm :isLogin="false" />
  </div>
</template>

<style scoped>
.login {
  background: var(--bg-color-primary);
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "@/components/LoginForm.vue";

@Component({
  components: {
    LoginForm,
  },
})
export default class RegisterView extends Vue {}
</script>
