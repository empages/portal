<template>
  <div class="em-page-html-mutator">
    <EmHtmlEditor v-model="modelValue" />
  </div>
</template>

<script lang="ts" setup>
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import EmHtmlEditor from '@/components/base/EmHtmlEditor.vue'
import {ref, watch} from 'vue'

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const emit = defineEmits(['update:modelValue']);

const modelValue = ref(props.mutatorValue);
console.log(modelValue);
watch(modelValue, (newValue: any) => {
  emit('update:modelValue', newValue);
})

</script>

<style scoped>

</style>
