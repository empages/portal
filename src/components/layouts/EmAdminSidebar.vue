<template>
  <nav
    id="sidebar"
    class="sidebar sidebar-offcanvas">
    <ul
      v-if="sidebarSchema"
      class="nav">
      <EmAdminSidebarSection
        v-for="(section, sectionIndex) in sidebarSchema.sections"
        :key="`admin-menu-section-${sectionIndex}`"
        :section="section"
        :section-index="sectionIndex" />
      <EmAdminSidebarShortcutsSection :links="sidebarSchema.shortcutsLinks" />
      <li class="nav-item main-nav-item">
        <a
          id="sidebar-collapse-btn"
          href="javascript:void(0)"
          class="nav-link"
          data-bs-toggle="minimize"
          title="Collapse Menu"
          @click="() => sidebarMini = !sidebarMini">
          <i
            class="menu-icon mdi"
            :class="{ 'mdi-arrow-left-drop-circle': !sidebarMini, 'mdi-arrow-right-drop-circle': sidebarMini }" />
          <span class="menu-title">Collapse Menu</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { SidebarSchema } from '@/models/sidebar-schema'
import {computed, ComputedRef, defineEmits, onMounted, ref, watch} from 'vue'
import EmAdminSidebarSection from "@/components/layouts/EmAdminSidebarSection.vue";
import EmAdminSidebarShortcutsSection from "@/components/layouts/EmAdminSidebarShortcutsSection.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

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
  if (!sidebarSchema.value) {
    await store.dispatch('sidebarModule/loadSidebarSchema');
  }

  store.commit('sidebarModule/reloadSidebarSchema', currentRoute.value);
})

</script>

<style scoped>
  .dropdown-menu {
    min-width: 100%;
  }
</style>
