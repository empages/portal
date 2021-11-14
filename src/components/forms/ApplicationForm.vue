<template>
  <EmCard
    class="h-100"
    :title="title">
    <form @submit.prevent="formSubmit">
      <EmFormGroup label="Name">
        <EmInput
          v-model="form.name"
          placeholder="Enter name"
          :validator="v$.form.name" />
      </EmFormGroup>
      <EmFormGroup label="URL">
        <EmInput
          v-model="form.url"
          type="url"
          placeholder="Enter URL"
          :validator="v$.form.url" />
      </EmFormGroup>
      <EmFormGroup label="Gateway Id">
        <EmInput
          v-model="form.gatewayId"
          placeholder="Enter gateway Id"
          :validator="v$.form.gatewayId" />
      </EmFormGroup>
      <EmFormGroup classes="mb-0 mt-3">
        <button
          class="btn btn-primary w-100 btn-submit mb-2"
          type="submit">
          Save
        </button>
        <EmConfirmation
          v-slot="{ context }"
          class="w-100"
          message="Are you sure you want to reset that form?"
          :callback="resetForm">
          <button
            type="button"
            class="btn btn-light w-100 btn-submit"
            @click="context.show">
            Reset
          </button>
        </EmConfirmation>
      </EmFormGroup>
    </form>
  </EmCard>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue'
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { Application } from '@/models/application';
import EmCard from "@/components/base/EmCard.vue";
import EmConfirmation from "@/components/base/EmConfirmation.vue";

export default defineComponent({
  name: "ApplicationForm",
  components: {EmConfirmation, EmCard, EmInput, EmFormGroup},
  props: {
    title: {
      type: String,
      required: true
    },
    application: {
      type: Object as () => Application,
      required: true
    }
  },
  emits: ['form:submit', 'form:reset'],
  setup (props: any) {
    const form: Ref<Application> = ref<Application>(Object.assign({}, props.application));
    return {
      form,
      v$: useVuelidate() as any
    }
  },
  validations (): any {
    return {
      form: {
        name: { required: helpers.withMessage('Name is required', required), },
        url: { required: helpers.withMessage('URL is required', required) },
        gatewayId: { required: helpers.withMessage('Gateway Id is required', required), }
      }
    }
  },
  watch: {
    application(value: Application) {
      this.form = Object.assign({}, value);
    }
  },
  methods: {
    async formSubmit() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return;
      }

      this.$emit('form:submit', this.form, this.successSubmitCallback);
      this.v$.$reset();
    },
    successSubmitCallback():void {
      this.resetForm();
    },
    resetForm() {
      this.form = {
        id: '',
        name: '',
        url: '',
        gatewayId: '',
        environment: ''
      }
      this.$emit('form:reset', this.form);
      this.v$.$reset();
      this.$forceUpdate();
    }
  }
})
</script>

<style scoped>

</style>
