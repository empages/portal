<template>
  <EmClientBuilderLayout>
    <EmMainCard
      :title="title"
      :sub-title="subTitle">
      <div>
        <form>
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
                  @input="currentContentEntity.key = transformKeyInput($event)">
              </div>
            </div>
            <div class="form-group col-12 col-md-2 col-lg-1 px-1 pb-2 pt-3 pb-md-0 pt-2 pt-md-0">
              <button
                class="btn btn-primary w-100 h-100"
                type="submit">
                {{ submitButtonText }}
              </button>
            </div>
            <div class="form-group col-12 col-md-2 col-lg-1 px-1">
              <EmConfirmation
                v-slot="{ context }"
                :callback="deleteContentKey"
                message="Are you sure you want to delete this static content instance?"
                class="w-100">
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
          <h6>{{ getLanguageById(contentItem.languageId).name }} Version</h6>
          <div class="border">
            <EmHtmlRawEditor v-model="contentItem.content" />
          </div>
        </div>
      </div>
    </EmMainCard>
  </EmClientBuilderLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EmClientBuilderLayout from "@/components/layouts/EmClientBuilderLayout.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import {keyMixin} from "@/mixins/keyMixin";
import EmHtmlRawEditor from "@/components/base/EmHtmlRawEditor.vue";
import clientBuilderService from "@/services/client-builder-service";
import {handleRequestError} from "@/utils/helpers";
import {useNotifications} from "@/composables/notifications-composable";
import {StaticContentKey} from "@/models/static-content-key";
import { Language } from "@/models/language";
import {ContentKeyContent} from "@/models/content-key-content";
import { strings } from "@/shared/strings";
export default defineComponent({
  name: "StaticContentPage",
  components: {
    EmHtmlRawEditor,
    EmConfirmation,
    EmMainCard, EmClientBuilderLayout},
  mixins: [keyMixin],
  setup() {
    return {
      ...useNotifications()
    }
  },
  data() {
    return {
      title: strings.clientBuilder.staticContentPageTitle,
      subTitle: strings.clientBuilder.staticContentPageDescription,
      languages: [] as Array<Language>,
      contentKeys: [] as Array<StaticContentKey>,
      currentContentEntity: {
        key: '',
        staticContentList: [] as Array<ContentKeyContent>
      } as StaticContentKey | null,
      selectedKey: 0
    }
  },
  computed: {
    editMode() {
      return this.selectedKey !== 0;
    },
    submitButtonText() {
      return this.editMode ? 'Edit' : 'Create';
    },
    formTitle() {
      return this.editMode ? `Edit` : 'Create new';
    }
  },
  mounted() {
    this.loadLanguages();
    this.loadContentKeys();
  },
  methods: {
    async loadLanguages() {
      try {
        this.languages = await clientBuilderService.getLanguages();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async loadContentKeys() {
      try {
        this.contentKeys = await clientBuilderService.getStaticContentKeys();
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    createContentKey() {
      console.log('create');
    },
    initEmptyEntity() {
      this.currentContentEntity = {
        key: '',
        staticContentList: [] as Array<ContentKeyContent>
      } as StaticContentKey;

      for (let i = 0; i < this.languages.length; i++) {
        this.currentContentEntity.staticContentList.push({
          content: "",
          languageId: this.languages[i].id,
        } as ContentKeyContent);
      }
    },
    getLanguageById(id: number) {
      return this.languages.find(x => x.id === id);
    },
    async loadStaticContent(keyId: number) {
      try {
        this.currentContentEntity = null;
        this.currentContentEntity = await clientBuilderService.getStaticContent(keyId);
      }
      catch (e) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    selectContentKey() {
      if (this.selectedKey !== 0) {
        this.loadStaticContent(this.selectedKey);
      }
      else {
        this.initEmptyEntity();
      }
    },
    editContentKey() {
      console.log('edit');
    },
    deleteContentKey() {
      console.log('delete');
    },
  }
})
</script>

<style scoped>

</style>
