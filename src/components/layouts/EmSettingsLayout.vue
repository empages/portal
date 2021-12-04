<template>
  <div>
    <div class="p-0">
      <nav class="navbar navbar-light bg-darkest-gray px-3">
        <div class="container-fluid">
          <RouterLink
            class="navbar-brand"
            :to="{ name: 'home' }">
            <span class="d-flex position-relative">
              <img
                :src="logo"
                alt="Emeraude"
                height="36"
                class="d-inline-block ms-0 me-1 my-auto">
            </span>
          </RouterLink>
          <div class="d-flex side-buttons">
            <EmHomePageButton />
          </div>
        </div>
      </nav>
      <div
        class="container-fluid p-3">
        <slot />
      </div>
      <EmBaseFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from "@/assets/images/logo_text_white.svg";
import EmHomePageButton from "@/components/layouts/EmHomePageButton.vue";
import EmBaseFooter from "@/components/layouts/EmBaseFooter.vue";
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";
.side-buttons :deep .btn-primary {
  margin-left: 4px;
  border: none;

  &:hover {
    background: $darker-gray !important;
  }
}
</style>
