<template>
  <div class="em-page-file-mutator">
    <div class="file-uploader-container">
      <EmFileUploader @file:uploaded="value = $event" />
      <p
        v-if="props.mutatorValue"
        class="text-muted text-small mt-2 mb-0">
        Current: <strong>{{ props.mutatorValue }}</strong>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {EmPageComponent} from "@/models/em-page-component";
  import {EmPageViewModel} from "@/models/em-page-view-model";
  import EmFileUploader from "@/components/base/EmFileUploader.vue";
  import {ref, watch} from "vue";

  const props = defineProps<{
    mutatorValue: any,
    component: EmPageComponent,
    viewModel: EmPageViewModel,
    hasError: boolean,
    destinationFolder: string | null
  }>()

  const emit = defineEmits(['update:modelValue']);

  const value = ref(props.mutatorValue);

  watch(value, (newValue: any) => {
    emit('update:modelValue', newValue);
  })

</script>

<style scoped lang="scss">

</style>
