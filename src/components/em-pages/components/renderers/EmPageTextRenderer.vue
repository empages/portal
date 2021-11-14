<template>
  <span class="em-page-text-renderer">{{ rendererValue }}</span>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

export default defineComponent({
  name: "EmPageTextRenderer",
  props: {
    rendererValue: {
      type: [String, Number, Object, Boolean, Symbol, Array, Date],
      required: true
    },
    component: {
      type: Object as () => EmPageComponent,
      required: true
    },
    viewModel: {
      type: Object as () => EmPageViewModel,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
