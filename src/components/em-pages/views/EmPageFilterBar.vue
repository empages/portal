<template>
  <form
    class="d-block d-sm-flex"
    @submit.prevent="triggerFilter">
    <div class="me-auto ms-0 w-auto mb-3 input-group">
      <select
        v-model="orderByRef"
        class="form-control w-auto"
        aria-describedby="button-order-by">
        <option :value="''">
          -- Default Order --
        </option>
        <option
          v-for="(orderByProperty, orderByPropertyIndex) in props.orderByProperties"
          :key="`${viewModel?.context.route}-order-by-${orderByPropertyIndex}`"
          :value="orderByProperty.key">
          {{ orderByProperty.value }}
        </option>
      </select>
      <select
        v-model="orderByTypeRef"
        class="form-control w-auto"
        aria-describedby="button-order-by">
        <option :value="orderByTypes[0]">
          Ascending
        </option>
        <option :value="orderByTypes[1]">
          Descending
        </option>
      </select>
      <button
        id="button-order-by"
        class="btn btn-primary"
        type="submit">
        Order
      </button>
    </div>
    <div class="me-0 ms-auto w-auto input-group mb-3 ">
      <input
        v-model="searchQueryRef"
        type="text"
        class="form-control"
        placeholder="Search.."
        aria-label="Search"
        aria-describedby="button-search">
      <button
        id="button-search"
        class="btn btn-primary"
        type="submit">
        Search
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>

import {ref, Ref, watch} from "vue";
import {EmPageIndexViewModel} from "@/models/em-page-index-view-model";
import {useRoute} from "vue-router";

const props = defineProps<{
  searchQuery: string,
  orderBy: string,
  orderByType: string,
  orderByProperties: Array<{
    key: string,
    value: string
  }>,
  viewModel: EmPageIndexViewModel
}>()

const emit = defineEmits([
  'update:searchQuery',
  'update:orderBy',
  'update:orderByType',
  'on:filter'
])

const route = useRoute();

const orderByTypes = ['asc', 'desc'];

const searchQueryRef = ref(props.searchQuery);
const orderByRef: Ref<string> = ref(props.orderBy);
const orderByTypeRef: Ref<string | null> = ref(props.orderByType);

watch(searchQueryRef, value => {
  emit('update:searchQuery', value);
})

watch(orderByRef, value => {
  emit('update:orderBy', value);
})

watch(orderByTypeRef, value => {
  emit('update:orderByType', value);
})

function triggerFilter() {
  emit('on:filter');
}

</script>

<style scoped>
</style>
