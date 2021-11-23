<template>
  <EmPageFeatureView
    :page-route="route"
    :identifier="identifier"
    :feature="feature" />
</template>

<script lang="ts" setup>
import { useEmPageArgs } from '@/composables/em-page-args-composable'
import EmPageFeatureView from '@/components/em-pages/views/EmPageFeatureView.vue'

const { route, identifier, feature } = useEmPageArgs();
</script>

<style scoped>

</style>
