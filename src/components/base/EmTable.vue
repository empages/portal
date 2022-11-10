<template>
  <div class="card">
    <div
      v-if="props.tableTitle"
      class="card-header border-bottom d-flex align-items-center">
      <h5 class="me-auto">
        {{ props.tableTitle }}
      </h5>
      <slot name="bulkActions" />
    </div>
    <div class="table-responsive">
      <table class="table table-hover table-nowrap">
        <thead class="text-left table-light">
          <tr>
            <th
              v-for="column in props.columns"
              :key="`thead-th-${column.key}`"
              class="h-auto"
              scope="col"
              :class="column.thClass">
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!props.data || !props.data.length">
            <td colspan="100%">
              No records found
            </td>
          </tr>
          <tr
            v-for="(dataItem, dataItemIndex) in props.data"
            :key="`data-item-${dataItemIndex}`">
            <td
              v-for="column in props.columns"
              :key="`tbody-td-${column.key}`"
              class="text-left"
              :class="column.tdClass">
              <slot
                :name="column.key"
                :data="dataItem"
                :value="dataItem[column.key]">
                {{ dataItem[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {TableColumn} from "@/shared/types/table-column";

const props = defineProps<{
  columns: Array<TableColumn>,
  data: Array<any>,
  tableTitle: string
}>();

</script>

<style scoped>

</style>
