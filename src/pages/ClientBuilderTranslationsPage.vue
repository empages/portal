<template>
  <EmMainCard
    :title="strings.clientBuilder.translationsPageTitle"
    :sub-title="strings.clientBuilder.translationsPageDescription">
    <TranslationKeyForm
      v-if="languages && languages.length"
      :languages="languages"
      @form:submit="submitForm" />
    <hr>
    <label class="w-100 d-block">
      <input
        :value="searchQuery"
        class="form-control w-100"
        placeholder="Search translations by key or value.."
        @input="debounceFilterInputHandler">
    </label>
    <hr>
    <div>
      <div
        v-if="!gridData"
        class="text-center">
        <i class="mdi mdi-24px mdi-spin mdi-loading" />
      </div>
      <div v-else>
        <div class="responsive-table">
          <table class="table table-hover table-striped">
            <thead>
              <tr class="text-center border">
                <th class="p-1 pb-2">
                  <strong>Key</strong>
                </th>
                <th
                  v-for="language in languages"
                  :key="'Language' + language.code"
                  class="p-1 pb-2">
                  <strong>{{ language.nativeName }}</strong>
                </th>
                <th class="p-1 pb-2" />
              </tr>
            </thead>
            <tbody v-if="gridData">
              <TranslationKeyRow
                v-for="(dataItem, dataItemIndex) in gridData.items"
                :key="`data-item-${dataItemIndex}`"
                :input-data="dataItem"
                :change-detected="detectChange"
                @edit:key="editKey"
                @delete:key="deleteKey" />
            </tbody>
          </table>
        </div>
        <EmPagination
          v-if="gridData && gridData.pagesCount > 1"
          :page="gridData.currentPage"
          :pages-count="gridData.pagesCount"
          @select:page="selectPage" />
      </div>
    </div>
  </EmMainCard>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import {onMounted, Ref, ref} from "vue";
import EmPagination from "@/components/base/EmPagination.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import TranslationKeyForm from "@/components/forms/TranslationKeyForm.vue";
import TranslationKeyRow from "@/components/wrappers/TranslationKeyRow.vue";
import clientBuilderService from '@/services/client-builder-service';
import {handleRequestError} from "@/shared/helpers";
import {TranslationKey} from "@/models/translation-key";
import {Language} from "@/models/language";
import {TranslationGridData} from "@/models/translation-grid-data";
import {NewTranslationKeyWithValues} from "@/models/new-translation-key-with-values";
import { strings } from '@/shared/strings';
import {useRoute, useRouter} from "vue-router";
import {notificationProvider} from "@/services/notification-provider";

const route = useRoute();
const router = useRouter();
const changeDetected = ref(false);
const gridData: Ref<TranslationGridData | null> = ref(null);
const languages: Ref<Array<Language>> = ref([]);
const page = ref(1);
const searchQuery = ref('');

const debounceFunction = _.debounce((inputEvent) => {
  searchQuery.value = inputEvent.target.value;
  page.value = 1;
  loadGridData();
}, 500)

function debounceFilterInputHandler(event: Event) {
  debounceFunction(event)
}

async function loadLanguages() {
  try {
    languages.value = await clientBuilderService.getLanguages();
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

function detectChange() {
  changeDetected.value = true;
}

async function selectPage(selectedPage: number) {
  page.value = selectedPage;
  await loadGridData();
}

function loadQueryParams() {
  page.value = (route.query.page || 1) as number;
  searchQuery.value = (route.query.searchQuery || '') as string;
}

async function deleteKey(keyId: number) {
  try {
    await clientBuilderService.deleteTranslationKey(keyId);
    await loadGridData();
    notificationProvider.showSuccessToast('Translation key has been deleted.');
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function loadGridData() {
  try {
    await router.push({
      name: 'client-builder-translations',
      query: {
        searchQuery: searchQuery.value,
        page: page.value
      }
    });

    gridData.value = await clientBuilderService.getTranslationsGrid(page.value, searchQuery.value);
    page.value = gridData.value.currentPage;
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function submitForm(key: NewTranslationKeyWithValues, successCallback: () => void) {
  try {
    await clientBuilderService.createTranslationKey(key);
    notificationProvider.showSuccessToast('Translation key has been created.');
    successCallback();
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function editKey(key: TranslationKey, successCallback: () => void) {
  try {
    await clientBuilderService.editTranslationKey(key);
    successCallback();
    notificationProvider.showSuccessToast('Translation key has been edited');
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

onMounted(async () => {
  loadQueryParams();
  await loadLanguages();
  await loadGridData();
})

</script>

<style scoped>

</style>
