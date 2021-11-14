<template>
  <div class="h-100">
    <div class="container-fluid h-100">
      <div class="card main-panel-full h-100">
        <EmBaseNavbar />
        <div class="card-body h-100 pt-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmBaseNavbar from "@/components/layouts/EmBaseNavbar.vue";

export default defineComponent({
  name: "EmBaseLayout",
  components: {EmBaseNavbar},

})
</script>

<style scoped lang="scss">
  .main-panel-full {
    padding-top: 53px;
  }
</style>
