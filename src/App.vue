<template>
  <div id="emeraude">
    <Component :is="layout">
      <RouterView />
    </Component>
    <EmNotifications />
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import EmNotifications from "@/components/layouts/EmNotifications.vue";
import {useRoute} from "vue-router";
import {layouts} from "@/plugins/layouts";

const route = useRoute();

const layout = computed(() => route?.meta?.layout ?? layouts.base );

</script>

<style lang="scss">
  @import "assets/styles/style";
</style>
