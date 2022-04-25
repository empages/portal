<template>
  <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <DxSidebar/>
    <div class="flex-lg-1 h-screen overflow-y-lg-auto">
      <DxNavbar/>
      <DxPageHeader/>
      <main class="py-6 bg-surface-secondary">
        <div class="container-fluid">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import DxNavbar from "@/components/layouts/EmNavbar.vue";
import DxSidebar from "@/components/layouts/EmSidebar.vue";
import {useRoute} from "vue-router";
import DxPageHeader from "@/components/layouts/EmPageHeader.vue";

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
  /*#main-body-container {*/
  /*  height: 100%;*/
  /*}*/

  /*.page-body-wrapper {*/
  /*  height: 100%;*/
  /*}*/

  /*.main-content-wrapper-content {*/
  /*  min-height: v-bind(minWrapperHeight);*/
  /*}*/
</style>
