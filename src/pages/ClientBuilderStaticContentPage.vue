<template>
  <EmMainCard
    :title="strings.clientBuilder.staticContentPageTitle"
    :sub-title="strings.clientBuilder.staticContentPageDescription">
    <div>
      <form @submit.prevent="submitContentKey">
        <div class="row m-0">
          <div class="form-group col-12 col-md px-1 pb-md-0">
            <div class="w-100 position-relative">
              <select
                v-model="selectedKey"
                class="form-control"
                @change="selectContentKey">
                <option :value="0">
                  Add New Key
                </option>
                <optgroup label="Current Keys">
                  <option
                    v-for="contentKey in contentKeys"
                    :key="'contentKey' + contentKey.id"
                    :value="contentKey.id">
                    {{ contentKey.key }}
                  </option>
                </optgroup>
              </select>
            </div>
          </div>
          <div class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
            <div class="w-100 position-relative">
              <input
                v-if="currentContentEntity"
                v-model="currentContentEntity.key"
                class="form-control"
                placeholder="Key"
                @keypress="isKeyValid"
                @input="onKeyInput">
            </div>
          </div>
          <div class="form-group col-12 col-md-2 col-lg-1 px-1 pb-2 pt-3 pb-md-0 pt-2 pt-md-0">
            <button
              class="btn btn-primary w-100 h-100"
              type="submit">
              {{ submitButtonText }}
            </button>
          </div>
          <div
            v-if="selectedKey !== 0"
            class="form-group col-12 col-md-2 col-lg-1 px-1">
            <EmConfirmation
              v-slot="{ context }"
              :callback="deleteContentKey"
              message="Are you sure you want to delete this static content instance?"
              class="w-100 h-100">
              <button
                class="btn btn-primary w-100 h-100"
                type="button"
                @click="context.show">
                Delete
              </button>
            </EmConfirmation>
          </div>
        </div>
      </form>
    </div>
    <div v-if="currentContentEntity">
      <div
        v-for="(contentItem, contentItemIndex) in currentContentEntity.staticContentList"
        :key="'code-editor-' + contentItemIndex">
        <hr>
        <h6>{{ getLanguageById(contentItem.languageId)?.name }} Version</h6>
        <div class="border">
          <EmHtmlRawEditor v-model="contentItem.content" />
        </div>
      </div>
    </div>
  </EmMainCard>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, Ref} from "vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import EmHtmlRawEditor from "@/components/base/EmHtmlRawEditor.vue";
import clientBuilderService from "@/services/client-builder-service";
import {handleRequestError, transformKeyInput, isKeyValid} from "@/shared/helpers";
import {StaticContentKey} from "@/models/static-content-key";
import { Language } from "@/models/language";
import {ContentKeyContent} from "@/models/content-key-content";
import { strings } from "@/shared/strings";
import {notificationProvider} from "@/services/notification-provider";

const languages: Ref<Array<Language>> = ref([]);
const contentKeys: Ref<Array<StaticContentKey>> = ref([]);
const currentContentEntity: Ref<StaticContentKey | null> = ref(null);
const selectedKey = ref(0);

const editMode = computed(() => selectedKey.value !== 0)
const submitButtonText = computed(() => editMode.value ? 'Edit' : 'Create')

async function loadLanguages() {
  try {
    languages.value = await clientBuilderService.getLanguages();
    initEmptyEntity();
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function loadContentKeys() {
  try {
    contentKeys.value = await clientBuilderService.getStaticContentKeys();
    selectedKey.value = 0;
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function createContentKey() {
  try {
    if (currentContentEntity.value) {
      await clientBuilderService.createContentKeyWithValues(currentContentEntity.value);
      await loadLanguages();
      await loadContentKeys();
      notificationProvider.showSuccessToast('Static Content key has been created');
    }
    else {
      notificationProvider.showWarningToast('Static Content key is not initialized');
    }
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function editContentKey() {
  try {
    if (currentContentEntity.value) {
      await clientBuilderService.editContentKey(selectedKey.value, currentContentEntity.value);
      await loadLanguages();
      await loadContentKeys();
      notificationProvider.showSuccessToast('Static Content key has been edited');
    }
    else {
      notificationProvider.showWarningToast('Static Content key is not initialized');
    }
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

async function deleteContentKey() {
  try {
    await clientBuilderService.deleteContentKey(selectedKey.value);
    await loadLanguages();
    await loadContentKeys();
    notificationProvider.showSuccessToast('Static Content key has been deleted');
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

function submitContentKey() {
  if (editMode.value) {
    editContentKey();
  }
  else {
    createContentKey();
  }
}

function initEmptyEntity() {
  currentContentEntity.value = null;
  currentContentEntity.value = {
    key: '',
    staticContentList: [] as Array<ContentKeyContent>
  } as StaticContentKey;

  for (let i = 0; i < languages.value.length; i++) {
    currentContentEntity.value.staticContentList.push({
      content: "",
      languageId: languages.value[i].id,
    } as ContentKeyContent);
  }
}

function getLanguageById(id: number) {
  return languages.value.find(x => x.id === id);
}

async function loadStaticContent(keyId: number) {
  try {
    currentContentEntity.value = null;
    currentContentEntity.value = await clientBuilderService.getStaticContent(keyId);
  }
  catch (e) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

function selectContentKey() {
  if (selectedKey.value !== 0) {
    loadStaticContent(selectedKey.value);
  }
  else {
    initEmptyEntity();
  }
}

function onKeyInput(event: Event) {
  if (currentContentEntity.value) {
    currentContentEntity.value.key = transformKeyInput(event)
  }
}

onMounted(async () => {
  await loadLanguages();
  await loadContentKeys();
})

</script>

<style scoped>

</style>
