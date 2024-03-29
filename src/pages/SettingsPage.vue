<template>
  <EmRow>
    <EmCol
      sm="8"
      class="mb-4">
      <div>
        <ApplicationForm
          class="mb-4"
          :title="formTitle"
          :application="selectedApplication"
          @form:submit="saveApplication"
          @form:reset="applicationForEdit = null" />
        <EmCard title="List of all registered applications">
          <EmLoadingContainer :loaded="!detectedChange">
            <EmTable
              :columns="applicationsTableColumns"
              :data="applications">
              <template #actions="{ data }">
                <button
                  class="btn btn-primary px-2 py-1 mx-2px me-1"
                  @click="selectApplicationForEdit(data)">
                  Select to edit
                </button>
                <EmConfirmation
                  v-slot="{ context }"
                  class="d-inline-block"
                  :confirmation-word="data.name"
                  :message="`Are you sure you want to remove it from the application list?`"
                  :callback="() => removeApplication(data.id)">
                  <button
                    class="btn btn-primary px-2 py-1 mx-2px"
                    @click="context.show">
                    Remove
                  </button>
                </EmConfirmation>
              </template>
            </EmTable>
          </EmLoadingContainer>
        </EmCard>
      </div>
    </EmCol>
    <EmCol
      sm="4"
      class="mb-4">
      <EmCard
        class="h-100"
        title="What you need to know?">
        <template #title="{ cardTitle }">
          <div class="d-flex">
            <span class="info-icon my-auto">
              <i class="mdi mdi-information" />
            </span>
            <span class="info-title my-auto ms-2">
              {{ cardTitle }}
            </span>
          </div>
        </template>
        <SettingsHelp />
      </EmCard>
    </EmCol>
  </EmRow>
</template>

<script lang="ts" setup>
import {computed, Ref, ref} from 'vue'
import EmTable from "@/components/base/EmTable.vue";
import EmRow from "@/components/base/EmRow.vue";
import EmCol from "@/components/base/EmCol.vue";
import ApplicationForm from "@/components/forms/ApplicationForm.vue";
import { Application } from '@/models/application';
import EmCard from "@/components/base/EmCard.vue";
import SettingsHelp from "@/components/content/SettingsHelp.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import accessService from "@/services/access-service";
import {applicationsTableColumns} from "@/shared/tables-columns/applications-table-columns";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import EmLoadingContainer from '@/components/base/EmLoadingContainer.vue'
import {notificationProvider} from "@/services/notification-provider";

const store = useStore();
const router = useRouter();
const emptyApplication: Ref<Application> = ref({
  id: '',
  name: '',
  url: '',
  environment: '',
  gatewayId: '',
  isDevelopment: false,
  version: ''
});
const applicationForEdit: Ref<Application | null> = ref(null);
const detectedChange = ref(false);
const selectedApplication = computed(() => {
  return applicationForEdit.value ? applicationForEdit.value : emptyApplication.value;
})

const editMode = computed(() => {
  return applicationForEdit.value != null;
});

const formTitle = computed(() => {
  return editMode.value ? `Edit ${applicationForEdit.value?.name}` : 'Add a new application';
})

const applications = computed(() => {
  return store.getters['settingsModule/applications'];
})

async function saveApplication(application: Application, successCallback: () => void): Promise<void> {
  try {
    const gatewayResponse = await accessService.verifyPortalAccess(application);
    if (gatewayResponse.verified) {
      detectedChange.value = true;

      application.environment = gatewayResponse.environment;
      application.isDevelopment = gatewayResponse.isDevelopment;
      application.version = gatewayResponse.frameworkVersion;

      if (editMode.value) {
        store.commit('settingsModule/editApplication', application);
      }
      else {
        store.commit('settingsModule/addApplication', application);
      }

      notificationProvider.showSuccessToast('Application has been saved');
      successCallback();
      router.go(0);
      return;
    }
  }
  catch (e) {
    console.log("Portal access has not been verified");
  }

  notificationProvider.showErrorToast(`We cannot initialize a valid connection with '${application.name}'`);
}

function removeApplication(id: string): void {
  store.commit('settingsModule/removeApplication', id);
  notificationProvider.showSuccessToast('Application has been removed');
  router.go(0);
}

function selectApplicationForEdit(application: Application) {
  applicationForEdit.value = Object.assign({}, application);
}

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .info-icon {
    color: $info;
    font-size: 26px;
  }
</style>
