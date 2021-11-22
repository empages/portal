<template>
  <div class="em-loading-container">
    <div
      v-if="!props.loaded"
      class="em-lc-spinner">
      <EmLoadingSpinner />
    </div>
    <div
      v-else
      class="em-lc-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import EmLoadingSpinner from '@/components/base/EmLoadingSpinner.vue'

const props = defineProps<{
  loaded: boolean
}>()

</script>

<style scoped>

</style>
