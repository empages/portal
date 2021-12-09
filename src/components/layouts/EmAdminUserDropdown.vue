<template>
  <EmDropdown
    class="ms-1 me-2"
    button-classes="btn-icon"
    auto-close="outside"
    menu-classes="dropdown-menu-end"
    :toggle-icon="false"
    title="Manage"
    @dropdown:loaded="loadedDropdown">
    <template #title>
      <i class="mdi mdi-account" />
    </template>
    <template #menu>
      <li class="main-section">
        <div>
          <p class="font-weight-semibold user-info-text">
            {{ identity.sub }}
          </p>
          <p class="info-text">
            Session expiring on: <span class="badge bg-warning">{{ expiration }}</span>
          </p>
        </div>
      </li>
      <li class="dropdown-divider" />
      <li
        v-for="(menuItem, menuItemIndex) in menuItems"
        :key="`user-dropdown-menu-${menuItemIndex}`"
        class="dropdown-item">
        <RouterLink
          target="_self"
          :title="menuItem.title"
          :to="{ name: menuItem.route }"
          active-class="active-link"
          class="dropdown-link">
          <i :class="`mdi ${menuItem.icon}`" /> {{ menuItem.title }}
        </RouterLink>
      </li>
      <li class="dropdown-item p-0">
        <button
          class="logout dropdown-link"
          @click="logout">
          <i class="mdi mdi-exit-to-app" /> Logout
        </button>
      </li>
    </template>
  </EmDropdown>
</template>

<script lang="ts" setup>
import {computed, ref, Ref, watch} from 'vue'
import EmDropdown from "@/components/base/EmDropdown.vue";
import moment from 'moment';
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {EmDropdownContext} from "@/shared/types/em-dropdown-context";

const menuItems = [
  { title: 'Manage 2FA', route: 'admin-manage-2fa', icon: 'mdi-qrcode-edit' },
  { title: 'Manage Email', route: 'admin-manage-email', icon: 'mdi-email-edit-outline' },
  { title: 'Manage Password', route: 'admin-manage-password', icon: 'mdi-form-textbox-password' }
]

const store = useStore();
const router = useRouter();
const route = useRoute();

const dropdownContext: Ref<EmDropdownContext | null> = ref(null);

const identity = computed(() => {
  return store.getters['identityModule/decodedIdentity'];
})

const identityRecord = computed(() => {
  return store.getters['identityModule/currentIdentityRecord'];
})

const expiration = computed(() => {
  const expirationDate = new Date(((identity.value.exp || 0) * 1000));
  return moment(expirationDate).format('YYYY-MM-DD HH:mm');
})

const currentRoute = computed(() => route.fullPath);

watch(currentRoute, () => {
  dropdownContext.value?.hide();
})

function loadedDropdown(context: EmDropdownContext): void {
  dropdownContext.value = context;

}

function logout() {
  store.commit('identityModule/removeIdentity', identityRecord.value);
  router.go(0);
}

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .main-section {
    padding: 6px 1rem;
    p {
      margin: 0;
    }

    .user-info-text {
      font-size: 16px;
    }

    .info-text {
      font-size: 12px;
      white-space: nowrap;
      .badge {
        font-weight: normal;
        font-size: 9px;
      }
    }
  }

  .dropdown-menu {
    .dropdown-item {
      .dropdown-link {
        color: $black;
        font-size: 14px;
        text-decoration: none;

        &.active-link {
          color: $base-dark;
          font-weight: bold;
        }

        &.logout {
          width: 100%;
          padding: 0.25rem 1rem;
          background: none;
          border: none;
          text-align: left;
          line-height: 25px;
        }
      }
    }
  }
</style>
