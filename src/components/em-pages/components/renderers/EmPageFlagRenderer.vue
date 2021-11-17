<template>
  <span class="em-page-flag-renderer">
    <EmFlag :value="rendererValue" />
  </span>
</template>

<script lang="ts" setup>
import {defineProps, ref} from 'vue'
import EmFlag from "@/components/base/EmFlag.vue";
import {EmPageViewModel} from "@/models/em-page-view-model";
import {EmPageComponent} from "@/models/em-page-component";

const props = defineProps<{
  rendererValue: boolean,
  component: EmPageComponent,
  viewModel: EmPageViewModel
}>()

const rendererValue = ref(props.rendererValue);

</script>

<style scoped>

</style>
