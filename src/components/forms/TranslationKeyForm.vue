<template>
  <div>
    <form @submit.prevent="formSubmit">
      <div class="row m-0">
        <div class="form-group col-12 col-md px-1 pb-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.key"
              placeholder="Key"
              :validator="v$.form.key"
              :input-event="(event: InputEvent) => { form.key = transformKeyInput(event); }"
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
              :placeholder="`Translation in ${getLanguage(translation.languageId).name}`"
              @focusin="focusInput(translationIndex, true)">
            <textarea
              v-show="inputSizeStatuses[translationIndex]"
              :ref="el => translationsTextareaItems[translationIndex] = el"
              v-model="translation.value"
              class="form-control"
              :placeholder="`Translation in ${getLanguage(translation.languageId).name}`"
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

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import {helpers, required} from "@vuelidate/validators";
import {defineComponent} from "vue";
import {keyMixin} from "@/mixins/keyMixin";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import EmInput from "@/components/base/EmInput.vue";
import {Language} from "@/models/language";

export default defineComponent({
  name: "TranslationKeyForm",
  components: {EmInput, EmConfirmation},
  mixins: [keyMixin],
  props: {
    languages: {
      type: Array as () => Array<Language>,
      required: true
    }
  },
  emits: ['form:submit', 'form:reset'],
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      form: getEmptyForm(this.languages),
      inputSizeStatuses: [] as Array<boolean>,
      translationsTextareaItems: [] as Array<HTMLTextAreaElement>
    }
  },
  validations (): any {
    return {
      form: {
        key: { required: helpers.withMessage('Translation key is required', required), }
      }
    }
  },
  watch: {
    languages(value) {
      this.form = getEmptyForm(value);
    }
  },
  methods: {
    async formSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return
      }

      this.$emit('form:submit', this.form, this.successCallback);
      this.v$.$reset();
    },
    successCallback() {
      this.resetForm();
    },
    getLanguage(languageId: number) {
      return this.languages.find(x => x.id === languageId);
    },
    resetForm() {
      this.form = getEmptyForm(this.languages);
      this.$emit('form:reset', this.form);
      this.v$.$reset();
    },
    focusInput(index: number, value: boolean) {
      this.inputSizeStatuses[index] = value;
      if (value) {
        this.$nextTick(() => {
          this.translationsTextareaItems[index].focus();
        })
      }
    },
  }
})

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
