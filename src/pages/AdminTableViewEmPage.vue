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
          :is="getCell(data, item.key)?.component?.sourceName"
          :view-model="viewModel"
          :component="getCell(data, item.key)?.component"
          :renderer-value="getCell(data, item.key)?.value"
          v-bind="getCell(data, item.key)?.parameters" />
      </template>
    </EmTable>
  </EmAdminLayout>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref} from 'vue'
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
import adminService from '@/services/admin-service';
import {EmPageTableViewModel} from '@/models/em-page-table-view-model';
import {EmPageTableHeadCellModel} from '@/models/em-page-table-head-cell-model';
import EmTable, {EmTableColumn} from "@/components/base/EmTable.vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";

export default defineComponent({
name: "AdminTableViewEmPage",
  components: {EmTable, EmAdminLayout},
  setup() {
    let viewModel: Ref<EmPageTableViewModel | null> = ref(null);
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

    return {
      viewModel,
      tableData,
      tableColumns
    }
  },
  computed: {
    route() {
      return this.$route.params.route;
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
