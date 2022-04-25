<template>
  <div class="px-5 py-5 p-lg-0 min-h-screen bg-surface-secondary d-flex flex-column justify-content-center">
    <div class="d-flex justify-content-center">
      <div class="m-auto text-center layout-container">
        <div class="mx-auto">
          <slot />
        </div>
        <EmBaseFooter class="mt-4 mx-auto" />
      </div>
    </div>
    <div class="d-flex position-fixed top-0 end-0">
      <div class="me-0 ms-auto p-2 d-flex">
        <div class="me-1 ms-auto">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="btn btn-neutral btn-icon">
            <i class="mdi mdi-diamond-stone button-icon" />
          </RouterLink>
        </div>
        <div class="me-1 ms-auto">
          <EmConfigurationDropdown />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";
import EmBaseFooter from "@/components/layouts/EmBaseFooter.vue";
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  max-width: 680px;
}
</style>
