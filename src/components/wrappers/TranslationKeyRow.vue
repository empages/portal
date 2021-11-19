<template>
  <tr>
    <td class="p-1">
      <div class="position-relative">
        <input
          v-model="rowData.key"
          class="form-control"
          @keyup.ctrl.enter="editKey"
          @keypress="isKeyValid"
          @input="onKeyInput">
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
          :ref="el => { translationsTextareaItems[translationIndex] = el }"
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

<script lang="ts" setup>
import {defineProps, Ref, ref, defineEmits, computed, watch, nextTick} from "vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import {TranslationGridItem} from "@/models/translation-grid-item";
import {isKeyValid, transformKeyInput} from "@/utils/helpers";

const props = defineProps<{
  inputData: TranslationGridItem,
  changeDetected: () => void
}>();

const emit = defineEmits([
  'edit:key',
  'delete:key'
]);

const keyEditedStatus = ref(false);
const inputSizeStatuses: Ref<Array<boolean>> = ref([]);
const translationsTextareaItems: Ref<Array<any>> = ref([]);
const rowData: Ref<TranslationGridItem> = ref(props.inputData);

const keyId = computed(() => {
  return rowData.value.keyId;
})

watch(() => props.inputData, (value) => {
  rowData.value = Object.assign({}, value) as TranslationGridItem;
})

function focusInput(index: number, value: boolean) {
  inputSizeStatuses.value[index] = value;
  if (value) {
    nextTick(() => {
      (translationsTextareaItems.value[index] as HTMLTextAreaElement).focus();
    })
  }
}

function onKeyInput(event: Event) {
  rowData.value.key = transformKeyInput(event);
  keyEditedStatus.value = true;
}

function deleteKey() {
  emit('delete:key', keyId.value);
}

function editKey() {
  emit('edit:key', {
    id: rowData.value.keyId,
    key: rowData.value.key,
    values: rowData.value.languageValues
  }, () => keyEditedStatus.value = false);
}

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
