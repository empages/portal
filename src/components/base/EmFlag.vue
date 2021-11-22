<template>
  <div class="em-flag">
    <div class="form-check d-flex">
      <label class="form-check-label my-auto">
        <input
          class="form-check-input my-auto me-1 opacity-100"
          type="checkbox"
          :checked="props.value"
          :disabled="true">
        {{ props.value ? 'Yes' : 'No' }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: boolean
}>();
</script>

<style scoped>

</style>
