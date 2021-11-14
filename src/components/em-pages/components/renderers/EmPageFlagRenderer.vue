<template>
  <span class="em-page-flag-renderer">
    <EmFlag :value="rendererValue" />
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmFlag from "@/components/base/EmFlag.vue";
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

export default defineComponent({
  name: "EmPageFlagRenderer",
  components: {EmFlag},
  props: {
    rendererValue: {
      type: Boolean,
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
