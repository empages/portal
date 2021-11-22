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
import {computed} from "vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";
import _ from 'lodash';
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageTableHeadCellModel} from "@/models/em-page-table-head-cell-model";
import EmTable from "@/components/base/EmTable.vue";

const props = defineProps<{
  viewModel: EmPageTableViewModel | null
}>()

const tableData = computed(() => {
  if (!props.viewModel) {
    return [];
  }

  return props.viewModel?.rows;
})

const tableColumns = computed(() => {
  if (!props.viewModel) {
    return [];
  }

  return props.viewModel.headModel.cells.map((x: EmPageTableHeadCellModel) => {
    return {
      key: x.identifier,
      title: x.name
    }
  });
})

const actionColumns = computed(() => {
  if (!props.viewModel?.hasActions) {
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

</script>

<style scoped>

</style>
