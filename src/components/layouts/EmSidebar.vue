<template>
  <nav
    id="sidebar"
    class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg scrollbar">
    <button
      class="navbar-toggler ms-n2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarCollapse"
      aria-controls="sidebarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="w-100">
      <a
        class="navbar-brand d-inline-block py-lg-2 mb-lg-5 px-lg-6 me-0 d-flex w-100"
        href="/">
        <img
          :src="logo"
          alt="Emerald Pages Portal"
          class="my-auto ms-auto me-0">
        <span class="epp my-auto me-auto ms-2">Emerald Pages Portal</span>
      </a>
    </div>
    <ul
      v-if="layout"
      class="navbar-nav">
      <RouterLink
        v-for="(item, itemIndex) in layout.navigationItems"
        :key="`sidebar-item-${itemIndex}`"
        v-slot="{ isActive, href, navigate }"
        custom
        :to="`${item.route}`"
        :title="item.title">
        <li class="nav-item">
          <a
            :href="href"
            class="nav-link sidebar-main-menu-item"
            :class="isActive ? 'active' : ''"
            @click="navigate">
            <i :class="`menu-icon ${item.icon}`" />
            <span class="menu-title">{{ item.title }}</span>
          </a>
        </li>
      </RouterLink>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {computed, onMounted, type Ref, ref, watch} from 'vue'
import {useRoute} from "vue-router";
import type {Layout} from "@/models/layout";
import layoutService from "@/services/layout-service";
import logo from "@/assets/images/logo.svg";

const emit = defineEmits(['sidebar:toggle'])
const routeInstance = useRoute();

const layout: Ref<Layout | null> = ref(null)

const sidebarMini = ref(false);

onMounted(async () => {
  layout.value = await layoutService.getLayout();
  const navItems = layout.value?.navigationItems;
  navItems?.forEach(x => x.route = `/em/${x.route}`);
  layout.value.navigationItems = [{
    title: 'Dashboard',
    route: '/',
    icon: '',
    order: -1,
  }, ...navItems]
})

const currentRoute = computed(() => {
  return routeInstance.fullPath;
})

watch(sidebarMini, (value) => {
  emit('sidebar:toggle', value)
})

</script>

<style scoped lang="scss">
  .dropdown-menu {
    min-width: 100%;
  }

  .epp {
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    word-break: break-word;
    white-space: normal;
  }
</style>
