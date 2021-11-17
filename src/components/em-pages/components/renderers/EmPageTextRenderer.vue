<template>
  <span class="em-page-text-renderer">{{ rendererValue }}</span>
</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue'
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

const props = defineProps<{
  rendererValue: any,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const rendererValue = ref(props.rendererValue);

</script>

<style scoped>

</style>
