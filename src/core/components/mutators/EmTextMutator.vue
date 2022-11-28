<template>
  <div class="em-text-mutator">
    <div class="form-floating form-group">
      <input
        v-model="value"
        class="form-control"
        :placeholder="props.label">
      <label
        v-if="props.label"
        class="form-label">
        {{ props.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, type Ref} from "vue";

const props = defineProps<{
  modelValue: any,
  label: string,
  args: any
}>();

const value: Ref<any> = ref(props.modelValue);

</script>

<style scoped>
</style>
