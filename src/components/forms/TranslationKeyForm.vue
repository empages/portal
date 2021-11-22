<template>
  <div>
    <form @submit.prevent="formSubmit">
      <div class="row m-0">
        <div class="form-group col-12 col-md px-1 pb-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.key"
              placeholder="Key"
              :validator="v$.key"
              :input-event="onKeyInput"
              @keypress="isKeyValid" />
          </div>
        </div>
        <div
          v-for="(translation, translationIndex) in form.values"
          :key="form.key + 'Translation' + translationIndex"
          class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
          <div class="w-100 position-relative">
            <input
              v-if="!inputSizeStatuses[translationIndex]"
              v-model="translation.value"
              class="form-control"
              :placeholder="`Translation in ${getLanguage(translation.languageId)?.name}`"
              @focusin="focusInput(translationIndex, true)">
            <textarea
              v-show="inputSizeStatuses[translationIndex]"
              :ref="el => { translationsTextareaItems[translationIndex] = el }"
              v-model="translation.value"
              class="form-control"
              :placeholder="`Translation in ${getLanguage(translation.languageId)?.name}`"
              rows="5"
              @focusout="focusInput(translationIndex, false)" />
          </div>
        </div>
        <div class="form-group col-12 col-md-2 col-lg-1 px-1 pb-2 pt-3 pb-md-0 pt-2 pt-md-0">
          <button
            class="btn btn-primary w-100 h-100"
            type="submit">
            Create
          </button>
        </div>
        <div class="form-group col-12 col-md-2 col-lg-1 px-1">
          <EmConfirmation
            v-slot="{ context }"
            :callback="resetForm"
            message="Are you sure you want to reset the form?"
            class="w-100">
            <button
              class="btn btn-primary w-100 h-100"
              type="button"
              @click="context.show">
              Reset
            </button>
          </EmConfirmation>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import {defineProps, defineEmits, ref, Ref, watch, nextTick} from "vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import EmInput from "@/components/base/EmInput.vue";
import {Language} from "@/models/language";
import {transformKeyInput, isKeyValid} from "@/shared/helpers";
import {NewTranslationKeyWithValues} from "@/models/new-translation-key-with-values";

const props = defineProps<{
  languages: Array<Language>
}>()

const emit = defineEmits(['form:submit', 'form:reset']);

let form: Ref<NewTranslationKeyWithValues> = ref(getEmptyForm(props.languages))
const rules = {
  key: { required: helpers.withMessage('Translation key is required', required), }
}

const v$ = useVuelidate(rules, form);

const inputSizeStatuses: Ref<Array<boolean>> = ref([]);
const translationsTextareaItems: Ref<Array<any>> = ref([]);

watch(() => props.languages, (value) => {
  form.value = getEmptyForm(value);
})

async function formSubmit() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }

  emit('form:submit', form.value, successCallback);
  v$.value.$reset();
}

function onKeyInput(event: Event) {
  form.value.key = transformKeyInput(event);
}

function successCallback() {
  resetForm();
}

function getLanguage(languageId: number) {
  return props.languages.find(x => x.id === languageId);
}

function resetForm() {
  form.value.key = '';
  form.value.values.forEach(x => {
    x.value = ''
  })
  emit('form:reset', form.value);
  v$.value.$reset();
}

function focusInput(index: number, value: boolean) {
  inputSizeStatuses.value[index] = value;
  if (value) {
    nextTick(() => {
      (translationsTextareaItems.value[index] as HTMLTextAreaElement).focus();
    })
  }
}

function getEmptyForm(languages: Array<Language>): {key: string, values: Array<{ languageId: number, value: string }>} {
  return {
    key: '',
    values: languages.map(x => {
      return {
        languageId: x.id,
        value: ''
      }
    })
  }
}

</script>

<style scoped lang="scss">
  .btn-primary {
    max-height: 35px;
    min-height: 35px;
  }
</style>
