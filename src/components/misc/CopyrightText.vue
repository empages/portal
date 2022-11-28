<template>
  <span class="text-small">
    <span class="footer-text text-center">
      Apache License 2.0 | Copyright © {{ year }} <a
        href="https://georgi.karagogov.com/"
        target="_blank">Georgi Karagogov</a>. All rights reserved.
    </span>
  </span>
</template>

<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.text-small {
  font-size: 14px;
}

.footer-text {
  color: black;
}
</style>
