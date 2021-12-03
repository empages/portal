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
import EmPageView from '@/components/em-pages/views/EmPageView.vue'
import EmPageTableView from '@/components/em-pages/views/EmPageTableView.vue'
import { useAdminLayout } from '@/composables/admin-layout-composable'
import { onMounted, ref, Ref, watch } from 'vue'
import adminService from '@/services/admin-service'
import { EmPageIndexViewModel } from '@/models/em-page-index-view-model'
import {usePageSettings} from "@/composables/page-settings-composables";
import {getPluralFormat} from "@/shared/helpers";

const props = defineProps<{
  pageRoute: string | null,
  identifier: string | null,
  feature: string | null
}>()

const adminLayout = useAdminLayout();
const pageSettings = usePageSettings();
const viewModel: Ref<EmPageIndexViewModel | null> = ref(null);

async function loadViewModel (route: string | null, identifier: string | null, feature: string | null) {
  try {
    viewModel.value = await adminService.getFeatureIndexViewModel(route || '', identifier || '', feature || '');
    pageSettings.setTitle(getPluralFormat(viewModel.value?.context?.title), 'Admin');
    adminLayout.reload({
      breadcrumbs: viewModel.value.context.breadcrumbs,
      navbarActions: viewModel.value.context.navbarActions
    })
  }
  catch (e: any) {
    await pageSettings.throwEmPageRequestError(e);
  }
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value, props.identifier, props.feature);
})

watch(() => props.identifier, async (value) => {
  await loadViewModel(props.pageRoute, value, props.feature);
})

watch(() => props.feature, async (value) => {
  await loadViewModel(props.pageRoute, props.identifier, value);
})

onMounted(async () => {
  await loadViewModel(props.pageRoute, props.identifier, props.feature);
})
</script>

<style scoped>

</style>
