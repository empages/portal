<template>
  <EmMainCard
    :title="strings.clientBuilder.languagesPageTitle"
    :sub-title="strings.clientBuilder.languagesPageDescription">
    <hr>
    <LanguageForm
      :language="language"
      :submit-button-text="submitFormText"
      :form-title="formTitle"
      @form:submit="submitForm"
      @form:reset="formReset" />
    <hr>
    <EmTable
      :columns="languagesTableColumns"
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
</template>

<script lang="ts" setup>
import {computed, onMounted, Ref, ref} from "vue";
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
import {strings} from "@/shared/strings";

const {showErrorToast, showSuccessToast} = useNotifications();

const editMode = ref(false);

const language: Ref<Language> = ref({
  id: 0,
  isDefault: false,
  code: '',
  name: '',
  nativeName: ''
})

const languages: Ref<Language[]> = ref([])

const submitFormText = computed(() => editMode.value ? 'Edit' : 'Create');
const formTitle = computed(() => editMode.value ? `Edit ${language.value.name}` : 'Create new');

async function submitForm(submittedLanguage: Language) {
  try {
    await clientBuilderService.createOrEditLanguage(submittedLanguage);
    await loadLanguages();
    editMode.value = false;
    language.value.name = ''
    language.value.nativeName = ''
    language.value.code = ''

    showSuccessToast('Language has been saved.');
  }
  catch (e) {
    handleRequestError(e, showErrorToast);
  }
}

function formReset(initialLanguage: Language) {
  language.value = initialLanguage;
  editMode.value = false;
}

async function loadLanguages() {
  try {
    languages.value = await clientBuilderService.getLanguages();
  }
  catch (e) {
    handleRequestError(e, showErrorToast);
  }
}

function selectForEdit(selectedLanguage: Language) {
  language.value = selectedLanguage;
  editMode.value = true;
}

async function setAsDefault(languageId: number) {
  try {
    await clientBuilderService.setLanguageAsDefault(languageId);
    await loadLanguages();
    showSuccessToast('Language has been set as default.');
  }
  catch (e) {
    handleRequestError(e, showErrorToast);
  }
}

async function deleteLanguage(languageId: number) {
  try {
    await clientBuilderService.deleteLanguage(languageId);
    await loadLanguages();
    showSuccessToast('Language has been deleted.');
  }
  catch (e) {
    handleRequestError(e, showErrorToast);
  }
}

onMounted(async () => {
  await loadLanguages()
})

</script>

<style scoped lang="scss">
  .mx-2px {
    margin-left: 2px !important;
    margin-right: 2px !important;
  }
</style>
