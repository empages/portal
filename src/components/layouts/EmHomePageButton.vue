<template>
  <div>
    <RouterLink
      :to="{ name: 'home' }"
      class="btn btn-primary btn-icon">
      <i class="mdi mdi-home" />
    </RouterLink>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmHomePageButton"
})
</script>

<style scoped>

</style>
