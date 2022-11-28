<template>
  <span class="em-flag-renderer">
    <span
      v-if="formattedValue"
      class="text-success">
      <i class="mdi mdi-check-circle" />
    </span>
    <span
      v-else
      class="text-danger">
      <i class="mdi mdi-close-circle" />
    </span>
  </span>
</template>

<script lang="ts" setup>

import {computed, type ComputedRef} from "vue";

const props = defineProps<{
  modelValue: any,
  args: any
}>();

const formattedValue: ComputedRef<any> = computed(() => {
  return props.modelValue;
});

</script>

<style scoped>
.em-flag-renderer {
  font-size: 1.0525rem;
}
</style>
