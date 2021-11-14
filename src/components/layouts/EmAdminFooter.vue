<template>
  <footer class="footer">
    <div class="container-fluid clearfix d-flex">
      <CopyrightText class="me-auto ms-0" />
      <span class="text-muted me-0 ms-auto">
        <span>Version 1.0.0.0</span>
      </span>
    </div>
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import CopyrightText from "@/components/misc/CopyrightText.vue";

export default defineComponent({
  name: "EmAdminFooter",
  components: {CopyrightText},
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
