<template>
  <EmPageDetailsView
    :page-route="route"
    :identifier="identifier" />
</template>

<script lang="ts" setup>
import EmPageDetailsView from "@/components/em-pages/views/EmPageDetailsView.vue";
import {useEmPageArgs} from "@/composables/em-page-args-composable";

const { route, identifier } = useEmPageArgs();

</script>

<style scoped>

</style>
