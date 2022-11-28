<template>
  <input
    class="form-control"
    :class="[props.validator.$errors.length ? 'is-invalid' : '', props.classes]"
    :type="props.type"
    :value="props.modelValue"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    autocomplete="props.autocomplete"
    @keypress="onKeyPressed"
    @input="onInput">
  <div
    v-if="props.validator && props.validator.$errors.length"
    class="invalid-feedback">
    {{ props.validator.$errors[0].$message }}
  </div>
</template>

<script lang="ts" setup>
import {withDefaults} from "vue";

const props = withDefaults(defineProps<{
  validator?: any | null | unknown,
  modelValue?: string,
  type?: string,
  placeholder?: string,
  classes?: string,
  disabled?: boolean,
  autocomplete?: string,
  inputEvent?: (event: Event) => void
}>(), {
  validator: null,
  modelValue: '',
  type: 'text',
  placeholder: '',
  classes: '',
  disabled: false,
  autocomplete: '',
  inputEvent: () => null
})

const emit = defineEmits(['update:modelValue', 'keypress']);

function onKeyPressed(event: Event) {
   emit('keypress', event);
}

function onInput(event: Event) {
  update(event);
}

function update(event: Event): void {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  if (props.inputEvent) {
    props.inputEvent(event);
  }
}

</script>

<style scoped>

</style>
