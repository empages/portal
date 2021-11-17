<template>
  <EmAdminLayout>
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
            v-for="(action, actionIndex) in orderedActions(value)"
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
  </EmAdminLayout>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, ref} from 'vue'
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
import adminService from '@/services/admin-service';
import {EmPageTableViewModel} from '@/models/em-page-table-view-model';
import {EmPageTableHeadCellModel} from '@/models/em-page-table-head-cell-model';
import EmTable from "@/components/base/EmTable.vue";
import {EmPageTableRowModel} from "@/models/em-page-table-row-model";
import _ from 'lodash';
import {ActionModel} from "@/models/action-model";

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

    return {
      viewModel,
      tableData,
      tableColumns,
      actionColumns
    }
  },
  computed: {
    route() {
      return this.$route.params.route;
    }
  },
  watch: {
    async route(value) {
      await this.loadViewModel(value);
    }
  },
  async mounted() {
    await this.loadViewModel(this.route);
  },
  methods: {
    getCell(row: EmPageTableRowModel, property: string) {
      return row.cells.find(x => x.property === property)
    },
    async loadViewModel(route: any) {
      this.viewModel = await adminService.getTableViewModel(route);
      this.$store.commit('breadcrumbsModule/setBreadcrumbs', this.viewModel.context.breadcrumbs);
      this.$store.commit('navActionsModule/setActions', this.viewModel.context.navbarActions);
    },
    orderedActions(actions: Array<ActionModel>): Array<ActionModel> {
      return _.sortBy(actions, x => x.order);
    }
  }
})
</script>

<style scoped>

</style>
