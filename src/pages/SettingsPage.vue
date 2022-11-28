<template>
  <div>
    <EmLoadingContainer :loaded="!detectedChange">
      <EmTable
        table-title="Applications"
        :columns="applicationsTableColumns"
        :data="applications">
        <template #bulkActions>
          <EmModal
            :hide-footer="true"
            :hide-header="true"
            :keyboard="false"
            :static="true">
            <template #body>
              <FirebaseStorageLoaderModalBody
                :firebase-context="firebaseContext"
                @reload:apps="router.go(0)" />
            </template>
            <template #trigger="{assigner}">
              <div v-once>
                {{ assigner(firebaseContextAssigner) }}
              </div>
              <button
                class="btn btn-neutral btn-sm me-2"
                @click="showFirebaseModal">
                <i class="mdi mdi-firebase" />
              </button>
            </template>
          </EmModal>
          <EmModal
            :hide-footer="true"
            :hide-header="true"
            :keyboard="false"
            :static="true">
            <template #body>
              <h4 class="mb-4">
                Application form
              </h4>
              <form @submit.prevent="formSubmit">
                <EmFormGroup label="Name">
                  <EmInput
                    v-model="applicationForEdit.name"
                    placeholder="Name"
                    :validator="v$.name" />
                </EmFormGroup>
                <EmFormGroup label="URL">
                  <EmInput
                    v-model="applicationForEdit.url"
                    type="url"
                    placeholder="URL"
                    :validator="v$.url" />
                </EmFormGroup>
                <EmFormGroup label="Gateway ID">
                  <EmInput
                    v-model="applicationForEdit.gatewayId"
                    type="password"
                    placeholder="Gateway ID"
                    :validator="v$.gatewayId" />
                </EmFormGroup>
                <div class="mb-0 d-flex">
                  <div class="ms-auto me-0 d-flex">
                    <button
                      class="btn btn-neutral ms-2"
                      type="button"
                      @click="closeForm">
                      Cancel
                    </button>
                    <button
                      class="btn btn-primary ms-2"
                      type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </template>
            <template #trigger="{assigner}">
              <div v-once>
                {{ assigner(formContextAssigner) }}
              </div>
              <button
                class="btn btn-neutral btn-sm"
                @click="selectEmptyApplicationForEdit">
                <i class="mdi mdi-plus-thick" />
              </button>
            </template>
          </EmModal>
        </template>
        <template #actions="{ data }">
          <button
            class="btn btn-neutral btn-sm mx-2px"
            @click="selectApplicationForEdit(data)">
            Edit
          </button>
          <EmConfirmation
            v-slot="{ context }"
            class="d-inline-block"
            confirmation-word="delete"
            :message="`Are you sure you want to remove it from the application list?`"
            :callback="() => removeApplication(data.id)">
            <button
              class="btn btn-danger btn-sm mx-2px btn-icon"
              @click="context.show">
              <i class="mdi mdi-trash-can-outline" />
            </button>
          </EmConfirmation>
        </template>
      </EmTable>
    </EmLoadingContainer>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import type {Ref} from "vue";
import EmTable from "@/components/base/EmTable.vue";
import { Application } from '@/models/application';
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import stateService from "@/services/state-service";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import EmLoadingContainer from '@/components/base/EmLoadingContainer.vue'
import {notificationService} from "@/services/notification-service";
import EmModal from "@/components/base/EmModal.vue";
import {useModalContext} from "@/composables/modal-composable";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import FirebaseStorageLoaderModalBody from "@/components/wrappers/FirebaseStorageLoaderModalBody.vue";

const store = useStore();
const router = useRouter();

const [formContext, formContextAssigner] = useModalContext();
const [firebaseContext, firebaseContextAssigner] = useModalContext();

const emptyApplication: Ref<Application> = ref({
  id: '',
  name: '',
  url: '',
  gatewayId: '',
  environment: '',
  version: ''
});

const applicationForEdit: Ref<Application> = ref(emptyApplication.value);
const detectedChange = ref(false);

const applicationsTableColumns = [
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'url',
    title: 'URL'
  },
  {
    key: 'environment',
    title: 'Environment'
  },
  {
    key: 'actions',
    title: 'Actions',
    thClass: 'fit',
    tdClass: 'fit'
  }
]

const rules = {
  name: { required: helpers.withMessage('Name is required', required), },
  url: { required: helpers.withMessage('URL is required', required) },
  gatewayId: { required: helpers.withMessage('Gateway ID is required', required), }
};

const v$ = useVuelidate(rules, applicationForEdit);

const applications = computed(() => {
  return store.getters['settingsModule/applications'];
})

async function formSubmit() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return;
  }

  await saveApplication(applicationForEdit.value);
  v$.value.$reset();
}

async function saveApplication(application: Application): Promise<void> {
  try {
    const state = await stateService.getState(application);
    if (state) {
      detectedChange.value = true;

      application.environment = state.environment;
      application.version = state.version;

      if (application.id) {
        store.commit('settingsModule/editApplication', application);
      }
      else {
        store.commit('settingsModule/addApplication', application);
      }

      notificationService.showSuccessToast('Application has been saved');
      router.go(0);
      return;
    }
  }
  catch (e) {
    console.log("Portal access has not been verified");
  }

  notificationService.showErrorToast(`We cannot initialize a valid connection with **${application.name}**`);
}

function removeApplication(id: string): void {
  store.commit('settingsModule/removeApplication', id);
  notificationService.showSuccessToast('Application has been removed');
  router.go(0);
}

function selectEmptyApplicationForEdit() {
  applicationForEdit.value = Object.assign({}, new Application());
  formContext.show();
}

function selectApplicationForEdit(application: Application) {
  applicationForEdit.value = Object.assign({}, application);
  formContext.show();
}

function showFirebaseModal() {
  firebaseContext.show();
}

function closeForm() {
  formContext.hide();
  v$.value.$reset();
}

</script>

<style scoped lang="scss">
  @import "src/assets/styles/core";
  .info-icon {
    color: $info;
    font-size: 26px;
  }
</style>
