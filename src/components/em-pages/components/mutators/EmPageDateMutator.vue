<template>
  <Datepicker
    v-model="dateModel"
    :enable-time-picker="false" />
</template>

<script lang="ts" setup>
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'
import { ref, watch } from 'vue'
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import { parseDateModel } from '@/shared/helpers'
import moment from 'moment'

const props = defineProps<{
  mutatorValue: string | null,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const emit = defineEmits(['update:modelValue']);

const dateModel = ref(parseDateModel(props.mutatorValue));

watch(dateModel, (value: any) => {
  let valueForEmitting = null;
  if (value) {
    valueForEmitting = moment(value).format('YYYY-MM-DD');
  }

  emit('update:modelValue', valueForEmitting);
  console.log(valueForEmitting);
})

</script>

<style scoped>

</style>
