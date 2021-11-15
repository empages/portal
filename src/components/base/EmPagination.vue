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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EmPagination",
  props: {
    page: {
      type: Number,
      required: true
    },
    pagesCount: {
      type: Number,
      required: true
    }
  },
  emits: ['select:page'],
  data() {
    return {
    }
  },
  computed: {
    model() {
      const model =  {
        currentPage: 0,
        nextPage: null,
        previousPage: null,
        nextPagesCount: 0,
        previousPagesCount: 0
      } as EmPaginationModel;

      this.build(model, this.page, this.pagesCount);

      return model;
    },
    nextPages() {
      const pages = [];
      for (let i = 1; i <= this.model.nextPagesCount; i++) {
        pages.push(this.model.currentPage + i);
      }

      return pages;
    },
    previousPages() {
      const pages = [];
      for (let i = this.model.previousPagesCount; i >= 1; i--) {
        pages.push(this.model.currentPage - i);
      }

      return pages;
    }
  },
  methods: {
    selectPage(page: number | null): void {
      if (page) {
        this.$emit('select:page', page);
      }
    },
    build(model: EmPaginationModel, currentPage: number, pagesCount: number) {
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
  }
})

interface EmPaginationModel {
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  nextPagesCount: number;
  previousPagesCount: number;
}

</script>

<style scoped>

</style>
