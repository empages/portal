<template>
  <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center navbar-brand-md-inverse-color">
      <div class="my-auto mx-0">
        <button
          class="navbar-toggle-menu"
          @click="$emit('menu:toggle')">
          <i class="mdi mdi-menu" />
        </button>
      </div>
      <RouterLink
        class="navbar-brand brand-logo"
        :to="{ name: 'admin-dashboard' }">
        <img
          :src="logoText"
          alt="Emeraude">
      </RouterLink>
      <RouterLink
        class="navbar-brand brand-logo-mini"
        :to="{ name: 'admin-dashboard' }">
        <img
          :src="logo"
          alt="Emeraude">
      </RouterLink>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center">
      <EmAdminNavbarActions />
      <div class="d-flex ms-auto me-0 align-items-center side-buttons">
        <EmHomePageButton />
        <EmConfigurationDropdown class="ms-1" />
        <EmAdminUserDropdown />
      </div>
      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center p-0"
        type="button"
        data-toggle="offcanvas">
        <span class="icon-menu" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import {defineEmits} from 'vue'
import logo from '@/assets/images/logo_white.svg'
import logoText from '@/assets/images/logo_text_white.svg'
import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";
import EmHomePageButton from "@/components/layouts/EmHomePageButton.vue";
import EmAdminUserDropdown from "@/components/layouts/EmAdminUserDropdown.vue";
import EmAdminNavbarActions from "@/components/layouts/EmAdminNavbarActions.vue";

defineEmits(['menu:toggle'])

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .navbar-toggle-menu {
    border: none;
    box-shadow: none;
    background: none;
    color: $white;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 22px;
  }
</style>
