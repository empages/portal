<template>
  <div class="em-flag-mutator">
    <div class="form-check form-switch">
      <input
        :id="mutatorId"
        v-model="value"
        class="form-check-input"
        type="checkbox">
      <label
        class="form-check-label"
        :for="mutatorId">
        {{ props.label }}
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, type Ref} from "vue";
import {randomString} from "@/shared/helpers";

const props = defineProps<{
  modelValue: any,
  label: string,
  args: any
}>();

const mutatorId = randomString(16);

const value: Ref<any> = ref(props.modelValue);

</script>

<style scoped>
</style>
