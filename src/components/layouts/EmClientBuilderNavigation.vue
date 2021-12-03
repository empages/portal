<template>
  <ul class="nav nav-tabs tab-basic">
    <li
      v-for="(menuItem, menuItemIndex) in menuItems"
      :key="`menu-item-${menuItemIndex}`"
      class="nav-item">
      <RouterLink
        :to="{ name: menuItem.route }"
        active-class="active"
        class="nav-link">
        <i :class="menuItem.icon" /> {{ menuItem.title }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const menuItems = [
  { title: 'Scaffold', route: 'client-builder-scaffold', icon: 'mdi mdi-arrow-right-drop-circle' },
  { title: 'Endpoints', route: 'client-builder-endpoints', icon: 'mdi mdi-cloud-braces' },
  { title: 'Languages', route: 'client-builder-languages', icon: 'mdi mdi-comment-processing' },
  { title: 'Translations', route: 'client-builder-translations', icon: 'mdi mdi-translate' },
  { title: 'Static Content', route: 'client-builder-static-content', icon: 'mdi mdi-format-float-left' }
]
</script>

<style scoped lang="scss">

</style>
