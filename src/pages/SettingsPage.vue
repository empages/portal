<template>
  <EmRow>
    <EmCol
      sm="5"
      class="mb-4">
      <ApplicationForm
        :title="formTitle"
        :application="selectedApplication"
        @form:submit="saveApplication"
        @form:reset="applicationForEdit = null" />
    </EmCol>
    <EmCol
      sm="7"
      class="mb-4">
      <EmCard
        class="h-100"
        title="What you need to know?">
        <SettingsHelp />
      </EmCard>
    </EmCol>
  </EmRow>
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
import {useNotifications} from "@/composables/notifications-composable";
import {applicationsTableColumns} from "@/shared/tables-columns/applications-table-columns";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import EmLoadingContainer from '@/components/base/EmLoadingContainer.vue'

const { showSuccessToast, showErrorToast } = useNotifications();
const store = useStore();
const router = useRouter();
const emptyApplication: Ref<Application> = ref({
  id: '',
  name: '',
  url: '',
  environment: '',
  gatewayId: ''
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
  return editMode.value ? `Edit ${applicationForEdit.value?.name}` : 'Add new application';
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
      if (editMode.value) {
        store.commit('settingsModule/editApplication', application);
      }
      else {
        store.commit('settingsModule/addApplication', application);
      }

      showSuccessToast('Application has been saved');
      successCallback();
      router.go(0);
      return;
    }
  }
  catch (e) {
    console.log("Portal access has not been verified");
  }

  showErrorToast(`We cannot initialize a valid connection with '${application.name}'`);
}

function removeApplication(id: string): void {
  store.commit('settingsModule/removeApplication', id);
  showSuccessToast('Application has been removed');
  router.go(0);
}

function selectApplicationForEdit(application: Application) {
  applicationForEdit.value = Object.assign({}, application);
}

</script>

<style scoped>

</style>
