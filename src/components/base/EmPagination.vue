<template>
  <nav class="d-flex mt-4">
    <ul class="pagination m-auto">
      <li
        v-if="model.previousPage !== null && model.previousPagesCount > 0"
        class="page-item mx-0">
        <button
          type="button"
          class="btn btn-primary p-2"
          @click="selectPage(model.previousPage)">
          <i class="mdi mdi-arrow-left-bold mx-auto" />
        </button>
      </li>
      <li
        v-for="(previousPage, index) in previousPages"
        :key="`previous-${index}`"
        class="page-item ms-1 me-0">
        <button
          type="button"
          class="btn btn-primary p-2"
          @click="selectPage(previousPage)">
          {{ previousPage }}
        </button>
      </li>
      <li class="page-item active mx-1 mb-0">
        <button
          :disabled="true"
          class="btn btn-secondary p-2">
          {{ model.currentPage }}
        </button>
      </li>
      <li
        v-for="(nextPage, index) in nextPages"
        :key="`next-${index}`"
        class="page-item ms-0 me-1">
        <button
          type="button"
          class="btn btn-primary p-2"
          @click="selectPage(nextPage)">
          {{ nextPage }}
        </button>
      </li>
      <li
        v-if="model.nextPage !== null && model.nextPagesCount > 0"
        class="page-item mx-0"
        @click="selectPage(model.nextPage)">
        <button
          type="button"
          class="btn btn-primary p-2">
          <i class="mdi mdi-arrow-right-bold mx-auto" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, withDefaults} from "vue";
import {EmPaginationModel} from "@/shared/types/em-pagination-model";

const props = withDefaults(defineProps<{
  page?: number,
  pagesCount?: number,
  model?: EmPaginationModel | null
}>(), {
  page: 1,
  pagesCount: 0,
  model: () => null
});

const emit = defineEmits(['select:page']);

const model: ComputedRef<EmPaginationModel> = computed(() => {
  if (props.model) {
    return props.model;
  }

  const model =  {
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    nextPagesCount: 0,
    previousPagesCount: 0
  } as EmPaginationModel;

  build(model, props.page, props.pagesCount);

  return model;
})

const nextPages = computed(() => {
  const pages = [];
  for (let i = 1; i <= model.value.nextPagesCount; i++) {
    pages.push(model.value.currentPage + i);
  }

  return pages;
})

const previousPages = computed(() => {
  const pages = [];
  for (let i = model.value.previousPagesCount; i >= 1; i--) {
    pages.push(model.value.currentPage - i);
  }

  return pages;
})

function selectPage(page: number | null): void {
  if (page) {
    emit('select:page', page);
  }
}

function build(model: EmPaginationModel, currentPage: number, pagesCount: number) {
  model.currentPage = currentPage;

  if (model.currentPage !== 1) {
    model.previousPage = model.currentPage - 1;
  }

  if (model.currentPage !== pagesCount) {
    model.nextPage = model.currentPage + 1;
  }

  for (let i = 1; i <= 2; i++) {
    if (model.currentPage - i >= 1) {
      model.previousPagesCount++;
    }

    if (model.currentPage + i <= pagesCount) {
      model.nextPagesCount++;
    }
  }
}

</script>

<style scoped>

</style>
