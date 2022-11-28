<template>
  <div id="empage-instance">
    <div v-if="pageResponseModel">
      <Component
        :is="pageResponseModel.pageType"
        :model="pageResponseModel"
        :route="routeValue" />
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useRoute} from "vue-router";
import {computed, onMounted, provide, ref, type Ref, watch} from "vue";
import pageService from "@/services/page-service";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import {emPageResponseInjectionKey} from "@/core/composables";

const route = useRoute();
const layout = useAdminLayout();

const routeValue = computed(() => {
  let routeArg = route.params.route;
  if (Array.isArray(routeArg)) {
    routeArg = route.params.route.join('/');
  }

  return '/' + routeArg;
})

const pageResponseModel: Ref<any | null> = ref(null);
provide(emPageResponseInjectionKey, pageResponseModel);

async function reloadModel(route: string) {
  pageResponseModel.value = await pageService.retrieve(route);
}

watch(routeValue, async (value) => {
  await reloadModel(value);
})

onMounted(async () => {
  await reloadModel(routeValue.value);
})

</script>

<style scoped>
</style>
