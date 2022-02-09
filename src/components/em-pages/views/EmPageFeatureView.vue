<template>
  <div class="em-page-index-view">
    <EmPageView :view-model="viewModel">
      <EmPageFilterBar
          v-model:order-by="orderBy"
          v-model:search-query="searchQuery"
          v-model:order-by-type="orderByType"
          @on:filter="triggerFilter"
          :view-model="viewModel"
          :order-by-properties="orderByProperties" />
      <EmPageTableView
        v-if="viewModel?.tableViewModel"
        :view-model="viewModel?.tableViewModel"
        :property-component-map="viewModel?.propertyComponentMap"/>
      <EmPagination
          :model="viewModel?.tableViewModel.paginationModel"
          @select:page="selectPage" />
    </EmPageView>
  </div>
</template>

<script lang="ts" setup>
import EmPageView from '@/components/em-pages/views/EmPageView.vue'
import EmPageTableView from '@/components/em-pages/views/EmPageTableView.vue'
import { useAdminLayout } from '@/composables/admin-layout-composable'
import {computed, onMounted, ref, Ref, watch} from 'vue'
import adminService from '@/services/admin-service'
import { EmPageIndexViewModel } from '@/models/em-page-index-view-model'
import {usePageSettings} from "@/composables/page-settings-composables";
import {getPluralFormat} from "@/shared/helpers";
import {useEmPageFilter} from "@/composables/em-page-index-filter-composable";
import EmPageFilterBar from "@/components/em-pages/views/EmPageFilterBar.vue";
import {useRoute, useRouter} from "vue-router";
import EmPagination from "@/components/base/EmPagination.vue";

const props = defineProps<{
  pageRoute: string | null,
  identifier: string | null,
  feature: string | null
}>()

const router = useRouter();
const route = useRoute();
const adminLayout = useAdminLayout();
const pageSettings = usePageSettings();
const viewModel: Ref<EmPageIndexViewModel> = ref({} as EmPageIndexViewModel);

const { page, searchQuery, orderByType, orderBy, orderByProperties, orderByTypes, loadQueryParams, resetQueryStringParams, preventInvalidProperties } = useEmPageFilter(viewModel)

async function loadViewModel (route: string | null, identifier: string | null, feature: string | null) {
  try {
    viewModel.value = {} as EmPageIndexViewModel;
    adminLayout.reset();
    viewModel.value = await adminService.getFeatureIndexViewModel(
        route || '',
        identifier || '',
        feature || '',
        page.value,
        searchQuery.value,
        orderBy.value || '',
        orderByType.value || orderByTypes[0]);
    pageSettings.setTitle(getPluralFormat(viewModel.value?.context?.title), 'Admin');
    adminLayout.reload({
      navbarActions: viewModel.value.context.navbarActions
    })
  }
  catch (e: any) {
    await pageSettings.throwEmPageRequestError(e);
  }
}

watch(() => props.pageRoute, async (value) => {
  resetQueryStringParams();
  await loadViewModel(value, props.identifier, props.feature);
})

watch(() => props.identifier, async (value) => {
  resetQueryStringParams();
  await loadViewModel(props.pageRoute, value, props.feature);
})

watch(() => props.feature, async (value) => {
  resetQueryStringParams();
  await loadViewModel(props.pageRoute, props.identifier, value);
})

watch(orderByProperties, (value) => {
  preventInvalidProperties();
})

onMounted(async () => {
  loadQueryParams();
  await loadViewModel(props.pageRoute, props.identifier, props.feature);
})

async function reloadView() {
  await router.push({
    name: 'admin-em-page-feature-view',
    params: {
      route: route.params.route,
      feature: route.params.feature,
    },
    query: {
      searchQuery: searchQuery.value,
      page: page.value,
      orderBy: orderBy.value,
      orderType: orderByType.value
    }
  });

  await loadViewModel(props.pageRoute, props.identifier, props.feature);
}

async function selectPage(selectedPage: number) {
  page.value = selectedPage;
  await reloadView();
}

async function triggerFilter() {
  page.value = 1;
  await reloadView();
}
</script>

<style scoped>

</style>
