<template>
  <input
    class="form-control"
    :value="props.mutatorValue">
</template>

<script lang="ts" setup>
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()
</script>

<style scoped>

</style>
