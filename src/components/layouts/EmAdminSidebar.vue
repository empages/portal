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

<script lang="ts">
import { SidebarSchema } from '@/models/sidebar-schema'
import {defineComponent} from 'vue'
import EmAdminSidebarSection from "@/components/layouts/EmAdminSidebarSection.vue";
import EmAdminSidebarShortcutsSection from "@/components/layouts/EmAdminSidebarShortcutsSection.vue";

export default defineComponent({
  name: "EmAdminSidebar",
  components: {EmAdminSidebarShortcutsSection, EmAdminSidebarSection},
  emits: ['sidebar:toggle'],
  data() {
    return {
      sidebarMini: false
    }
  },
  computed: {
    currentRoute() {
      return this.$route.fullPath;
    },
    sidebarSchema(): SidebarSchema | null {
      return this.$store.getters['sidebarModule/sidebarSchema'];
    }
  },
  watch: {
    sidebarMini(value: boolean): void {
      this.$emit('sidebar:toggle', value)
    },
    currentRoute() {
      this.$store.commit('sidebarModule/reloadSidebarSchema', this.currentRoute);
    }
  },
  async mounted() {
    if (!this.sidebarSchema) {
      await this.$store.dispatch('sidebarModule/loadSidebarSchema');
    }

    this.$store.commit('sidebarModule/reloadSidebarSchema', this.currentRoute);
  },
  methods: {

  }
})
</script>

<style scoped>
  .dropdown-menu {
    min-width: 100%;
  }
</style>
