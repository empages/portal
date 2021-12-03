<template>
  <div class="em-page-custom-data-mutator">
    <div v-if="props.multiChoiceType === MultiChoiceType.Select">
      <EmSelect
        v-model="value"
        :options="options"
        :nullable="allowNullValue" />
    </div>
    <div v-if="props.multiChoiceType === MultiChoiceType.CheckboxGroup">
      <EmCheckboxGroup
        v-model="value"
        :options="options"
        :nullable="allowNullValue" />
    </div>
    <div v-if="props.multiChoiceType === MultiChoiceType.RadioGroup">
      <EmRadioGroup
        v-model="value"
        :options="options"
        :nullable="allowNullValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {EmPageComponent} from "@/models/em-page-component";
import {MultiChoiceType} from "@/shared/enums";
import {computed, ref, watch} from "vue";
import {EmPageFormViewModel} from "@/models/em-page-form-view-model";
import EmRadioGroup from "@/components/base/EmRadioGroup.vue";
import EmCheckboxGroup from "@/components/base/EmCheckboxGroup.vue";
import EmSelect from "@/components/base/EmSelect.vue";
import {isValueDefaultId} from "@/shared/helpers";

const props = defineProps<{
  mutatorValue: any,
  component: EmPageComponent,
  viewModel: EmPageFormViewModel,
  allowNullValue: boolean,
  multiChoiceType: MultiChoiceType
}>()

const emit = defineEmits(['update:modelValue']);

const customDataItems = computed(() => {
  return props.viewModel.modelSelectableCustomDataMap[props.component.sourceTypeName];
});


const value = ref(props.mutatorValue);

const options = computed(() => {
  return customDataItems.value.map(x => {
    return {
      text: x.data,
      value: x.identifier
    }
  })
})

if (isValueDefaultId(value.value) && !props.allowNullValue && options.value.length) {
  value.value = options.value[0].value;
}

watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
})

</script>

<style scoped>

</style>
