<template>
  <EmClientBuilderLayout>
    <EmMainCard
      :title="title"
      :sub-title="subTitle">
      <EmTable
        :columns="tableColumns"
        :data="endpoints">
        <template #authorized="{ value }">
          <EmFlag :value="value" />
        </template>
      </EmTable>
    </EmMainCard>
  </EmClientBuilderLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { endpointsTableColumns } from "@/shared/tables-columns/endpoints-table-columns";
import { strings } from "@/shared/strings";
import EmTable from "@/components/base/EmTable.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import clientBuilderService from "@/services/client-builder-service";
import { ApplicationEndpoint } from "@/models/application-endpoint";
import { handleRequestError } from "@/utils/helpers";
import { useNotifications } from "@/composables/notifications-composable";
import EmClientBuilderLayout from "@/components/layouts/EmClientBuilderLayout.vue";
import EmFlag from "@/components/base/EmFlag.vue";
export default defineComponent({
name: "EndpointsPage",
  components: {EmFlag, EmClientBuilderLayout, EmMainCard, EmTable},
  setup() {
    return {
      ...useNotifications()
    }
  },
  data() {
    return {
      title: strings.clientBuilder.endpointsPageTitle,
      subTitle: strings.clientBuilder.endpointsPageDescription,
      tableColumns: endpointsTableColumns,
      endpoints: [] as Array<ApplicationEndpoint>
    }
  },
  computed: {
    applicationUrl() {
      return this.$store.getters.applicationUrl;
    }
  },
  async mounted() {
    await this.loadEndpoints();
  },
  methods: {
    async loadEndpoints() {
      try {
        this.endpoints = await clientBuilderService.getEndpoints();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    }
  }
})
</script>

<style scoped>

</style>
