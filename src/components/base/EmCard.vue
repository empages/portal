<template>
  <div class="card">
    <div
      v-if="title"
      :class="`card-header ${headerClasses}`">
      <h3 :class="`card-title ${titleClasses}`">
        {{ title }}
      </h3>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmCard",
  props: {
    title: {
      type: String,
      default: null
    },
    headerClasses: {
      type: String,
      default: () => ''
    },
    titleClasses: {
      type: String,
      default: () => ''
    }
  }
})
</script>

<style scoped>

</style>
