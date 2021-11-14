<template>
  <nav
    id="sidebar"
    class="sidebar sidebar-offcanvas">
    <ul
      v-if="sidebarSchema"
      class="nav">
      <li class="nav-item nav-profile">
        <div class="nav-link">
          <div class="dropdown">
            <button
              id="dropdownAppInstance"
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              <span class="mdi mdi-link-variant" /> Essential Links
            </button>
            <div
              class="dropdown-menu mt-2 p-2"
              aria-labelledby="dropdownAppInstance">
              <a
                class="dropdown-item pt-2 pb-2 pl-1"
                target="_blank"
                href="/"><i class="mr-2 mdi mdi-home" /> Home Page</a>
            </div>
          </div>
        </div>
      </li>
      <EmAdminSidebarSection
        v-for="(section, sectionIndex) in sidebarSchema.sections"
        :key="`admin-menu-section-${sectionIndex}`"
        :section="section"
        :section-index="sectionIndex" />
      <li class="nav-item main-nav-item">
        <a
          id="sidebar-collapse-btn"
          href="javascript:void(0)"
          class="nav-link"
          data-bs-toggle="minimize"
          title="Collapse Menu"><i class="menu-icon mdi mdi-arrow-left-drop-circle" /><span class="menu-title">Collapse Menu</span></a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { SidebarSchema } from '@/models/sidebar-schema'
import {defineComponent} from 'vue'
import EmAdminSidebarSection from "@/components/layouts/EmAdminSidebarSection.vue";

export default defineComponent({
  name: "EmAdminSidebar",
  components: {EmAdminSidebarSection},
  data() {
    return {
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

</style>
