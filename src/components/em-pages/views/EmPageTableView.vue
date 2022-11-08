<template>
  <div>
    <!--    <EmTable-->
    <!--      :columns="[...tableColumns, ...actionColumns]"-->
    <!--      :data="tableData">-->
    <!--      <template-->
    <!--        v-for="(item, itemIndex) in tableColumns"-->
    <!--        :key="`table-item-key-${itemIndex}-${item.key}`"-->
    <!--        #[item.key]="{data}">-->
    <!--        <Component-->
    <!--          :is="getCell(data, item.key)?.component?.sourceName"-->
    <!--          :view-model="viewModel"-->
    <!--          :component="getCell(data, item.key)?.component"-->
    <!--          :renderer-value="getCell(data, item.key)?.value"-->
    <!--          v-bind="getCell(data, item.key)?.parameters" />-->
    <!--      </template>-->
    <!--      <template #actions="{ data, value }">-->
    <!--        <div class="d-flex">-->
    <!--          <div class="btn-group">-->
    <!--            <button-->
    <!--              class="btn btn-primary px-2 py-1 dropdown-toggle border-0"-->
    <!--              type="button"-->
    <!--              data-bs-toggle="dropdown"-->
    <!--              aria-expanded="false">-->
    <!--              Actions-->
    <!--            </button>-->
    <!--            <ul class="dropdown-menu">-->
    <!--              <li-->
    <!--                v-for="(action, actionIndex) in _.sortBy(value, x => x.order)"-->
    <!--                :key="`row-${data.identifier}-action-${actionIndex}`">-->
    <!--                <div class="dropdown-item dropdown-action-item">-->
    <!--                  <EmAction-->
    <!--                    :action="action"-->
    <!--                    class="row-action-container" />-->
    <!--                </div>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </EmTable>-->
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef} from "vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";
import _ from 'lodash';
import {EmPageTableViewModel} from "@/models/em-page-table-view-model";
import {EmPageTableHeadCellModel} from "@/models/em-page-table-head-cell-model";
import EmTable from "@/components/base/EmTable.vue";
import EmAction from "@/components/base/EmAction.vue";
import {PropertyMap} from "@/models/property-map";
import {EmPageComponent} from "@/models/em-page-component";

const props = defineProps<{
  viewModel: EmPageTableViewModel | null,
  propertyComponentMap: Array<PropertyMap<EmPageComponent>>
}>()

const tableData = computed(() => {
  if (!props.viewModel) {
    return [];
  }

  return props.viewModel?.rows.filter(x => x.cells.some(y => y.component.sourceName !== null));
})

const columnsWithoutComponent: ComputedRef<Array<string>> = computed(() => {
  return props.propertyComponentMap?.filter(x => x.value === null).map(x => x.property) || [];
})

const tableColumns = computed(() => {
  if (!props.viewModel) {
    return [];
  }

  return props
      .viewModel
      .headModel
      .cells
      .filter((x: EmPageTableHeadCellModel) => !columnsWithoutComponent.value.includes(x.identifier))
      .map((x: EmPageTableHeadCellModel) => {
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

<style scoped lang="scss">
  .dropdown-action-item {
    padding-left: .25rem;
    padding-right: .25rem;
    :deep {
      .btn {
        padding-right: .5rem !important;
        padding-left: .5rem !important;
        width: 100%;
        background: none !important;
        color: black !important;
        text-align: left;
        text-shadow: none !important;

        &:active,
        &focus {
          color: white !important;
        }
      }
    }
  }
</style>
