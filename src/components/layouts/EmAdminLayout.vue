<template>
  <div
    id="main-body-container"
    class="container-scroller"
    :class="{ 'sidebar-icon-only': sidebarMini, 'show-mobile-menu': mobileMenuToggled }">
    <EmAdminNavbar @menu:toggle="toggleMobileMenu" />
    <div class="container-fluid page-body-wrapper">
      <EmAdminSidebar @sidebar:toggle="sidebarMini = $event" />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-12 grid-margin mb-0">
              <div class="content-wrapper">
                <EmBreadcrumbs />
                <div class="col-12 grid-margin p-3 main-content-wrapper-content">
                  <slot />
                </div>
                <EmAdminFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import EmAdminFooter from "@/components/layouts/EmAdminFooter.vue";
import EmAdminNavbar from "@/components/layouts/EmAdminNavbar.vue";
import EmAdminSidebar from "@/components/layouts/EmAdminSidebar.vue";
import EmBreadcrumbs from "@/components/layouts/EmBreadcrumbs.vue";
import {useRoute} from "vue-router";

const routeInstance = useRoute();

const sidebarMini = ref(false);
const mobileMenuToggled = ref(false);

const minWrapperHeight = computed(() => {
  return `${window.innerHeight - 135}px`;
})

const route = computed(() => {
  return routeInstance.fullPath;
})

function toggleMobileMenu() {
  mobileMenuToggled.value = !mobileMenuToggled.value;
}

watch(route, () => {
  mobileMenuToggled.value = false;
})

</script>

<style scoped>
  #main-body-container {
    height: 100%;
  }

  .page-body-wrapper {
    height: 100%;
  }

  .main-content-wrapper-content {
    min-height: v-bind(minWrapperHeight);
  }
</style>
