<template>
  <footer class="footer">
    <div class="container-fluid clearfix d-flex">
      <CopyrightText class="me-auto ms-0" />
      <span class="text-muted me-0 ms-auto">
        <span><RouterLink :to="{ name: 'terms' }">Terms</RouterLink> <span class="mx-2" />
        </span>
      </span>
    </div>
  </footer>
</template>

<script lang="ts" setup>

import CopyrightText from "@/components/misc/CopyrightText.vue";
</script>

<style scoped>

</style>
