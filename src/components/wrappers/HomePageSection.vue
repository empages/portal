<template>
  <div class="home-section">
    <div
      v-if="useCard"
      class="section-content">
      <div class="card">
        <div class="card-body">
          <h1 class="title">
            {{ props.title }}
          </h1>
          <slot />
        </div>
      </div>
    </div>
    <div
      v-else
      class="section-content">
      <div class="py-3">
        <h1 class="title">
          {{ props.title }}
        </h1>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {withDefaults} from "vue";

const props = withDefaults(defineProps<{
  title: string,
  useCard?: boolean,
}>(), {
  useCard: true
});

</script>

<style scoped lang="scss">
  @import "src/assets/styles/mixins";

  .card {
    margin: 1em 0 2em;

    .title {
      font-size: 34px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 30px;

      @include respond-below(sm) {
        font-size: 26px;
        margin-bottom: 16px;
      }
    }
  }
</style>
