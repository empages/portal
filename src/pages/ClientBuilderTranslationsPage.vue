<template>
  <EmClientBuilderLayout>
    <EmMainCard
      :title="title"
      :sub-title="subTitle">
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
                  :change-detected="changeDetectedTrigger"
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
  </EmClientBuilderLayout>
</template>

<script lang="ts">
import _ from 'lodash';
import {defineComponent} from "vue";
import EmPagination from "@/components/base/EmPagination.vue";
import EmClientBuilderLayout from "@/components/layouts/EmClientBuilderLayout.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import TranslationKeyForm from "@/components/forms/TranslationKeyForm.vue";
import TranslationKeyRow from "@/components/wrappers/TranslationKeyRow.vue";
import clientBuilderService from '@/services/client-builder-service';
import { useNotifications } from '@/composables/notifications-composable';
import {handleRequestError} from "@/utils/helpers";
import {TranslationKey} from "@/models/translation-key";
import {Language} from "@/models/language";
import {TranslationGridData} from "@/models/translation-grid-data";
import {NewTranslationKeyWithValues} from "@/models/new-translation-key-with-values";
import { strings } from '@/shared/strings';

export default defineComponent({
  name: "TranslationsPage",
  components: {TranslationKeyRow, TranslationKeyForm, EmMainCard, EmClientBuilderLayout, EmPagination},
  setup() {
    return {
      ...useNotifications()
    }
  },
  data() {
    return {
      title: strings.clientBuilder.translationsPageTitle,
      subTitle: strings.clientBuilder.translationsPageDescription,
      changeDetected: false,
      gridData: null as TranslationGridData | null,
      languages: [] as Array<Language>,
      page: 1,
      searchQuery: '',
      newKey: {
        key: '',
        languageValues: []
      },
      debounceFunc: (inputEvent: any) => console.log(inputEvent)
    }
  },
  async mounted() {
    this.loadQueryParams();
    await this.loadLanguages();
    await this.loadGridData();

    this.debounceFunc = _.debounce((inputEvent) => {
      this.searchQuery = inputEvent.target.value;
      this.page = 1;
      this.loadGridData();
    }, 500)
  },
  methods: {
    async deleteKey(keyId: number) {
      try {
        await clientBuilderService.deleteTranslationKey(keyId);
        await this.loadGridData();
        this.showSuccessToast('Translation key has been deleted.');
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    debounceFilterInputHandler(event: Event) {
      this.debounceFunc(event)
    },
    async editKey(key: TranslationKey, successCallback: () => void) {
      try {
        await clientBuilderService.editTranslationKey(key);
        successCallback();
        this.showSuccessToast('Translation key has been edited');
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    changeDetectedTrigger() {
      this.changeDetected = true;
    },
    async loadLanguages() {
      try {
        this.languages = await clientBuilderService.getLanguages();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async loadGridData() {
      try {
        await this.$router.push({
          name: 'client-builder-translations',
          query: {
            searchQuery: this.searchQuery,
            page: this.page
          }
        });

        this.gridData = await clientBuilderService.getTranslationsGrid(this.page, this.searchQuery);
        this.page = this.gridData.currentPage;
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async selectPage(page: number) {
      this.page = page;
      await this.loadGridData();
    },
    loadQueryParams() {
      this.page = (this.$route.query.page || 1) as number;
      this.searchQuery = (this.$route.query.searchQuery || '') as string;
    },
    async submitForm(key: NewTranslationKeyWithValues, successCallback: () => void) {
      try {
        await clientBuilderService.createTranslationKey(key);
        this.showSuccessToast('Translation key has been created.');
        successCallback();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
  }
})
</script>

<style scoped>

</style>
