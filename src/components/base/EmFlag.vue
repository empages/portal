<template>
  <div>
    <div class="form-check d-flex">
      <label class="form-check-label my-auto">
        <input
          class="form-check-input my-auto me-1 opacity-100"
          type="checkbox"
          :checked="value"
          :disabled="true">
        {{ value ? 'Yes' : 'No' }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmFlag",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
