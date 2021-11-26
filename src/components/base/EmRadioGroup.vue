<template>
  <div :id="`radio-group-${groupId}`">
    <div
      v-if="props.nullable"
      class="form-check">
      <input
        :id="`radio-group-${groupId}-radio-none`"
        v-model="groupValue"
        class="form-check-input"
        type="radio"
        :value="null"
        :name="`radio-group-${groupId}`">
      <label
        class="form-check-label"
        :for="`radio-group-${groupId}-radio-none`">
        None
      </label>
    </div>
    <div
      v-for="(option, optionIndex) in props.options"
      :key="`radio-group-${groupId}-radio-${optionIndex}`"
      class="form-check">
      <input
        :id="`radio-group-${groupId}-radio-${optionIndex}`"
        v-model="groupValue"
        class="form-check-input"
        type="radio"
        :value="option.value"
        :name="`radio-group-${groupId}`">
      <label
        class="form-check-label"
        :for="`radio-group-${groupId}-radio-${optionIndex}`">
        {{ option.text }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {TextValuePair} from "@/shared/types/text-value-pair";
import {randomString} from "@/shared/helpers";
import {computed, ref, watch} from "vue";

const props = defineProps<{
  modelValue?: any,
  nullable: boolean
  options: Array<TextValuePair>
}>();

const emit = defineEmits(['update:modelValue']);

const groupId = randomString(10);

const groupValue = ref(props.modelValue);

watch(groupValue, (value) => {
  emit('update:modelValue', value);
})
</script>

<style scoped>

</style>
