<template>
  <div
    id="main-body-container"
    class="container-scroller">
    <EmAdminNavbar />
    <div class="container-fluid page-body-wrapper">
      <EmAdminSidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-12 grid-margin">
              <div class="content-wrapper">
                <!-- breadcrumbs -->
                <div class="col-12 grid-margin p-3">
                  <slot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EmAdminFooter />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmAdminFooter from "@/components/layouts/EmAdminFooter.vue";
import EmAdminNavbar from "@/components/layouts/EmAdminNavbar.vue";
import EmAdminSidebar from "@/components/layouts/EmAdminSidebar.vue";

export default defineComponent({
  name: "EmAdminLayout",
  components: {EmAdminSidebar, EmAdminNavbar, EmAdminFooter}
})
</script>

<style scoped>

</style>
