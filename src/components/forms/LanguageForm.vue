<template>
  <div>
    <form @submit.prevent="formSubmit">
      <div class="row m-0">
        <div class="form-group col-12 col-md px-1 pb-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.code"
              :validator="v$.code"
              placeholder="Code" />
          </div>
        </div>
        <div class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.name"
              :validator="v$.name"
              placeholder="Name" />
          </div>
        </div>
        <div class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.nativeName"
              :validator="v$.nativeName"
              placeholder="Native name" />
          </div>
        </div>
        <div class="form-group col-12 col-md-2 col-lg-1 px-1 pb-2 pt-3 pb-md-0 pt-2 pt-md-0">
          <button
            class="btn btn-primary w-100 h-100"
            type="submit">
            {{ props.submitButtonText }}
          </button>
        </div>
        <div class="form-group col-12 col-md-2 col-lg-1 px-1">
          <EmConfirmation
            v-slot="{ context }"
            :callback="resetForm"
            message="Are you sure you want to reset the form?"
            class="w-100">
            <button
              class="btn btn-primary w-100 h-100"
              type="button"
              @click="context.show">
              Reset
            </button>
          </EmConfirmation>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import {defineProps, defineEmits, Ref, ref, watch} from "vue"
import EmInput from "@/components/base/EmInput.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import { useNotifications } from '@/composables/notifications-composable';
import {Language} from "@/models/language";

const notifications = useNotifications();

const props = defineProps<{
  language: Language,
  submitButtonText: string,
  formTitle: string
}>();

const emit = defineEmits(['form:submit', 'form:reset']);

const form: Ref<Language> = ref(Object.assign({}, props.language));
const rules = {
  code: { required: helpers.withMessage('Language code is required', required), },
  name: { required: helpers.withMessage('Name is required', required), },
  nativeName: { required: helpers.withMessage('Native name is required', required), }
}

const v$ = useVuelidate(rules, form);

watch(() => props.language, (value) => {
  form.value = Object.assign({}, value);
})

async function formSubmit() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return;
  }

  emit('form:submit', form.value);
  v$.value.$reset();
}

function resetForm() {
  form.value.code = '';
  form.value.name = '';
  form.value.nativeName = '';

  emit('form:reset', form.value);

  v$.value.$reset();
  notifications.showInfoToast("Language form has been reset");
}

</script>

<style scoped lang="scss">
  :deep {
    .confirmation-modal {
      height: 100%;
    }
  }

  .btn-primary {
    max-height: 35px;
    min-height: 35px;
  }
</style>
