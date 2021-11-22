<template>
  <EmLoadingContainer :loaded="loaded">
    <slot />
  </EmLoadingContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import EmLoadingContainer from '@/components/base/EmLoadingContainer.vue'
import { EmPageViewModel } from '@/models/em-page-view-model'

const props = defineProps<{
  viewModel: EmPageViewModel | null
}>()

const loaded = computed(() => {
  return props.viewModel !== null;
})

</script>

<style scoped>

</style>
