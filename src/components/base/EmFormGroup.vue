<template>
  <div :class="`form-group ${classes}`">
    <label
      v-if="label"
      class="form-label">
      {{ label }}
    </label>
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmFormGroup",
  props: {
    label: {
      type: String,
      default: null
    },
    classes: {
      type: String,
      default: () => 'mb-2'
    }
  }
})
</script>

<style scoped>

</style>
