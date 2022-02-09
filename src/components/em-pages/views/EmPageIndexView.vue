<template>
  <div class="em-page-index-view">
    <EmPageView :view-model="viewModel">
      <div v-if="viewModel?.tableViewModel">
        <EmPageFilterBar
          v-model:order-by="orderBy"
          v-model:search-query="searchQuery"
          v-model:order-by-type="orderByType"
          @on:filter="triggerFilter"
          :view-model="viewModel"
          :order-by-properties="orderByProperties" />
        <EmPageTableView :view-model="viewModel?.tableViewModel" :property-component-map="viewModel?.propertyComponentMap" />
        <EmPagination
          :model="viewModel?.tableViewModel.paginationModel"
          @select:page="selectPage" />
      </div>
      <div v-if="viewModel?.customViewModel">
        <EmPageCustomView :view-model="viewModel?.customViewModel" />
      </div>
    </EmPageView>
  </div>
</template>

<script lang="ts" setup>

import adminService from "@/services/admin-service";
import {computed, onMounted, ref, Ref, watch} from "vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";
import EmPageTableView from "@/components/em-pages/views/EmPageTableView.vue";
import EmPageView from "@/components/em-pages/views/EmPageView.vue";
import {useRoute, useRouter} from "vue-router";
import EmPagination from "@/components/base/EmPagination.vue";
import {usePageSettings} from "@/composables/page-settings-composables";
import {getPluralFormat} from "@/shared/helpers";
import EmPageCustomView from "@/components/em-pages/views/EmPageCustomView.vue";
import EmPageFilterBar from "@/components/em-pages/views/EmPageFilterBar.vue";
import {useEmPageFilter} from "@/composables/em-page-index-filter-composable";

const props = defineProps<{
  pageRoute: string | null
}>();

const adminLayout = useAdminLayout();
const pageSettings = usePageSettings();
const route = useRoute();
const router = useRouter();

const viewModel: Ref<EmPageIndexViewModel | null> = ref(null);

const { page, searchQuery, orderByType, orderBy, orderByProperties, orderByTypes, loadQueryParams, resetQueryStringParams, preventInvalidProperties } = useEmPageFilter(viewModel)

async function loadViewModel(route: string | null) {
  try {
    viewModel.value = null;
    adminLayout.reset();
    viewModel.value = await adminService.getIndexViewModel(
        route || '',
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
  await loadViewModel(value);
})

watch(orderByProperties, () => {
  preventInvalidProperties();
})

onMounted(async () => {
  loadQueryParams();
  await loadViewModel(props.pageRoute);
})

async function reloadView() {
  await router.push({
    name: 'admin-em-page-index-view',
    params: {
      route: viewModel.value?.context.route
    },
    query: {
      searchQuery: searchQuery.value,
      page: page.value,
      orderBy: orderBy.value,
      orderType: orderByType.value
    }
  });

  await loadViewModel(viewModel.value?.context.route ?? '');
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
