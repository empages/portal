<template>
  <input
    class="form-control"
    :class="[validator.$errors.length ? 'is-invalid' : '', classes]"
    :type="type"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @keypress="($event) => $emit('keypress', $event)"
    @input="($event) => update($event)">
  <div
    v-if="validator && validator.$errors.length"
    class="invalid-feedback">
    {{ validator.$errors[0].$message }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EmInput",
  props: {
    validator: {
      type: Object,
      default() {
        return null;
      }
    },
    modelValue: {
      type: String,
      default() {
        return '';
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputEvent: {
      type: Function,
      default: () => null
    }
  },
  emits: ['update:modelValue', 'keypress'],
  methods: {
    update(event: Event): void {
      const target = event.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
      if (this.inputEvent) {
        this.inputEvent(event);
      }
    }
  }
})
</script>

<style scoped>

</style>
