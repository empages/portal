<template>
  <nav
    aria-label="breadcrumb"
    class="float-left d-inline-block p-2 w-100 ms-2 mt-2">
    <ol class="breadcrumb border-0 m-0 border-radius-0 pt-0 pb-0 ps-0">
      <li
        v-for="(breadcrumb, breadcrumbIndex) in breadcrumbs"
        :key="`breadcrumb-${breadcrumbIndex}`"
        v-bind="getBreadcrumbListItemAttrs(breadcrumb)">
        <RouterLink
          v-if="breadcrumb.isActive"
          :to="breadcrumb.actionUrl"
          :class="getBreadcrumbClass(breadcrumb)"
          :title="breadcrumb.title">
          {{ breadcrumb.title }}
        </RouterLink>
        <p
          v-else
          :title="breadcrumb.title"
          :class="getBreadcrumbClass(breadcrumb)">
          {{ breadcrumb.title }}
        </p>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import {BreadcrumbModelItem} from "@/models/breadcrumb-model-item";
import {computed} from 'vue'
import {useStore} from "vuex";
import _ from "lodash";

const store = useStore();
const breadcrumbs = computed(() => store.getters['breadcrumbsModule/breadcrumbs']);
const orderMax = computed(() => {
  return _.maxBy(breadcrumbs.value, (x: BreadcrumbModelItem) => x.order)?.order ?? -1;
})

function getBreadcrumbOrderMaxClass(order: number) {
  return order === orderMax.value ? "current-breadcrumb" : '';
}

function getBreadcrumbClass(breadcrumb: BreadcrumbModelItem) {
  let resultClass = ''
  if (breadcrumb.isActive) {
    resultClass = 'btn btn-primary btn-sm p-1';
  }
  else {
    if (breadcrumb.order === orderMax.value) {
      resultClass = `btn btn-secondary disabled my-0 p-1 me-2 cursor-normal text-light-gray ${getBreadcrumbOrderMaxClass(breadcrumb.order)}`;
    }
    else {
      resultClass = `btn btn-light disabled my-0 p-1 me-2 cursor-normal text-light-gray ${getBreadcrumbOrderMaxClass(breadcrumb.order)}`;
    }
  }

  return resultClass;
}

function getBreadcrumbListItemAttrs(breadcrumb: BreadcrumbModelItem) {
  let resultAttrs = {};
  if (breadcrumb.isActive) {
    resultAttrs = { 'class': 'me-2' }
  }
  else {
    if (breadcrumb.order === orderMax.value) {
      resultAttrs = { 'aria-current': 'page' }
    }
  }

  return resultAttrs;
}

</script>

<style scoped>

</style>
