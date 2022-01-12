<template>
  <div class="em-page-hidden-query-mutator">
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
import {useRoute} from "vue-router";

const route = useRoute();

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel,
  referenceKey: string
}>()

const emit = defineEmits(['update:modelValue']);

const value = ref(props.mutatorValue);

if (route.query && route.query[props.referenceKey]) {
  value.value = route.query[props.referenceKey];
  emit('update:modelValue', value.value);
}

watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
})
</script>

<style scoped>

</style>
