<template>
  <div class="em-page-no-mutator">
    <div>
      <input
          type="hidden"
          v-model="value">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EmPageViewModel } from '@/models/em-page-view-model'
import {ref, watch} from "vue";
import {EmPageComponent} from "@/models/em-page-component";

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel,
  hasError: boolean,
}>()

const emit = defineEmits(['update:modelValue']);

const value = ref(props.mutatorValue);

watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
})
</script>

<style scoped>
</style>
