<template>
  <div class="em-page-text-mutator">
    <div v-if="!props.largeText">
      <input
        v-model="value"
        :placeholder="`Enter ${props.label}..`"
        :class="[{ 'is-invalid': props.hasError }, 'form-control']">
    </div>
    <div v-else>
      <textarea
        v-model="value"
        :placeholder="`Enter ${props.label}..`"
        :class="[{ 'is-invalid': props.hasError }, 'form-control']"
        rows="5" />
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
  label: string,
  largeText: boolean
}>()

const emit = defineEmits(['update:modelValue']);

const value = ref(props.mutatorValue);

watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
})
</script>

<style scoped>

</style>
