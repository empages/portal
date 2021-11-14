<template>
  <div class="card main-card">
    <div class="card-body p-0">
      <h5 class="card-title mb-1">
        {{ title }}
      </h5>
      <p class="card-text text-muted">
        {{ subTitle }}
      </p>
      <div class="main-card-content mt-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EmMainCard",
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
  .main-card {
    box-shadow: none;

    .card-text {
      font-size: 14px;
    }
  }
</style>
