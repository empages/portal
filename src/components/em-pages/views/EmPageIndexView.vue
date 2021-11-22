<template>
  <div class="em-page-index-view">
    <EmPageView :view-model="viewModel">
      <EmPageTableView
        v-if="viewModel?.tableViewModel"
        :view-model="viewModel?.tableViewModel" />
    </EmPageView>
  </div>
</template>

<script lang="ts" setup>

import adminService from "@/services/admin-service";
import {onMounted, ref, Ref, watch} from "vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";
import EmPageTableView from "@/components/em-pages/views/EmPageTableView.vue";
import EmPageView from "@/components/em-pages/views/EmPageView.vue";

const props = defineProps<{
  pageRoute: string | null
}>();

const adminLayout = useAdminLayout();

const viewModel: Ref<EmPageIndexViewModel | null> = ref(null);

async function loadViewModel(route: string | null) {
  viewModel.value = null;
  adminLayout.reset();
  viewModel.value = await adminService.getIndexViewModel(route || '');
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value);
})

onMounted(async () => {
  await loadViewModel(props.pageRoute);
})

</script>

<style scoped>

</style>
