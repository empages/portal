<template>
  <div class="responsive-table table-container">
    <table class="table table-hover table-striped table-bordered">
      <thead class="text-left">
        <tr>
          <th
            v-for="column in props.columns"
            :key="`thead-th-${column.key}`"
            class="p-2 h-auto"
            :class="column.thClass">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(dataItem, dataItemIndex) in props.data"
          :key="`data-item-${dataItemIndex}`">
          <td
            v-for="column in props.columns"
            :key="`tbody-td-${column.key}`"
            class="px-2 py-0 text-left"
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
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

export interface EmTableColumn {
  key: string;
  title: string;
  thClass?: string | undefined;
  tdClass?: string | undefined;
}

const props = defineProps<{
  columns: Array<EmTableColumn>,
  data: Array<any>
}>();

</script>

<style scoped>

</style>
