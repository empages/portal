<template>
  <div class="em-nav-section">
    <div class="container">
      <nav
        id="em-nav-navbar"
        class="navbar navbar-expand-lg em-nav_navbar em-nav-navbar-light">
        <div class="container">
          <RouterLink
            class="navbar-brand"
            to="/">
            <img
              :src="logo"
              class="logo"
              alt="Emeraude">
          </RouterLink>
          <div class="d-flex em-nav-middle order-lg-2">
            <div class="social-media">
              <p class="mb-0 d-flex">
                <a
                  :href="portalRepository"
                  target="_blank"
                  class="d-flex align-items-center justify-content-center">
                  <span class="mdi mdi-github" />
                </a>
              </p>
            </div>
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#em-nav-nav"
              aria-label="Toggle navigation"
              aria-expanded="false"
              aria-controls="em-nav-nav"
              @click="menuToggle">
              <span class="mdi mdi-menu" />
            </button>
          </div>
          <div
            id="em-nav-nav"
            ref="menuCollapse"
            class="em-navbar-collapse collapse order-lg-1"
            style="">
            <ul class="navbar-nav ml-auto mr-md-3">
              <RouterLink
                v-for="(menuItem, menuItemIndex) in menus"
                v-slot="{ isActive, href }"
                :key="`menu-item-${menuItemIndex}`"
                :to="{ name: menuItem.route }"
                custom
                class="nav-item">
                <li
                  class="nav-item"
                  :class="{ 'active': isActive }">
                  <RouterLink
                    :to="href"
                    class="nav-link cursor-pointer">
                    {{ menuItem.name }}
                  </RouterLink>
                </li>
              </RouterLink>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, Ref} from 'vue'
import { Collapse } from 'bootstrap'
import logo from "@/assets/images/logo_text.svg";
import {portalRepository} from "@/shared/config";

const menuButton: Ref<Collapse | null> = ref(null);
const menus = [
    { name: 'Settings', route: 'settings' },
    { name: 'Admin', route: 'admin-dashboard' },
    { name: 'Client Builder', route: 'client-builder' }
]

const menuCollapse: Ref<Element | null> = ref(null);

onMounted(() => {
  const targetElement = menuCollapse.value as Element;
  menuButton.value = new Collapse(targetElement, { toggle: false });
})

function menuToggle() {
  menuButton.value?.toggle();
}

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  @import "src/assets/styles/mixins";

  .em-nav-section{
    padding: 1em 0;

    .navbar-brand {
      img {
        height: 40px;

        @include respond-below(sm) {
          height: 30px;
        }
      }
    }
  }

  .em-nav-middle {
    flex-grow: unset;
    margin-left: auto;
    align-items: center;
  }

  .em-nav-no-pt{
    padding-top: 0;
  }
  .em-nav-no-pb{
    padding-bottom: 0;
  }

  #em-nav-nav {
    @include respond-above(md) {
      flex-flow: row-reverse;
    }
  }

  .em-navbar-collapse {
    flex-basis: 100%;
    flex-grow: 1;
    align-items: center;

    @include respond-below(md) {
      margin-top: 0.5rem;
    }

    @include respond-above(md) {
      display: flex !important;
      flex-basis: auto;
    }
  }

  .em-nav-navbar-light {
    background: white !important;
    z-index: 3;
    padding: 10px 10px;
    -webkit-box-shadow: 0px 5px 20px -17px rgba(0,0,0,0.34);
    -moz-box-shadow: 0px 5px 20px -17px rgba(0,0,0,0.34);
    box-shadow: 0px 5px 20px -17px rgba(0,0,0,0.34);
    border-radius: 4px;

    @include respond-below(md) {
      position: relative;
      top: 0;
      padding: 10px 15px;

      .container {
        padding: 0;
      }
    }

    .navbar-brand {
      text-transform: uppercase;
      font-weight: 700;
      &:hover, &:focus{
        color: $black;
      }
    }

    .navbar-nav {
      @include respond-below(md){
        padding-bottom: 10px;
      }
      > .nav-item {
        > .nav-link {
          font-size: 18px;
          padding: 1.2rem 14px;
          font-weight: 600;
          color: $black;
          position: relative;
          &:hover {
            color: $primary
          }
          opacity: 1!important;
          @include respond-below(md){
            padding: .5rem 0;
            color: $black;
            &:hover{
              color: $black;
            }
          }
        }

        .dropdown-menu{
          border: none;
          background: $white;
          -webkit-box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
          -moz-box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
          box-shadow: 0px 10px 34px -20px rgba(0,0,0,0.41);
          padding: 0;
          .dropdown-item{
            font-size: 12px;
            color: $black;
            &:hover, &:focus{
              background: $primary;
            }
          }
        }


        &.cta {
          > a {
            background: $primary;
            @include respond-below(sm){
              padding-left: 15px;
              padding-right: 15px;
            }
          }
        }
        &.active {
          > a {
            color: $primary;
          }
        }
      }
    }

    .navbar-toggler {
      border: none;
      color: $black;
      cursor: pointer;
      padding-right: 0;
      text-transform: uppercase;
      font-size: 26px;
      letter-spacing: .1em;
      box-shadow: none !important;

      &:focus{
        outline: none !important;
      }
    }
  }


  .social-media{
    p{
      a{
        width: 40px;
        height: 40px;
        margin-right: 4px;
        font-size: 30px;
        span{
          color: lighten($black,30%);
        }
        &:hover{
          span{
            color: $primary;
          }
        }
        @include respond-below(md){
          border-color: $white;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
</style>
