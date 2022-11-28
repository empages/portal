<template>
  <span class="em-text-renderer">
    {{ formattedValue }}
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
</style>
