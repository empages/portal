<template>
  <EmPageTableView :page-route="route" />
</template>

<script lang="ts" setup>
import EmPageTableView from "@/components/em-pages/views/EmPageTableView.vue";
import {useEmPageArgs} from "@/composables/em-page-args-composable";

const { route } = useEmPageArgs();

</script>

<style scoped>

</style>
