<template>
  <div>
    <form @submit.prevent="formSubmit">
      <div class="row m-0">
        <div class="form-group col-12 col-md px-1 pb-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.code"
              :validator="v$.form.code"
              placeholder="Code" />
          </div>
        </div>
        <div class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.name"
              :validator="v$.form.name"
              placeholder="Name" />
          </div>
        </div>
        <div class="form-group col-12 col-md px-1 pb-md-0 pt-2 pt-md-0">
          <div class="w-100 position-relative">
            <EmInput
              v-model="form.nativeName"
              :validator="v$.form.nativeName"
              placeholder="Native name" />
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
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { defineComponent } from "vue"
import EmInput from "@/components/base/EmInput.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import { useNotifications } from '@/composables/notifications-composable';

export default defineComponent({
  name: "LanguageForm",
  components: {EmConfirmation, EmInput},
  props: {
    language: {
      type: Object,
      required: true
    },
    submitButtonText: {
      type: String,
      required: true
    },
    formTitle: {
      type: String,
      required: true
    }
  },
  emits: ['form:submit', 'form:reset'],
  setup () {
    return {
      v$: useVuelidate(),
      ...useNotifications()
    }
  },
  data() {
    return {
      form: this.language,
      confirmationModal: null
    }
  },
  validations () {
    return {
      form: {
        code: { required: helpers.withMessage('Language code is required', required), },
        name: { required: helpers.withMessage('Name is required', required), },
        nativeName: { required: helpers.withMessage('Native name is required', required), }
      }
    }
  },
  watch: {
    language(value) {
      this.form = Object.assign({}, value);
    }
  },
  methods: {
    async formSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        this.showErrorToast("The language cannot be created");
        return;
      }

      this.$emit('form:submit', this.form);
      this.v$.$reset();
    },
    resetForm() {
      this.form = {
        code: '',
        name: '',
        nativeName: ''
      }
      this.$emit('form:reset', this.form);
      this.v$.$reset();
      this.showInfoToast("Language form has been reset");
    }
  }
})
</script>

<style scoped lang="scss">
  :deep {
    .confirmation-modal {
      height: 100%;
    }
  }

  .btn-primary {
    max-height: 35px;
    min-height: 35px;
  }
</style>
