<template>
  <nav class="navbar fixed-top navbar-expand-sm">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#">
        <img
          :src="logo"
          class="logo"
          alt="Emeraude">
      </a>
      <ul class="navbar-nav me-0 mb-2 mb-lg-0">
        <li
          v-for="(menuItem, menuItemIndex) in menus"
          :key="`menu-item-${menuItemIndex}`"
          class="nav-item">
          <RouterLink
            class="nav-link"
            active-class="active"
            :to="{ name: menuItem.route }">
            {{ menuItem.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import logoText from "@/assets/images/logo_text.svg";

export default defineComponent({
  name: "EmBaseNavbar",
  data() {
    return {
      logo: logoText,
      menus: [
        {
          name: 'Home',
          route: 'home'
        },
        {
          name: 'Settings',
          route: 'settings'
        },
        {
          name: 'Admin',
          route: 'admin-dashboard'
        },
        {
          name: 'Client Builder',
          route: 'client-builder'
        }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";

  .navbar {
    padding: 0.28rem 1.21rem;

    .logo {
      height: 32px;
    }

    .nav-item {
      .nav-link {
        font-size: 14px;
        color: $black;
        &:hover {
          text-shadow: 0 0 1px rgba(0,0,0,.5);
        }

        &.active {
          color: $primary;
          font-weight: bold;
          text-shadow: 1px 1px 1px $white;
        }
      }
    }
  }
</style>
