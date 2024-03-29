<template>
  <div class="d-flex">
    <EmDropdown
      v-if="selectedApplication"
      auto-close="outside"
      button-classes="d-flex btn-icon"
      menu-classes="dropdown-menu-end"
      :title="`${selectedApplication.name} (${selectedApplication.url})`">
      <template #title>
        <i class="mdi mdi-dots-grid button-icon" />
      </template>
      <template #menu="{ context }">
        <li
          class="selected-application-section"
          :class="{ 'connected': isSelectedApplicationConnected, 'disconnected': !isSelectedApplicationConnected }">
          <div>
            <p class="item-name my-1">
              {{ selectedApplication.name }}
            </p>
            <div class="item-url">
              <span class="sub-section-text">URL:</span>
              <strong>{{ selectedApplication.url }}</strong>
            </div>
            <div>
              <span class="sub-section-text">Environment:</span>
              <span class="badge bg-dark section-badge">{{ selectedApplication.environment }}</span>
            </div>
            <div class="d-block">
              <span class="sub-section-text">Status:</span>
              <span
                v-if="isSelectedApplicationConnected"
                class="badge bg-success section-badge">connected</span>
              <span
                v-if="!isSelectedApplicationConnected"
                class="badge bg-danger section-badge">disconnected</span>
            </div>
          </div>
        </li>
        <li class="dropdown-divider" />
        <i class="text-muted m-0 text-small px-3 w-100 d-block">
          Applications
        </i>
        <li
          v-for="app in applications"
          :key="`auth-app-${app.id}`"
          class="dropdown-item"
          :class="{ 'disabled': selectedApplication && app.id === selectedApplication.id }"
          @click="() => { context?.hide(); selectApplication(app.id); }">
          <i class="mdi mdi-application" /> <span class="item-name">{{ app.name }}</span> <span class="item-url">({{ app.url }})</span>
        </li>
        <li class="dropdown-divider" />
        <li class="help-section">
          To configure the Emeraude Portal and included applications use the <RouterLink
            :to="{ name: 'settings' }"
            title="Settings">
            Settings
          </RouterLink>
        </li>
      </template>
    </EmDropdown>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, onMounted} from 'vue'
import EmDropdown from "@/components/base/EmDropdown.vue";
import {Application} from "@/models/application";
import accessService from '@/services/access-service';
import clientBuilderService from '@/services/client-builder-service';
import adminService from '@/services/admin-service';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {notificationProvider} from "@/services/notification-provider";

const store = useStore();
const router = useRouter();

const applications = computed(() => {
  return store.getters['settingsModule/applications'];
})

const selectedApplication: ComputedRef<Application> = computed(() => {
  return store.getters['settingsModule/selectedApplication']
})

const isSelectedApplicationConnected = computed(() => {
  return store.getters['settingsModule/isSelectedApplicationConnected'];
})

async function refreshApplicationState(ignoreSuccessMessage = false) {
  let isSelectedApplicationConnected = false;
  try {
    const application = store.getters["settingsModule/selectedApplication"];
    const response = await accessService.verifyPortalAccess(application);
    if (!response.verified) {
      notificationProvider.showErrorToast('Emeraude Portal cannot initialize a connection with the selected application');
      isSelectedApplicationConnected = false;
    }
    else {
      if (!ignoreSuccessMessage) {
        notificationProvider.showSuccessToast(`Emeraude Portal has been connected with '${application.name}'`);
      }

      isSelectedApplicationConnected = true;
      adminService.setApplication(application);
      clientBuilderService.setApplication(application);
    }
  }
  catch (e) {
    notificationProvider.showErrorToast('Emeraude Portal cannot initialize a connection with the selected application');
    isSelectedApplicationConnected = false;
  }

  store.commit('settingsModule/setIsSelectedApplicationConnected', isSelectedApplicationConnected);
}

async function selectApplication(applicationId: string): Promise<void> {
  if (selectedApplication.value && selectedApplication.value.id === applicationId) {
    return;
  }

  store.commit('settingsModule/selectApplication', applicationId);
  router.go(0);
}

onMounted(async () => {
  await refreshApplicationState(true);
})
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .button-icon {
    display: flex;
    padding: 3px;
  }

  .dropdown-item {
    width: 100%;
    font-size: 14px;
    cursor: pointer;

    .item-name {
      font-weight: bold;
    }

    .item-url {
      font-size: 12px;
    }
  }

  :deep(.em-dropdown) {
    &.dropdown-toggle::after {
      display: none;
    }
  }

  .help-section {
    padding: 6px 1rem;
    font-size: 12px;
  }

  .selected-application-section {
    padding: 6px 1rem;
    border-left: 5px solid rgba(0,0,0,.5);
    .item-name {
      font-weight: bold;
      margin: 0;
    }

    &.connected {
      border-color: $success;
    }

    &.disconnected {
      border-color: $danger;
    }

    .item-url {
      font-size: 12px;
      margin: 0;
    }

    .sub-section-text {
      font-size: 12px;
      margin-right: 4px;
    }

    .section-badge {
      font-size: 9px;
      text-transform: uppercase;
      font-weight: normal;
      margin-right: 3px;
    }
  }
</style>
