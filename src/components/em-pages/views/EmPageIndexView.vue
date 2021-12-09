<template>
  <div class="em-page-index-view">
    <EmPageView :view-model="viewModel">
      <div v-if="viewModel?.tableViewModel">
        <form
          class="d-block d-sm-flex"
          @submit.prevent="triggerFilter">
          <div class="me-auto ms-0 w-auto mb-3 input-group">
            <select
              v-model="orderBy"
              class="form-control w-auto"
              aria-describedby="button-order-by">
              <option :value="''">
                -- Default Order --
              </option>
              <option
                v-for="(orderByProperty, orderByPropertyIndex) in orderByProperties"
                :key="`${viewModel?.context.route}-order-by-${orderByPropertyIndex}`"
                :value="orderByProperty.value">
                {{ orderByProperty.value }}
              </option>
            </select>
            <select
              v-model="orderByType"
              class="form-control w-auto"
              aria-describedby="button-order-by">
              <option :value="orderByTypes[0]">
                Ascending
              </option>
              <option :value="orderByTypes[1]">
                Descending
              </option>
            </select>
            <button
              id="button-order-by"
              class="btn btn-primary"
              type="submit">
              Order
            </button>
          </div>
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
        <EmPageTableView :view-model="viewModel?.tableViewModel" />
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

const props = defineProps<{
  pageRoute: string | null
}>();

const adminLayout = useAdminLayout();
const pageSettings = usePageSettings();
const route = useRoute();
const router = useRouter();

const orderByTypes = ['asc', 'desc'];

const viewModel: Ref<EmPageIndexViewModel | null> = ref(null);
const page = ref(1);
const searchQuery = ref('');
const orderBy: Ref<string> = ref('');
const orderByType: Ref<string | null> = ref(orderByTypes[0]);

const orderByProperties = computed(() => {
  const propertyDictionary = viewModel.value?.tableViewModel.orderProperties;
  if (!propertyDictionary) {
    return [];
  }

  const keys = Object.keys(propertyDictionary);
  return keys.map(x => {
    return {
      key: x,
      value: propertyDictionary[x]
    }
  });
})

async function loadViewModel(route: string | null) {
  try {
    viewModel.value = null;
    adminLayout.reset();
    viewModel.value = await adminService.getIndexViewModel(route || '', page.value, searchQuery.value, orderBy.value || '', orderByType.value || orderByTypes[0]);
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

function loadQueryParams() {
  page.value = (route.query.page || 1) as number;
  searchQuery.value = (route.query.searchQuery || '') as string;
  orderBy.value = (route.query.orderBy || '') as string;
  orderByType.value = (route.query.orderType || orderByTypes[0]) as string;

  if (orderBy.value && !orderByProperties.value.some(x => x.key === orderBy.value)) {
    orderBy.value = ''
  }

  if (orderByType.value && !orderByTypes.includes(orderByType.value)) {
    orderByType.value = orderByTypes[0];
  }
}

function resetQueryStringParams() {
  page.value = 1;
  searchQuery.value = '';
  orderBy.value = '';
  orderByType.value = orderByTypes[0];
}

</script>

<style scoped>

</style>
