<template>
  <div class="em-page-html-renderer">
    <div v-html="rendererValue" />
  </div>
</template>

<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {EmPageComponent} from "@/models/em-page-component";
import {EmPageViewModel} from "@/models/em-page-view-model";
import {decodeHtml} from "@/shared/helpers";

const props = defineProps<{
  rendererValue?: string,
  component: EmPageComponent,
  viewModel: EmPageViewModel,
  encoded: boolean
}>()

const rendererValue = computed(() => {
  let value = props.rendererValue;
  if (props.encoded) {
    value = decodeHtml(props.rendererValue?.toString() ?? '');
  }

  return value;
});

</script>

<style scoped>

</style>
