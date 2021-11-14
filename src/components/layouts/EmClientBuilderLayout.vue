<template>
  <div
    id="cb"
    ref="app">
    <div class="p-3 pt-0">
      <nav class="navbar navbar-light">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="#">
            <span class="d-flex">
              <img
                :src="logo"
                alt="Emeraude"
                width="36"
                height="36"
                class="d-inline-block ms-0 me-1 my-auto">
              <span class="logo-font ms-0 me-2 my-auto">Emeraude Client Builder</span>
            </span>
          </a>
          <EmConfigurationDropdown />
        </div>
      </nav>
      <div
        id="cb-main"
        class="container-fluid">
        <div class="card">
          <div class="card-body">
            <EmClientBuilderNavigation />
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmClientBuilderNavigation from "@/components/layouts/EmClientBuilderNavigation.vue";
import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";
import logo from "@/assets/images/logo.svg";

export default defineComponent({
  name: "EmClientBuilderLayout",
  components: {EmConfigurationDropdown, EmClientBuilderNavigation},
  setup() {
    return {
      logo
    }
  }
})
</script>

<style scoped>

</style>
