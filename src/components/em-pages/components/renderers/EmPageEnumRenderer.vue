<template>
  <span class="em-page-enum-renderer">{{ enumName }}</span>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

export default defineComponent({
  name: "EmPageEnumRenderer",
  props: {
    rendererValue: {
      type: Number,
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
  },
  computed: {
    enumValueItems() {
      return this.viewModel.modelEnumerations[this.component.sourceTypeName];
    },
    enumName() {
      return this.enumValueItems.find(x => x.value === this.rendererValue)?.name;
    }
  }
})
</script>

<style scoped>

</style>
