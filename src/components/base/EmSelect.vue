<template>
  <select
    :id="`select-${selectId}`"
    v-model="selectValue"
    class="form-control">
    <option
      v-if="nullable"
      :value="null">
      -- Select --
    </option>
    <option
      v-for="(option, optionIndex) in props.options"
      :key="`${selectId}-option-${optionIndex}`"
      :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import {TextValuePair} from "@/shared/types/text-value-pair";
import {randomString} from "@/shared/helpers";
import {onMounted, ref, watch} from "vue";

const props = defineProps<{
  modelValue?: any,
  nullable: boolean
  options: Array<TextValuePair>
}>();

const emit = defineEmits(['update:modelValue']);

const selectId = randomString(10);
const selectValue = ref(props.modelValue);

watch(selectValue, (value) => {
  emit('update:modelValue', value);
})

</script>

<style scoped>

</style>
