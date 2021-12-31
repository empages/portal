<template>
  <EmCard
    class="h-100"
    :title="title">
    <form @submit.prevent="formSubmit">
      <EmFormGroup label="Name">
        <EmInput
          v-model="form.name"
          placeholder="Enter name"
          :validator="v$.name" />
      </EmFormGroup>
      <EmFormGroup label="URL">
        <EmInput
          v-model="form.url"
          type="url"
          placeholder="Enter URL"
          :validator="v$.url" />
      </EmFormGroup>
      <EmFormGroup label="Gateway Id">
        <EmInput
          v-model="form.gatewayId"
          type="password"
          placeholder="Enter gateway Id"
          :validator="v$.gatewayId" />
      </EmFormGroup>
      <EmFormGroup classes="mb-0 mt-3 d-flex">
        <EmConfirmation
          v-slot="{ context }"
          message="Are you sure you want to reset that form?"
          :callback="resetForm">
          <button
            type="button"
            class="btn btn-light"
            @click="context.show">
            Reset
          </button>
        </EmConfirmation>
        <button
          class="btn btn-primary ms-2 mb-2"
          type="submit">
          Save
        </button>
      </EmFormGroup>
    </form>
  </EmCard>
</template>

<script lang="ts" setup>
import {ref, watch, Ref} from 'vue'
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { Application } from '@/models/application';
import EmCard from "@/components/base/EmCard.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";

const props = defineProps<{
  title: string,
  application: Application
}>()
const emit = defineEmits(['form:submit', 'form:reset'])

const form: Ref<Application> = ref(Object.assign({}, props.application));
const rules = {
  name: { required: helpers.withMessage('Name is required', required), },
  url: { required: helpers.withMessage('URL is required', required) },
  gatewayId: { required: helpers.withMessage('Gateway Id is required', required), }
};

const v$ = useVuelidate(rules, form);

watch(() => props.application, (value) => {
  form.value = Object.assign({}, value)
})

async function formSubmit() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return;
  }

  emit('form:submit', form.value, successSubmitCallback);
  v$.value.$reset();
}

function successSubmitCallback():void {
  resetForm();
}

function resetForm() {
  form.value.id ='';
  form.value.name = '';
  form.value.url = '';
  form.value.gatewayId = '';
  form.value.environment = '';
  emit('form:reset', form);
  v$.value.$reset();
}

</script>

<style scoped>

</style>
