<template>
  <span class="em-image">
    <img
      :alt="imageAlt"
      :src="imageSrc">
  </span>
</template>

<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {EmPageComponent} from "@/models/em-page-component";
import {isUrlAbsolute} from "@/shared/helpers";
import {useUrlBuilder} from "@/composables/url-builder-composable";
import {EmPageViewModel} from "@/models/em-page-view-model";
const urlBuilder = useUrlBuilder();

const props = defineProps<{
  rendererValue: string,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const imageSrc = computed(() => {
  const imageUrl = props.rendererValue;
  if (isUrlAbsolute(imageUrl)) {
    return imageUrl;
  }

  return urlBuilder.getApplicationUrl(imageUrl);
})

const imageAlt = computed(() => {
  return props.component.sourceTypeName;
})

</script>

<style scoped>
.em-image img {
  height: 100px;
  width: auto;
  border-radius: 0 !important;
}
</style>
