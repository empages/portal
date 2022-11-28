`<template>
  <div>
    <EmTable
      :columns="tableColumns"
      :data="tableData">
      <template
        v-for="column in columnKeys"
        #[column]="{data}"
        :key="`table-${data.index}-${column}`">
        <div
          v-if="getComponent(column)"
          class="table-component-renderer">
          <EmComponent
            v-model="data[column]"
            :component="getComponent(column)" />
        </div>
        <div v-else>
          <span class="alert alert-warning">
            No renderer component has been found
          </span>
        </div>
      </template>
      <template #actions="{data}">
        <EmDropdown
          button-classes="btn btn-neutral btn-sm"
          :toggle-icon="false">
          <template #title>
            <i class="mdi mdi-dots-vertical" />
          </template>
          <template #menu>
            <li
              v-for="(action, actionIndex) in data.actions"
              :key="`row-${data.index}-action-${actionIndex}`">
              <a
                href="javascript:void(0);"
                class="dropdown-item cursor-pointer"
                @click="handleAction(action)">
                {{ action.title }}
              </a>
            </li>
          </template>
        </EmDropdown>
      </template>
    </EmTable>
  </div>
</template>
+
<script lang="ts" setup>

import type {EmTableResponseModel} from "@/core/types";
import EmTable from "@/components/base/EmTable.vue";
import type {ComputedRef} from "vue";
import type {TableColumn} from "@/shared/types/table-column";
import {computed} from "vue";
import EmDropdown from "@/components/base/EmDropdown.vue";
import {EmResponseAction, EmResponseComponent, PageActionType} from "@/core/types";
import {useRouter} from "vue-router";
import pageService from "@/services/page-service";
import {notificationService} from "@/services/notification-service";
import EmComponent from "@/core/components/EmComponent.vue";

const props = defineProps<{
  model: EmTableResponseModel;
  route: string;
}>()

const router = useRouter();

const tableColumns: ComputedRef<TableColumn[]> = computed(() => {
  const modelColumns = props.model.header.cells.map(x => {
    return {
      key: `col_${x.index}`,
      title: x.title,
      tdClass: '',
      thClass: '',
    } as TableColumn
  });

  modelColumns.push({
    key: 'actions',
    title: 'Actions',
    tdClass: 'fit',
    thClass: 'fit'
  } as TableColumn)

  return modelColumns;
})

const columnKeys = computed(() => {
  return tableColumns
      .value
      .filter(x => x.key.startsWith("col_"))
      .map(x => x.key);
})

const tableData: ComputedRef<any[]> = computed(() => {
  const data = [];
  for (const row of props.model.rows) {
    const dataItem: any = {
      index: row.index,
      actions: row.actions
    };

    for (const cell of row.cells) {
      dataItem[`col_${cell.index}`] = cell.value;
    }

    data.push(dataItem);
  }

  return data;
})

function getComponent(column: string): EmResponseComponent | undefined {
  return props.model.components.find(x => `col_${x.index}` === column);
}

async function handleAction(action: EmResponseAction) {
  switch (action.type) {
    case PageActionType.Redirection:
      await router.push(`/em${action.target}`);
      break;
    case PageActionType.Command:
      try {
        const result = await pageService.command(props.route, action.target);
        if (result.succeeded) {
          notificationService.showSuccessToast(result.message);
        }
        else {
          notificationService.showErrorToast(result.message);
        }
      }
      catch (e) {
        notificationService.showErrorToast('An unexpected error occurred');
        console.log(e);
      }
  }
}

</script>

<style scoped>
</style>
`
