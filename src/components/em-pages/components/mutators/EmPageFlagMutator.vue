<template>
  <div class="em-page-flag-mutator">
    <EmRadioGroup
      v-model="value"
      :options="options"
      :nullable="allowNullValue" />
  </div>
</template>

<script lang="ts" setup>
import {EmPageComponent} from "@/models/em-page-component";
import {EmPageViewModel} from "@/models/em-page-view-model";
import {computed, ref, watch} from "vue";
import EmRadioGroup from "@/components/base/EmRadioGroup.vue";

const props = defineProps<{
  mutatorValue: boolean | null,
  component: EmPageComponent,
  viewModel: EmPageViewModel,
  allowNullValue: boolean,
  trueText: string,
  falseText: string
}>()

const emit = defineEmits(['update:modelValue']);

const value = ref(props.mutatorValue);

const options = computed(() => {
  return [
    {
      text: props.trueText,
      value: true
    },
    {
      text: props.falseText,
      value: false
    }
  ]
});

watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
})

</script>

<style scoped>

</style>
