<template>
  <div id="emeraude">
    <div class="h-100">
      <Component :is="layout">
        <RouterView />
      </Component>
      <EmNotifications />
      <div
        v-show="!loaded"
        class="page-loading-mask">
        <div class="m-auto">
          <EmLoadingSpinner />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount} from 'vue'
import EmNotifications from "@/components/layouts/EmNotifications.vue";
import {useRoute} from "vue-router";
import {layouts} from "@/plugins/layouts";
import {useStore} from "vuex";
import EmLoadingSpinner from "@/components/base/EmLoadingSpinner.vue";

const route = useRoute();
const store = useStore();
const layout = computed(() => route?.meta?.layout ?? layouts.base );

const loaded = computed(() => {
  return store.getters['generalModule/loaded'];
})

onBeforeMount(async () => {
  await store.dispatch('reloadState');
})

</script>

<style lang="scss">
  @import "assets/styles/style";
  .page-loading-mask {
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999999;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(6px);
  }

  #emeraude {
    height: 100%;
  }
</style>
