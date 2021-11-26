<template>
  <div :id="`check-group-${groupId}`">
    <div
      v-for="(option, optionIndex) in props.options"
      :key="`check-group-${groupId}-check-${optionIndex}`"
      class="form-check">
      <input
        :id="`check-group-${groupId}-check-${optionIndex}`"
        class="form-check-input"
        type="checkbox"
        :value="option.value"
        :name="`check-group-${groupId}`">
      <label
        class="form-check-label"
        :for="`check-group-${groupId}-check-${optionIndex}`">
        {{ option.text }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {TextValuePair} from "@/shared/types/text-value-pair";
import {randomString} from "@/shared/helpers";
import {ref, watch} from "vue";

const props = defineProps<{
  modelValue?: any,
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
