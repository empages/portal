<template>
  <EmClientBuilderLayout>
    <EmMainCard
      :title="title"
      :sub-title="subTitle">
      <hr>
      <LanguageForm
        :language="language"
        :submit-button-text="submitFormText"
        :form-title="formTitle"
        @form:submit="submitForm"
        @form:reset="formReset" />
      <hr>
      <EmTable
        :columns="tableColumns"
        :data="languages">
        <template #default="{ data }">
          <EmFlag :value="data.isDefault" />
        </template>
        <template #actions="{ data }">
          <div>
            <button
              class="btn btn-primary px-2 py-1 mx-2px"
              :class="{ 'btn-light': data.isDefault }"
              :disabled="data.isDefault"
              @click="setAsDefault(data.id)">
              Set as default
            </button>
            <button
              class="btn btn-primary px-2 py-1 mx-2px"
              @click="selectForEdit(data)">
              Select to edit
            </button>
            <EmConfirmation
              v-slot="{ context }"
              :callback="() => deleteLanguage(data.id)"
              :message="`Are you sure you want to delete ${data.name} language? All related translation of that language will be deleted as well.`"
              :confirmation-word="`delete-${data.code}`"
              class="d-inline-block">
              <button
                class="btn btn-primary px-2 py-1 mx-2px"
                @click="context.show">
                Delete
              </button>
            </EmConfirmation>
          </div>
        </template>
      </EmTable>
    </EmMainCard>
  </EmClientBuilderLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import EmTable from "@/components/base/EmTable.vue";
import EmFlag from "@/components/base/EmFlag.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import { useNotifications } from "@/composables/notifications-composable";
import {Language} from "@/models/language";
import clientBuilderService from "@/services/client-builder-service";
import {handleRequestError} from "@/utils/helpers";
import { languagesTableColumns } from "@/shared/tables-columns/languages-table-columns";
import LanguageForm from "@/components/forms/LanguageForm.vue";
import EmClientBuilderLayout from "@/components/layouts/EmClientBuilderLayout.vue";
import {strings} from "@/shared/strings";
export default defineComponent({
  name: "ClientBuilderLanguagesPage",
  components: {EmClientBuilderLayout, LanguageForm, EmConfirmation, EmFlag, EmTable, EmMainCard},
  setup() {
    return {
      ...useNotifications()
    }
  },
  data() {
    return {
      title: strings.clientBuilder.languagesPageTitle,
      subTitle: strings.clientBuilder.languagesPageDescription,
      editMode: false,
      language: {
        code: '',
        name: '',
        nativeName: ''
      } as any,
      tableColumns: languagesTableColumns,
      languages: [] as Array<Language>,
    }
  },
  computed: {
    submitFormText(): string {
      return this.editMode ? 'Edit' : 'Create';
    },
    formTitle(): string {
      return this.editMode ? `Edit ${this.language.name}` : 'Create new';
    }
  },
  async mounted() {
    await this.loadLanguages();
  },
  methods: {
    async submitForm(language: Language) {
      try {
        await clientBuilderService.createOrEditLanguage(language);
        await this.loadLanguages();
        this.editMode = false;
        this.language = {
          code: '',
          name: '',
          nativeName: ''
        }

        this.showSuccessToast('Language has been saved.');
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    formReset(language: Language) {
      this.language = language;
      this.editMode = false;
    },
    async loadLanguages() {
      try {
        this.languages = await clientBuilderService.getLanguages();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    selectForEdit(language: Language) {
      this.language = language;
      this.editMode = true;
    },
    async setAsDefault(languageId: number) {
      try {
        await clientBuilderService.setLanguageAsDefault(languageId);
        await this.loadLanguages();
        this.showSuccessToast('Language has been set as default.');
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async deleteLanguage(languageId: number) {
      try {
        await clientBuilderService.deleteLanguage(languageId);
        await this.loadLanguages();
        this.showSuccessToast('Language has been deleted.');
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .mx-2px {
    margin-left: 2px !important;
    margin-right: 2px !important;
  }
</style>
