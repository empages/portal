<template>
  <footer class="footer">
    <div class="container-fluid clearfix d-flex">
      <CopyrightText class="me-auto ms-0" />
      <span class="text-muted me-0 ms-auto">
        <span>Framework Version {{ frameworkVersion }} <span class="mx-2">|</span> Portal Version {{ portalVersion }}</span>
      </span>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import CopyrightText from "@/components/misc/CopyrightText.vue";
import { version as portalVersion } from '../../../package.json'
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const frameworkVersion = computed(() => store.getters['settingsModule/selectedApplication'].version);

</script>

<style scoped>

</style>
