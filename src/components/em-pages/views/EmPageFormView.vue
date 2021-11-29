<template>
  <EmPageView :view-model="viewModel">
    <form @submit.prevent="submitForm">
      <div
        v-for="(input, inputIndex) in inputs"
        :key="`em-page-form-input-${inputIndex}`"
        class="form-group mb-2">
        <label class="form-label mb-0">
          {{ input.label }} <span
            v-if="input.required"
            class="required-indicator">*</span>
        </label>
        <Component
          :is="input?.component.sourceName"
          v-model="model[getPropertyNameFromOrigin(input?.property)]"
          :view-model="viewModel"
          :component="input?.component"
          :mutator-value="input?.value"
          :allow-null-value="input?.allowNullValue"
          :has-error="input?.validationErrors && input?.validationErrors.length"
          v-bind="input?.parameters" />
        <div
          v-if="input?.validationErrors && input?.validationErrors.length"
          class="invalid-feedback d-block">
          <p
            v-for="(validationError, validationErrorIndex) in input.validationErrors"
            :key="`input-${input?.property}-error-${validationErrorIndex}`"
            class="m-0">
            {{ validationError }}
          </p>
        </div>
        <div
          v-if="hasErrorOnClient(input?.property)"
          class="invalid-feedback d-block">
          <p class="m-0">
            {{ getOriginPropertyValidator(input?.property).$errors[0].$message }}
          </p>
        </div>
      </div>
      <div class="my-2">
        <hr>
        <button
          class="btn btn-primary"
          type="submit">
          Save
        </button>
      </div>
    </form>
  </EmPageView>
</template>

<script lang="ts" setup>
import { useAdminLayout } from '@/composables/admin-layout-composable'
import { computed, onMounted, ref, Ref, watch } from 'vue'
import adminService from '@/services/admin-service'
import { EmPageFormViewModel } from '@/models/em-page-form-view-model'
import EmPageView from '@/components/em-pages/views/EmPageView.vue'
import {EmPageFormType} from "@/shared/enums";
import {EmPageFormSubmissionResponse} from "@/models/em-page-form-submission-response";
import useVuelidate from "@vuelidate/core";
import {getModelFromFormViewModel, getPropertyNameFromOrigin} from "@/shared/helpers";
import {required} from "@vuelidate/validators";
import {useNotifications} from "@/composables/notifications-composable";

const props = defineProps<{
  pageRoute: string | null,
  identifier: string | null,
  type: EmPageFormType
}>()

const adminLayout = useAdminLayout();

const notifications = useNotifications();

const viewModel: Ref<EmPageFormViewModel | null> = ref(null);

const model: Ref<any> = ref({});

const modelValidationRules = computed(() => {
  const rulesObject: any = {};
  if (viewModel.value) {
    const inputsForValidations = viewModel.value?.inputs.filter(x => x.required);
    for (const inputForValidation of inputsForValidations) {
      rulesObject[getPropertyNameFromOrigin(inputForValidation.property)] = { required };
    }
  }

  return rulesObject;
})


const v$ = useVuelidate(modelValidationRules, model);

async function loadViewModel (route: string | null, identifier: string | null) {
  viewModel.value = await adminService.getFormViewModel(route || '', identifier || '');
  model.value = getModelFromFormViewModel(viewModel.value);
  console.log(model.value);
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value, props.identifier);
})

watch(() => props.identifier, async (value) => {
  await loadViewModel(props.pageRoute, value);
})

const inputs = computed(() => viewModel.value?.inputs);

function getOriginPropertyValidator(originProperty: string): any {
  const property = getPropertyNameFromOrigin(originProperty);
  return v$.value[property];
}

function hasErrorOnClient(originProperty: string): boolean {
  const propertyValidator = getOriginPropertyValidator(originProperty);
  return propertyValidator && propertyValidator.$errors && propertyValidator.$errors.length > 0;
}

async function submitForm() {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    const response = await adminService.submitFormModel(viewModel.value?.context?.route ?? '', props.type, model.value);
    if (response && !response.succeeded && viewModel.value) {
      notifications.showErrorToast(response.operationError ?? 'Form submission has been invalid');
      mapErrorsFromResponse(viewModel.value, response);
    }
    else {
      notifications.showSuccessToast('Form submission has been successful');
    }
  }
}

function clearErrors(model: EmPageFormViewModel) {
  model.nonMappedFormErrors = [];
  for (const input of model.inputs) {
    input.validationErrors = [];
  }
}

function mapErrorsFromResponse(model: EmPageFormViewModel, response: EmPageFormSubmissionResponse) {
  clearErrors(model);
  const mappedKeys: Array<string> = [];
  const errorKeys = Object.keys(response.validationErrors);
  for (const input of model.inputs) {
    const errorKey = `Model.${input.property}`;
    if (!errorKeys.includes(errorKey)) {
      continue;
    }

    for (const error of response.validationErrors[errorKey]) {
      input.validationErrors.push(error);
    }

    mappedKeys.push(errorKey);
  }

  if (mappedKeys.length != errorKeys.length) {
    const unmappedKeys = errorKeys.filter(x => !mappedKeys.includes(x));
    for (const unmappedKey of unmappedKeys) {
      for (const unmappedKeyError of response.validationErrors[unmappedKey]) {
        model.nonMappedFormErrors.push(unmappedKeyError);
      }
    }
  }
  else {
    model.nonMappedFormErrors = [];
  }
}

onMounted(async () => {
  await loadViewModel(props.pageRoute, props.identifier);
})
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .required-indicator {
    color: $danger;
  }
</style>
