<template>
  <EmAdminLayout>
    <EmTable
      :columns="tableColumns"
      :data="tableData">
      <template
        v-for="(item, itemIndex) in tableColumns"
        :key="`table-item-key-${itemIndex}-${item.key}`"
        #[item.key]="{data}">
        <Component
          :is="getCell(data, item.key).component.sourceName"
          :set="cell = getCell(data, item.key)"
          :view-model="viewModel"
          :component="cell.component"
          :renderer-value="cell.value"
          v-bind="cell.parameters" />
      </template>
    </EmTable>
  </EmAdminLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
import adminService from '@/services/admin-service';
import {EmPageTableViewModel} from '@/models/em-page-table-view-model';
import {EmPageTableHeadCellModel} from '@/models/em-page-table-head-cell-model';
import EmTable, {EmTableColumn} from "@/components/base/EmTable.vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";

export default defineComponent({
name: "AdminTableViewEmPage",
  components: {EmTable, EmAdminLayout},
  data(): any {
    return {
      viewModel: null as EmPageTableViewModel | null
    }
  },
  computed: {
    route() {
      return this.$route.params.route;
    },
    tableData(): any {
      if (!this.viewModel) {
        return [];
      }

      return this.viewModel.rows;
    },
    tableColumns(): Array<EmTableColumn> {
      if (!this.viewModel) {
        return [];
      }

      return this.viewModel.headModel.cells.map((x: EmPageTableHeadCellModel) => {
        return {
          key: x.identifier,
          title: x.name
        }
      });
    }
  },
  watch: {
    async route(value) {
      this.viewModel = await adminService.getTableViewModel(value);
      console.log(this.viewModel);
    }
  },
  async mounted() {
    this.viewModel = await adminService.getTableViewModel(this.route);
  },
  methods: {
    getCell(row: EmPageTableRowModel, property: string) {
      return row.cells.find(x => x.property === property)
    },
  }
})
</script>

<style scoped>

</style>
