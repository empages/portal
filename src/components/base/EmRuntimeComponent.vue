<template>
  <div class="em-runtime-component">
    <Component
      :is="name"
      v-bind="args" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmRuntimeComponent",
  props: {
    name: {
      type: String,
      required: true
    },
    args: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  }
})
</script>

<style scoped>

</style>
