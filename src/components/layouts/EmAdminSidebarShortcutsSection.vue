<template>
  <li class="nav-item main-nav-item">
    <a
      title="Shortcuts"
      aria-controls="shortcuts-links-section"
      data-bs-target="#shortcuts-links-section"
      aria-expanded="false"
      class="nav-link sidebar-main-menu-item cursor-pointer"
      data-bs-toggle="collapse">
      <i class="menu-icon mdi mdi mdi-share" />
      <span class="menu-title">Shortcuts</span>
      <i class="menu-arrow" />
    </a>
    <div
      id="shortcuts-links-section"
      class="collapse">
      <ul class="nav flex-column sub-menu">
        <li
          v-for="(link, linkIndex) in links"
          :key="`shortcuts-links-child-${linkIndex}`"
          class="nav-item">
          <a
            :href="link.route"
            :target="isUrlAbsolute(link.route) ? '_blank' : '_self'"
            class="nav-link"
            :title="link.title">
            {{ link.title }}
          </a>
        </li>
      </ul>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import {isUrlAbsolute} from "@/shared/helpers";
import {SidebarShortcutLink} from "@/models/sidebar-shortcut-link";

defineProps<{
  links: Array<SidebarShortcutLink>
}>();

</script>

<style scoped>

</style>
