<template>
  <EmTable
    :columns="[...tableColumns, ...actionColumns]"
    :data="tableData">
    <template
      v-for="(item, itemIndex) in tableColumns"
      :key="`table-item-key-${itemIndex}-${item.key}`"
      #[item.key]="{data}">
      <Component
        :is="getCell(data, item.key)?.component?.sourceName"
        :view-model="viewModel"
        :component="getCell(data, item.key)?.component"
        :renderer-value="getCell(data, item.key)?.value"
        v-bind="getCell(data, item.key)?.parameters" />
    </template>
    <template #actions="{ data, value }">
      <div class="d-flex">
        <div
          v-for="(action, actionIndex) in _.sortBy(value, x => x.order)"
          :key="`row-${data.identifier}-action-${actionIndex}`"
          class="row-action-container">
          <RouterLink
            class="btn btn-primary px-2 py-1"
            :title="action.title"
            :to="action.actionUrl">
            {{ action.title }}
          </RouterLink>
        </div>
      </div>
    </template>
  </EmTable>
</template>

<script lang="ts" setup>
import {computed, defineProps, onMounted, ref, Ref, watch} from "vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";
import adminService from "@/services/admin-service";
import _ from 'lodash';
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageTableHeadCellModel} from "@/models/em-page-table-head-cell-model";
import EmTable from "@/components/base/EmTable.vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";

const props = defineProps<{
  pageRoute: string
}>()

const adminLayout = useAdminLayout();

const viewModel: Ref<EmPageTableViewModel | null> = ref(null);
const tableData = computed(() => {
  if (!viewModel.value) {
    return [];
  }

  return viewModel.value.rows;
})

const tableColumns = computed(() => {
  if (!viewModel.value) {
    return [];
  }

  return viewModel.value.headModel.cells.map((x: EmPageTableHeadCellModel) => {
    return {
      key: x.identifier,
      title: x.name
    }
  });
})

const actionColumns = computed(() => {
  if (!viewModel.value?.hasActions) {
    return []
  }

  return [{
    key: 'actions',
    title: 'Actions',
    thClass: 'fit',
  }]
})

function getCell(row: EmPageTableRowModel, property: string) {
  return row.cells.find(x => x.property === property)
}

async function loadViewModel(route: string) {
  viewModel.value = await adminService.getTableViewModel(route);
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value);
})

onMounted(async () => {
  await loadViewModel(props.pageRoute);
})

</script>

<style scoped>

</style>
