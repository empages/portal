<template>
  <EmAdminLayout>
    <EmPageDetailsView
      :page-route="route"
      :identifier="identifier" />
  </EmAdminLayout>
</template>

<script lang="ts" setup>
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";

import EmPageDetailsView from "@/components/em-pages/views/EmPageDetailsView.vue";
import {useEmPageArgs} from "@/composables/em-page-args-composable";

const { route, identifier } = useEmPageArgs();

</script>

<style scoped>

</style>
