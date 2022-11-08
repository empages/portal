<template>
  <div class="dropdown">
    <a
      class="d-flex align-items-center"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-haspopup="false"
      aria-expanded="false">
      <div>
        <div class="avatar avatar-sm bg-secondary rounded-circle text-white mdi mdi-account" />
      </div>
    </a>
    <div class="dropdown-menu dropdown-menu-end">
      <div class="dropdown-header">
        <span class="d-block text-heading font-semibold">{{ identity?.email }}</span>
      </div>
      <div class="dropdown-divider" />
      <RouterLink
        v-for="(menuItem, menuItemIndex) in menuItems"
        :key="`user-dropdown-menu-${menuItemIndex}`"
        target="_self"
        :title="menuItem.title"
        :to="{ name: menuItem.route }"
        active-class="active-link"
        class="dropdown-item">
        <i :class="menuItem.icon" /> {{ menuItem.title }}
      </RouterLink>
      <div class="dropdown-divider" />
      <button
        class="dropdown-item"
        @click="logout">
        <i class="mdi mdi-exit-to-app" /> Logout
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, Ref, watch} from 'vue'
import moment from 'moment';
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import {EmDropdownContext} from "@/shared/types/em-dropdown-context";

const menuItems = [
  { title: 'Manage 2FA', route: 'manage-2fa', icon: 'mdi mdi-qrcode-edit' },
  { title: 'Manage Email', route: 'manage-email', icon: 'mdi mdi-email-edit-outline' },
  { title: 'Manage Password', route: 'manage-password', icon: 'mdi mdi-form-textbox-password' }
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
  .avatar {
    font-size: 1.4rem;
  }
</style>
