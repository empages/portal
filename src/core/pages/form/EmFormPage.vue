<template>
  <div>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleFormSubmit">
          <div
            v-for="input in props.model.inputs"
            :key="`form-page-input-${input.index}`"
            class="mb-3">
            <div v-if="getComponent(input.index)">
              <EmComponent
                v-model="formModel[`input_${input.index}`]"
                :label="input.label"
                :component="getComponent(input.index)" />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 d-flex">
              <button
                type="button"
                class="btn btn-neutral me-2 ms-auto"
                @click="resetForm">
                Reset
              </button>
              <button
                type="submit"
                class="btn btn-primary mx-0">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type {EmFormResponseModel, EmFormResponseInput} from "@/core/types";
import {ref} from "vue";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmComponent from "@/core/components/EmComponent.vue";
import {EmResponseComponent} from "@/core/types";
const props = defineProps<{
  model: EmFormResponseModel;
  route: string;
}>()

const formModel = ref(buildFormModel(props.model.inputs));

function buildFormModel(inputs: EmFormResponseInput[]) {
  const model: any = {};
  for (const input of inputs) {
    model[`input_${input.index}`] = input.value;
  }

  return model;
}

function handleFormSubmit() {
  console.log('submit');
}

function resetForm() {
  formModel.value = buildFormModel(props.model.inputs);
}

function getComponent(index: number): EmResponseComponent | undefined {
  return props.model.components.at(index);
}

</script>

<style scoped>
</style>
