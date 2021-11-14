<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth w-100">
        <div class="row w-100 m-0">
          <div class="mx-auto form-container">
            <div class="d-flex brand-form-container">
              <RouterLink :to="{ name: 'home' }">
                <img
                  class="brand-logo-form"
                  :src="logo"
                  alt="Emeraude">
              </RouterLink>
            </div>
            <div class="auto-form-wrapper">
              <slot />
            </div>
            <CopyrightText class="d-block mt-2 text-center" />
            <RouterLink
              class="footer-text text-left text-small mt-3 d-block"
              :to="{ name: 'home'}">
              <span class="mdi mdi-arrow-left" /> Go Back to Homepage
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-settings">
      <EmConfigurationDropdown />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import logoText from '@/assets/images/logo_text.svg'
import CopyrightText from "@/components/misc/CopyrightText.vue";
import EmConfigurationDropdown from "@/components/layouts/EmConfigurationDropdown.vue";

export default defineComponent({
  name: "EmAdminAuthLayout",
  components: {EmConfigurationDropdown, CopyrightText},
  setup() {
    const logo = logoText;

    return {
      logo
    }
  }
})
</script>

<style scoped>
  .form-container {
    min-width: 280px;
    max-width: 380px;
    width: 100%;
  }

  .btn-settings {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>
