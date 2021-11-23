<template>
  <EmHtmlEditor v-model="modelValue" />
</template>

<script lang="ts" setup>
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import EmHtmlEditor from '@/components/base/EmHtmlEditor.vue'
import { ref } from 'vue'

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const modelValue = ref(props.mutatorValue);
</script>

<style scoped>

</style>
