<template>
  <div class="em-page-index-view">
    <EmPageView :view-model="viewModel">
      <form
        class="d-block d-sm-flex"
        @submit.prevent="triggerFilter">
        <div class="me-0 ms-auto w-auto input-group mb-3 ">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Search.."
            aria-label="Search"
            aria-describedby="button-search">
          <button
            id="button-search"
            class="btn btn-primary"
            type="submit">
            Search
          </button>
        </div>
      </form>

      <EmPageTableView
        v-if="viewModel?.tableViewModel"
        :view-model="viewModel?.tableViewModel" />

      <EmPagination
        :model="viewModel?.tableViewModel.paginationModel"
        @select:page="selectPage" />
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
import {useRoute, useRouter} from "vue-router";
import EmPagination from "@/components/base/EmPagination.vue";

const props = defineProps<{
  pageRoute: string | null
}>();

const adminLayout = useAdminLayout();
const route = useRoute();
const router = useRouter();

const viewModel: Ref<EmPageIndexViewModel | null> = ref(null);
const page = ref(1);
const searchQuery = ref('');

async function loadViewModel(route: string | null) {
  viewModel.value = null;
  adminLayout.reset();
  viewModel.value = await adminService.getIndexViewModel(route || '', page.value, searchQuery.value);
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  resetQueryStringParams();
  await loadViewModel(value);
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
      page: page.value
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

function loadQueryParams() {
  page.value = (route.query.page || 1) as number;
  searchQuery.value = (route.query.searchQuery || '') as string;
}

function resetQueryStringParams() {
  page.value = 1;
  searchQuery.value = '';
}

</script>

<style scoped>

</style>
