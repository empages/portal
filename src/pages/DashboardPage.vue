<template>
  <div>
  </div>
</template>

<script lang="ts" setup>
import {useAdminLayout} from "@/composables/admin-layout-composable";

const adminLayout = useAdminLayout();
adminLayout.reload({
  navbarActions: []
})

</script>

<style scoped>

</style>
