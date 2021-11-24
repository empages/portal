<template>
  <Datepicker
    v-model="timeModel"
    time-picker />
</template>

<script lang="ts" setup>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import { ref, watch } from 'vue'
import { parseTimeSpan } from '@/shared/helpers'
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import { padStart } from 'lodash'

const props = defineProps<{
  mutatorValue: string | null,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const emit = defineEmits(['update:modelValue']);

const timeModel = ref(parseTimeSpan(props.mutatorValue));

watch(timeModel, (value: any) => {
  let valueForEmitting = null;
  if (value) {
    valueForEmitting = `${padStart(value.hours, 2, '0')}:${padStart(value.minutes, 2, '0')}:00`;
  }

  emit('update:modelValue', valueForEmitting);
  console.log(valueForEmitting);
})

</script>

<style scoped>

</style>
