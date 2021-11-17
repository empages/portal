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

<script lang="ts">
import {defineComponent} from 'vue'
import EmAdminFooter from "@/components/layouts/EmAdminFooter.vue";
import EmAdminNavbar from "@/components/layouts/EmAdminNavbar.vue";
import EmAdminSidebar from "@/components/layouts/EmAdminSidebar.vue";
import EmBreadcrumbs from "@/components/layouts/EmBreadcrumbs.vue";

export default defineComponent({
  name: "EmAdminLayout",
  components: {EmBreadcrumbs, EmAdminSidebar, EmAdminNavbar, EmAdminFooter},
  data() {
    return {
      sidebarMini: false,
      mobileMenuToggled: false
    }
  },
  computed: {
    minWrapperHeight() {
      return `${window.innerHeight - 135}px`;
    },
    route() {
      return this.$route.fullPath;
    }
  },
  watch: {
    route() {
      this.mobileMenuToggled = false;
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuToggled = !this.mobileMenuToggled;
    }
  }
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
