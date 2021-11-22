<template>
  <EmPageIndexView :page-route="route" />
</template>

<script lang="ts" setup>
import {useEmPageArgs} from "@/composables/em-page-args-composable";
import EmPageIndexView from "@/components/em-pages/views/EmPageIndexView.vue";

const { route } = useEmPageArgs();
</script>

<style scoped>

</style>
