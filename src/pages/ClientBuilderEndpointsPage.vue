<template>
  <EmMainCard
    :title="strings.clientBuilder.endpointsPageTitle"
    :sub-title="strings.clientBuilder.endpointsPageDescription">
    <EmTable
      :columns="endpointsTableColumns"
      :data="endpoints">
      <template #authorized="{ value }">
        <EmFlag :value="value" />
      </template>
    </EmTable>
  </EmMainCard>
</template>

<script lang="ts" setup>
import {onMounted, ref, Ref} from "vue";
import { endpointsTableColumns } from "@/shared/tables-columns/endpoints-table-columns";
import { strings } from "@/shared/strings";
import EmTable from "@/components/base/EmTable.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import clientBuilderService from "@/services/client-builder-service";
import { ApplicationEndpoint } from "@/models/application-endpoint";
import { handleRequestError } from "@/shared/helpers";
import EmFlag from "@/components/base/EmFlag.vue";
import {notificationProvider} from "@/services/notification-provider";

const endpoints: Ref<ApplicationEndpoint[]> = ref([]);

async function loadEndpoints() {
  try {
    endpoints.value = await clientBuilderService.getEndpoints();
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

onMounted(async () => await loadEndpoints())

</script>

<style scoped>

</style>
