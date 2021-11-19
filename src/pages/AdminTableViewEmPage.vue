<template>
  <EmAdminLayout>
    <EmPageTableView :page-route="route" />
  </EmAdminLayout>
</template>

<script lang="ts" setup>
import EmPageTableView from "@/components/em-pages/views/EmPageTableView.vue";
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
import {useEmPageArgs} from "@/composables/em-page-args-composable";

const { route } = useEmPageArgs();

</script>

<style scoped>

</style>
