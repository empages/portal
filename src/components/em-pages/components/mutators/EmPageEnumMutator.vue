<template>
  <select
    :value="mutatorValue"
    class="form-control">
    <option
      v-for="(enumItem, enumItemIndex) in enumValueItems"
      :key="`enum-${enumItem.originalName}-item-option-${enumItemIndex}`"
      :value="enumItem.value">
      {{ enumItem.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import { computed } from 'vue'

const props = defineProps<{
  mutatorValue: number | null,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const enumValueItems = computed(() => {
  return props.viewModel.modelEnumerations[props.component.sourceTypeName];
})
</script>

<style scoped>

</style>
