<template>
  <span class="text-muted text-small">
    <span class="footer-text text-center">
      Copyright © {{ year }} <a
        href="https://definux.io/"
        target="_blank">Definux</a>. All rights reserved.
    </span>
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CopyrightText",
  setup() {
    const year = new Date().getFullYear();
    return {
      year
    }
  }
})
</script>

<style scoped>

</style>
