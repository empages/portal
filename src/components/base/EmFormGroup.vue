<template>
  <div :class="`form-group ${props.classes}`">
    <label
      v-if="props.label"
      class="form-label">
      {{ props.label }}
    </label>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  label?: string,
  classes?: string;
}>(), {
  label: '',
  classes: 'mb-2'
});

</script>

<style scoped>

</style>
