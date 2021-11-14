<template>
  <EmAdminLayout>
    <h1>Dashboard</h1>
  </EmAdminLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
export default defineComponent({
name: "AdminDashboardPage",
  components: {EmAdminLayout}
})
</script>

<style scoped>

</style>
