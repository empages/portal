<template>
  <EmPageFormView
    :page-route="route"
    :identifier="null" />
</template>

<script lang="ts" setup>
import { useEmPageArgs } from '@/composables/em-page-args-composable'
import EmPageFormView from '@/components/em-pages/views/EmPageFormView.vue'

const { route } = useEmPageArgs();
</script>

<style scoped>

</style>
