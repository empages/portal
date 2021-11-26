<template>
  <div class="em-page-enum-mutator">
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
import { EmPageComponent } from '@/models/em-page-component'
import { EmPageViewModel } from '@/models/em-page-view-model'
import {computed, ref} from 'vue'
import EmSelect from "@/components/base/EmSelect.vue";
import {MultiChoiceType} from "@/shared/enums";
import EmRadioGroup from "@/components/base/EmRadioGroup.vue";
import EmCheckboxGroup from "@/components/base/EmCheckboxGroup.vue";

const props = defineProps<{
  mutatorValue: number | null,
  component: EmPageComponent,
  viewModel: EmPageViewModel,
  allowNullValue: boolean,
  multiChoiceType: MultiChoiceType
}>()

const enumValueItems = computed(() => {
  return props.viewModel.modelEnumerations[props.component.sourceTypeName];
});

const value = ref(props.mutatorValue);

const options = computed(() => {
  return enumValueItems.value.map(x => {
    return {
      text: x.name,
      value: x.value
    }
  })
})
</script>

<style scoped>

</style>
