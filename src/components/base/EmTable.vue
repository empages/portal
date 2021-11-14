<template>
  <div class="responsive-table table-container">
    <table class="table table-hover table-striped table-bordered">
      <thead class="text-left">
        <tr>
          <th
            v-for="column in columns"
            :key="`thead-th-${column.key}`"
            class="p-2 h-auto"
            :class="column.thClass">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(dataItem, dataItemIndex) in data"
          :key="`data-item-${dataItemIndex}`">
          <td
            v-for="column in columns"
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

<script lang="ts">
import {defineComponent} from "vue";

export interface EmTableColumn {
  key: string;
  title: string;
  thClass: string | undefined;
  tdClass: string | undefined;
}

export default defineComponent({
  name: "EmTable",
  props: {
    columns: {
      type: Object as () => Array<EmTableColumn>,
      required: true
    },
    data: {
      type: Array as () => Array<any>,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
