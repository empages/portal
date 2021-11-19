<template>
  <table
    v-if="viewModel"
    class="table table-striped">
    <tbody>
      <tr
        v-for="(field, fieldIndex) in _.sortBy(fields, x => x.order)"
        :key="`details-field-${fieldIndex}`">
        <td>
          <strong>{{ field.title }}:</strong>
        </td>
        <td class="white-space-normal">
          <Component
            :is="field?.component.sourceName"
            :view-model="viewModel"
            :component="field?.component"
            :renderer-value="field?.value"
            v-bind="field?.parameters" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import adminService from "@/services/admin-service";
import {ref, Ref, defineProps, watch, onMounted, computed} from "vue";
import {EmPageDetailsViewModel} from "@/models/em-page-details-view-model";
import _ from "lodash";
import {useAdminLayout} from "@/composables/admin-layout-composable";

const props = defineProps<{
  pageRoute: string | null,
  identifier: string | null
}>()

const adminLayout = useAdminLayout();

const viewModel: Ref<EmPageDetailsViewModel | null> = ref(null);

async function loadViewModel (route: string | null, identifier: string | null) {
  viewModel.value = await adminService.getDetailsViewModel(route || '', identifier || '');
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value, props.identifier);
})

watch(() => props.identifier, async (value) => {
  await loadViewModel(props.pageRoute, value);
})

const fields = computed(() => viewModel.value?.fields);

onMounted(async () => {
  await loadViewModel(props.pageRoute, props.identifier);
})

</script>

<style scoped>

</style>
