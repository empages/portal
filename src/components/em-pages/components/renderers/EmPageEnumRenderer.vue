<template>
  <span class="em-page-enum-renderer">{{ enumName }}</span>
</template>

<script lang="ts" setup>
import {computed, defineProps} from 'vue'
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

const props = defineProps<{
  rendererValue: number,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const enumValueItems = computed(() => {
  return props.viewModel.modelEnumerations[props.component.sourceTypeName];
})

const enumName = computed(() => {
  return enumValueItems.value.find(x => x.value === props.rendererValue)?.name;
})
</script>

<style scoped>

</style>
