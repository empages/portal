<template>
  <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center navbar-brand-md-inverse-color">
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
      <ul class="addon-navbar navbar-nav navbar-nav-left header-links d-none d-md-flex p-0">
        <!--        <EmNavigationActions />-->
      </ul>
      <div class="d-flex ms-auto me-0 align-items-center side-buttons">
        <EmHomePageButton />
        <EmConfigurationDropdown class="ms-1" />
        <EmDropdown
          class="ms-1 me-2"
          button-classes="btn-icon"
          menu-classes="dropdown-menu-end"
          :toggle-icon="false"
          title="Manage">
          <template #title>
            <i class="mdi mdi-account" />
          </template>
          <template #menu>
            <li class="dropdown-item">
              <RouterLink
                target="_self"
                title="Two Factor Authentication"
                :to="{ name: 'admin-manage-2fa' }"
                class="dropdown-link">
                Two Factor Authentication
              </RouterLink>
            </li>
            <li class="dropdown-item">
              <RouterLink
                title="Manage Email"
                :to="{ name: 'admin-manage-email' }"
                class="dropdown-link">
                Manage Email
              </RouterLink>
            </li>
            <li class="dropdown-item">
              <RouterLink
                title="Manage Password"
                :to="{ name: 'admin-manage-password' }"
                class="dropdown-link">
                Manage Password
              </RouterLink>
            </li>
          </template>
        </EmDropdown>
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

<script lang="ts">
import {defineComponent} from 'vue'
import logo from '@/assets/images/logo_white.svg'
import logoText from '@/assets/images/logo_text_white.svg'
import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";
import EmDropdown from "@/components/base/EmDropdown.vue";
import EmHomePageButton from "@/components/layouts/EmHomePageButton.vue";

export default defineComponent({
  name: "EmAdminNavbar",
  components: {EmHomePageButton, EmDropdown, EmConfigurationDropdown},
  data() {
    return {
      logo: logo,
      logoText: logoText
    }
  }
})
</script>

<style scoped>

</style>
