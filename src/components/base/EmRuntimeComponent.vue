<template>
  <div class="em-runtime-component">
    <Component
      :is="props.name"
      v-bind="props.args" />
  </div>
</template>

<script lang="ts" setup>
import {defineProps, withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  name: string,
  args: any
}>(),{
  args: {}
});
</script>

<style scoped>

</style>
