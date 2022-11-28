<template>
  <Component
    :is="props.component.sourceName"
    v-model="value"
    :label="props.label"
    :args="props.component.parameters" />
</template>

<script lang="ts" setup>
  import type {EmResponseComponent} from "@/core/types";
  import {ref} from "vue";

  const props = defineProps<{
    modelValue: any;
    label?: string | undefined;
    component: EmResponseComponent;
  }>();

  const value = ref(props.modelValue);
</script>

<style scoped>
</style>
