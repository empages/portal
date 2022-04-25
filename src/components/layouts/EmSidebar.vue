<template>
  <nav
    id="sidebar"
    class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar">
    <div class="container-fluid">
      <button
        class="navbar-toggler ms-n2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarCollapse"
        aria-controls="sidebarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button> <a
        class="navbar-brand d-inline-block py-lg-2 mb-lg-5 px-lg-6 me-0"
        href="/"><img
          :src="logo"
          alt="Definux"></a>
      <div class="navbar-user d-lg-none">
        <EmUserDropdown />
      </div>
      <div
        id="sidebarCollapse"
        class="collapse navbar-collapse">
        <ul
          v-if="sidebarSchema"
          class="navbar-nav">
          <DxSidebarSection
            v-for="(section, sectionIndex) in sidebarSchema.sections"
            :key="`admin-menu-section-${sectionIndex}`"
            :section="section"
            :section-index="sectionIndex" />
        </ul>
        <div class="mt-auto" />
        <div class="my-4 px-lg-6 position-relative">
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { SidebarSchema } from '@/models/sidebar-schema'
import {computed, ComputedRef, onMounted, ref, watch} from 'vue'
import DxSidebarSection from "@/components/layouts/EmSidebarSection.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import logo from '@/assets/images/logo_text.svg';
import EmUserDropdown from "@/components/layouts/EmUserDropdown.vue";

const emit = defineEmits(['sidebar:toggle'])
const routeInstance = useRoute();
const store = useStore();

const sidebarMini = ref(false);

const currentRoute = computed(() => {
  return routeInstance.fullPath;
})

const sidebarSchema: ComputedRef<SidebarSchema> = computed(() => {
  return store.getters['sidebarModule/sidebarSchema'];
})

watch(currentRoute, (value) => {
  store.commit('sidebarModule/reloadSidebarSchema', value);
})

watch(sidebarMini, (value) => {
  emit('sidebar:toggle', value)
})

onMounted(async () => {
  store.commit('sidebarModule/reloadSidebarSchema', currentRoute.value);
})

</script>

<style scoped lang="scss">
  .dropdown-menu {
    min-width: 100%;
  }
</style>
