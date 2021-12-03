<template>
  <div
    id="cb"
    ref="app">
    <div class="p-0">
      <nav class="navbar navbar-light bg-main-gradient px-3">
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="#">
            <span class="d-flex position-relative">
              <img
                :src="logo"
                alt="Emeraude"
                height="36"
                class="d-inline-block ms-0 me-1 my-auto">
            </span>
          </a>
          <div class="d-flex side-buttons">
            <EmHomePageButton />
            <EmConfigurationDropdown />
          </div>
        </div>
      </nav>
      <div
        id="cb-main"
        class="container-fluid p-3">
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

<script lang="ts" setup>
import EmClientBuilderNavigation from "@/components/layouts/EmClientBuilderNavigation.vue";
import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";
import logo from "@/assets/images/logo_text_white.svg";
import EmHomePageButton from "@/components/layouts/EmHomePageButton.vue";

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .side-buttons :deep .btn-primary {
    margin-left: 4px;
    background: $primary;
    color: $white;
    border: none;

    &:hover {
      background: $light !important;
      color: $dark !important;
    }
  }
</style>
