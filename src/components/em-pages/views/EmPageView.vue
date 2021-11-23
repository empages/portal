<template>
  <EmLoadingContainer :loaded="loaded">
    <EmCard :title="props.viewModel?.context?.title">
      <slot />
    </EmCard>
  </EmLoadingContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import EmLoadingContainer from '@/components/base/EmLoadingContainer.vue'
import { EmPageViewModel } from '@/models/em-page-view-model'
import EmCard from '@/components/base/EmCard.vue'

const props = defineProps<{
  viewModel: EmPageViewModel | null
}>()

const loaded = computed(() => {
  return props.viewModel !== null;
})

</script>

<style scoped>

</style>
