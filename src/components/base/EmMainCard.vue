<template>
  <div class="card main-card">
    <div class="card-body p-0">
      <h5 class="card-title mb-1">
        {{ props.title }}
      </h5>
      <p class="card-text text-muted">
        {{ props.subTitle }}
      </p>
      <div class="main-card-content mt-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps<{
  title: string,
  subTitle: string;
}>();

</script>

<style scoped lang="scss">
  .main-card {
    box-shadow: none;

    .card-text {
      font-size: 14px;
    }
  }
</style>
