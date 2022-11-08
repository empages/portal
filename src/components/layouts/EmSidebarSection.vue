<template>
  <li
    class="nav-item"
    :class="{ 'active': section.isActive }">
    <a
      v-if="section.isDropdown"
      :title="section.title"
      :aria-controls="section.isSingle ? '' : sectionId"
      :data-bs-target="`#${sectionId}`"
      :aria-expanded="section.isActive"
      class="nav-link sidebar-main-menu-item cursor-pointer"
      data-bs-toggle="collapse">
      <i :class="`menu-icon ${section.icon}`" />
      <span class="menu-title">{{ section.title }}</span>
    </a>
    <RouterLink
      v-else
      :to="sectionRoute"
      :title="section.title"
      class="nav-link sidebar-main-menu-item">
      <i :class="`menu-icon ${section.icon}`" />
      <span class="menu-title">{{ section.title }}</span>
    </RouterLink>
    <div
      v-if="!section.isSingle"
      :id="sectionId"
      class="collapse"
      :class="{ 'show': section.isActive }">
      <ul
        class="nav nav-sm flex-column"
        :class="{ 'active': section.isActive }">
        <li
          v-for="(link, linkIndex) in section.children"
          :key="`${sectionId}-child-${linkIndex}`"
          class="nav-item">
          <RouterLink
            :to="link.defaultRoute"
            class="nav-link"
            :class="{ 'active': link.isActive }"
            :title="link.title">
            {{ link.title }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {SidebarMenuSection} from "@/models/sidebar-menu-section";

const props = defineProps<{
  section: SidebarMenuSection,
  sectionIndex: number
}>()

const sectionId = `section-${props.sectionIndex}`;

const sectionRoute = computed(() => {
  let route: string | undefined = "";
  if (props.section.isSingle && !props.section.isDropdown) {
    route = props.section.singleLink?.defaultRoute;
  }
  else {
    route = `#${sectionId}`;
  }

  return route;
});
</script>

<style scoped lang="scss">
@import "../../assets/styles/theme/core/variables/base-colors";
.nav-item {
  .menu-icon {
    font-size: 1.06rem;
    color: $black !important;
  }

  &.active {
    .sidebar-main-menu-item {
      font-weight: bold;
      background: $gray-100;
    }

    .nav {
      .active {
        color: $primary;
        font-weight: 500;
      }
    }
  }
}

</style>
