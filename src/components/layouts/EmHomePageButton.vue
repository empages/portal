<template>
  <div>
    <button
      class="btn btn-primary btn-icon"
      @click="redirectToHome">
      <i class="mdi mdi-home" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter();
function redirectToHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>

</style>
