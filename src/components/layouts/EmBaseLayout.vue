<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="card main-panel-full h-100">
        <EmBaseNavbar />
        <div class="container">
          <div class="card-body h-100 pt-1 px-0">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EmBaseNavbar from "@/components/layouts/EmBaseNavbar.vue";
</script>

<style scoped lang="scss">
  .main-panel-full {
  }
</style>
