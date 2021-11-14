<template>
  <tr>
    <td class="p-1">
      <div class="position-relative">
        <input
          v-model="rowData.key"
          class="form-control"
          @keyup.ctrl.enter="editKey"
          @keypress="isKeyValid"
          @input="rowData.key = transformKeyInput($event); keyEditedStatus = true;">
      </div>
    </td>
    <td
      v-for="(translation, translationIndex) in rowData.languageValues"
      :key="rowData.key + 'Translation' + translationIndex"
      class="p-1">
      <div class="position-relative">
        <input
          v-if="!inputSizeStatuses[translationIndex]"
          v-model="translation.value"
          class="form-control"
          @focusin="focusInput(translationIndex, true)">
        <textarea
          v-show="inputSizeStatuses[translationIndex]"
          :ref="el => translationsTextareaItems[translationIndex] = el"
          v-model="translation.value"
          class="form-control"
          rows="5"
          @input="keyEditedStatus = true"
          @keyup.ctrl.enter="editKey"
          @focusout="focusInput(translationIndex, false)" />
      </div>
    </td>
    <td class="p-1 text-center fit">
      <div class="d-flex">
        <button
          :disabled="!keyEditedStatus"
          :class="{ 'opacity-25 btn-light': !keyEditedStatus }"
          class="btn btn-primary me-1 btn-icon"
          type="button"
          @click="editKey">
          <i class="mdi mdi-content-save" />
        </button>
        <EmConfirmation
          v-slot="{ context }"
          message="Are you sure you want to delete this key and its translations?"
          :confirmation-word="`delete-key-${keyId}`"
          :callback="() => deleteKey()">
          <button
            class="btn btn-primary btn-icon"
            type="button"
            @click="context.show">
            <i class="mdi mdi-trash-can" />
          </button>
        </EmConfirmation>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {keyMixin} from "@/mixins/keyMixin";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import { TranslationKey } from "@/models/translation-key";

export default defineComponent({
  name: "TranslationKeyRow",
  components: {EmConfirmation},
  mixins: [keyMixin],
  props: {
    inputData: {
      type: Object,
      required: true
    },
    changeDetected: {
      type: Function,
      required: true
    }
  },
  emits: [
    'edit:key',
    'delete:key'
  ],
  data() {
    return {
      keyEditedStatus: false,
      inputSizeStatuses: [] as Array<boolean>,
      translationsTextareaItems: [] as Array<HTMLTextAreaElement>,
      rowData: Object.assign({}, this.inputData)
    }
  },
  computed: {
    keyId() {
      return this.rowData.keyId;
    },
    key() {
      return this.rowData.key;
    }
  },
  watch: {
    inputData(value) {
      this.rowData = Object.assign({}, value);
    }
  },
  methods: {
    focusInput(index: number, value: boolean) {
      this.inputSizeStatuses[index] = value;
      if (value) {
        this.$nextTick(() => {
          this.translationsTextareaItems[index].focus();
        })
      }
    },
    deleteKey() {
      this.$emit('delete:key', this.keyId);
    },
    editKey() {
      this.$emit('edit:key', {
        id: this.rowData.keyId,
        key: this.rowData.key,
        values: this.rowData.languageValues
      } as TranslationKey, () => this.keyEditedStatus = false);
    }
  }
})
</script>

<style scoped lang="scss">
  td {
    vertical-align: top !important;
  }

  .btn-save-in-input {
    position: absolute !important;
    top: 4px;
    right: 4px;
    padding: 4px 0 4px 5px;
    font-size: 16px;
    text-align: center;
  }

  .btn-icon {
    padding: 4px 5px !important;
    font-size: 20px !important;
    text-align: center;
    width: 36px;
    height: 36px;
  }

  input.form-control {
    height: 36px;
  }
</style>
