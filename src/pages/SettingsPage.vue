<template>
  <EmBaseLayout>
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
      <EmTable
        :columns="settingsTableColumns"
        :data="applications">
        <template #actions="{ data }">
          <button
            class="btn btn-primary px-2 py-1 mx-2px me-1"
            @click="applicationForEdit = data">
            Select to edit
          </button>
          <EmConfirmation
            v-slot="{ context }"
            class="d-inline-block"
            :confirmation-word="data.name"
            :message="`Are you sure you want to remove ${data.name} (${data.url}) from the application list?`"
            :callback="() => removeApplication(data.id)">
            <button
              class="btn btn-primary px-2 py-1 mx-2px"
              @click="context.show">
              Remove
            </button>
          </EmConfirmation>
        </template>
      </EmTable>
    </EmCard>
  </EmBaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmBaseLayout from "@/components/layouts/EmBaseLayout.vue";
import EmTable, {EmTableColumn} from "@/components/base/EmTable.vue";
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
export default defineComponent({
name: "SettingsPage",
  components: {EmConfirmation, SettingsHelp, EmCard, ApplicationForm, EmCol, EmRow, EmTable, EmBaseLayout},
  setup() {
    const { showSuccessToast, showErrorToast } = useNotifications();
    return {
      showSuccessToast,
      showErrorToast
    }
  },
  data() {
    return {
      emptyApplication: {
        name: '',
        url: '',
        gatewayId: ''
      } as Application,
      applicationForEdit: null as Application | null,
      settingsTableColumns: applicationsTableColumns as Array<EmTableColumn>,
    }
  },
  computed: {
    selectedApplication(): Application {
      return this.applicationForEdit ? this.applicationForEdit : this.emptyApplication;
    },
    editMode(): boolean {
      return !!this.applicationForEdit;
    },
    formTitle(): string {
      if (!this.editMode) {
        return 'Add new application'
      }

      return `Edit ${this.applicationForEdit?.name}`;
    },
    applications() {
      return this.$store.getters['settingsModule/applications'];
    }
  },
  methods: {
    async saveApplication(application: Application, successCallback: () => void): Promise<void> {
      try {
        const gatewayResponse = await accessService.verifyPortalAccess(application);
        if (gatewayResponse.verified) {
          application.environment = gatewayResponse.environment;
          if (this.editMode) {
            this.$store.commit('settingsModule/editApplication', application);
          }
          else {
            this.$store.commit('settingsModule/addApplication', application);
          }

          this.showSuccessToast('Application has been saved');
          successCallback();
          return;
        }
      }
      catch (e) {
        console.log("Portal access has not been verified");
      }

      this.showErrorToast(`We cannot initialize a valid connection with '${application.name}'`);
    },
    removeApplication(id: string): void {
      this.$store.commit('settingsModule/removeApplication', id);
      this.showSuccessToast('Application has been removed');
    }
  }
})
</script>

<style scoped>

</style>
