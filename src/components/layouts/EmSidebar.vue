<template>
  <nav
    id="sidebar"
    class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar">
  </nav>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const emit = defineEmits(['sidebar:toggle'])
const routeInstance = useRoute();
const store = useStore();

const sidebarMini = ref(false);

const currentRoute = computed(() => {
  return routeInstance.fullPath;
})

watch(currentRoute, (value) => {
  console.log(currentRoute);
})

watch(sidebarMini, (value) => {
  emit('sidebar:toggle', value)
})

</script>

<style scoped lang="scss">
  .dropdown-menu {
    min-width: 100%;
  }
</style>
