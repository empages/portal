<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex">
        <div class="mt-0">
          <p class="m-0 error-icon">
            <i class="mdi mdi-alert-octagon" />
          </p>
        </div>
        <div class="ms-3 mt-2">
          <h1 id="error-title">
            EmPage Error!
          </h1>
          <h2
            id="error-text"
            class="font-weight-normal lead py-2">
            {{ pageError }}
          </h2>
        </div>
      </div>
      <div class="float-end">
        <RouterLink
          :to="{ name: 'admin-dashboard' }"
          class="btn btn-primary">
          Close
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useStore} from "vuex";
import {computed} from "vue";
import {onBeforeRouteLeave, useRouter} from "vue-router";
import {useAdminLayout} from "@/composables/admin-layout-composable";

const router = useRouter();
const store = useStore();
const adminLayout = useAdminLayout();
const pageError = computed(() => store.getters['generalModule/pageError']);
adminLayout.reset();

onBeforeRouteLeave(() => {
  store.commit('generalModule/setPageError', '');
})

redirectBasedOnError(pageError.value);

function redirectBasedOnError(error: string) {
  if (!error) {
    router.push({ name: 'admin-dashboard' });
  }
}

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";

  .error-icon {
    font-size: 66px;
    line-height: 66px;
    color: $danger;
  }

  #error-title {
    font-size: 18px;
    line-height: 18px;
    margin: auto;
    font-weight: bold;
  }

  #error-text {
    font-size: 14px;
    line-height: 22px;
  }
</style>
