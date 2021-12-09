<template>
  <EmRuntimeComponent
    :name="componentName"
    :args="componentArgs" />
</template>

<script lang="ts" setup>
import {EmPageCustomViewModel} from "@/models/em-page-custom-view-model";
import EmRuntimeComponent from "@/components/base/EmRuntimeComponent.vue";
import {computed} from "vue";
import {getPropertyNameFromOrigin} from "@/shared/helpers";

const props = defineProps<{
  viewModel: EmPageCustomViewModel | null
}>()

const componentName = computed(() => {
  return props.viewModel?.componentName || '';
});

const componentArgs = computed(() => {
  const args: any = {};
  const params = props.viewModel?.parameters || [];
  for (const param of params) {
    args[getPropertyNameFromOrigin(param.property)] = param.value;
  }

  return args;
})

</script>

<style scoped>

</style>
