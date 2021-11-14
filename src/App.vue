<template>
  <div id="emeraude">
    <RouterView />
    <EmNotifications />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EmNotifications from "@/components/layouts/EmNotifications.vue";

export default defineComponent({
  name: 'App',
  components: {EmNotifications},
})
</script>

<style lang="scss">
  @import "assets/styles/style";
</style>
