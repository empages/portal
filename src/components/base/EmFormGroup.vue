<template>
  <div :class="`form-floating form-group ${props.classes}`">
    <slot />
    <label
      v-if="props.label"
      class="form-label">
      {{ props.label }}
    </label>
  </div>
</template>

<script lang="ts" setup>
import {withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  label?: string,
  classes?: string;
}>(), {
  label: '',
  classes: 'mb-4'
});

</script>

<style scoped>

</style>
