<template>
  <nav
    id="topbar"
    class="navbar navbar-light position-lg-sticky top-lg-0 d-none d-lg-block overlap-10 flex-none bg-white border-bottom px-0 py-3">
    <div class="container-fluid">
      <div class="navbar-user d-none d-sm-block ms-auto me-0">
        <div class="hstack gap-3 ms-4">
          <DxUserDropdown/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import DxUserDropdown from "@/components/layouts/EmUserDropdown.vue";

defineEmits(['menu:toggle'])

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .navbar-toggle-menu {
    border: none;
    box-shadow: none;
    background: none;
    color: $black;
    margin-left: 6px;
    margin-right: 6px;
    font-size: 22px;
  }
</style>
