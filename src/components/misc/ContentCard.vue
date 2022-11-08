<template>
  <EmCard :title="props.title">
    <slot />
  </EmCard>
</template>

<script lang="ts" setup>
import EmCard from "@/components/base/EmCard.vue";
const props = defineProps<{
  title: string
}>();
</script>

<style scoped lang="scss">
:deep {
  .card-title {
    font-weight: bold;
    font-size: 1.875rem;
  }
}
</style>
