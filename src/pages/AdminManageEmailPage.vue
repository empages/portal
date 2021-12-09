<template>
  <EmCard title="Manage Email">
    <form @submit.prevent="changeEmail">
      <EmFormGroup label="Current Email">
        <input
          v-model="currentEmail"
          class="form-control"
          readonly
          disabled>
      </EmFormGroup>
      <EmFormGroup label="New Email">
        <EmInput
          v-model="form.newEmail"
          placeholder="New Email"
          :validator="v$.newEmail" />
      </EmFormGroup>
      <EmFormGroup>
        <button
          type="submit"
          :disabled="currentEmail === form.newEmail"
          class="btn btn-primary mt-2">
          Change Email
        </button>
      </EmFormGroup>
    </form>
  </EmCard>
</template>

<script lang="ts" setup>

import EmCard from "@/components/base/EmCard.vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import {computed, ref} from "vue";
import {email, helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import adminService from "@/services/admin-service";
import {handleRequestError} from "@/shared/helpers";
import {useStore} from "vuex";
import {notificationProvider} from "@/services/notification-provider";

const adminLayout = useAdminLayout();
const store = useStore();

const form = ref({
  newEmail: ''
});

const currentEmail = computed(() => {
  return store.getters['identityModule/decodedIdentity'].sub;
})

const rules = {
  newEmail: { required: helpers.withMessage('Email is required', required), email }
};

const v$ = useVuelidate(rules, form);

adminLayout.reload({
  breadcrumbs: [
    {
      order: 0,
      isActive: false,
      actionUrl: '#',
      title: 'Manage'
    },
    {
      order: 1,
      isActive: false,
      actionUrl: '#',
      title: 'Email'
    }
  ],
  navbarActions: []
})

async function changeEmail() {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    try {
      const result = await adminService.changeEmail(form.value.newEmail);
      if (result.succeeded) {
        form.value.newEmail = '';
        v$.value.$reset();
        notificationProvider.showSuccessToast('Your email has been changed successfully');
      }
      else {
        notificationProvider.showErrorToast('Your email has not been changed');
      }
    }
    catch (e) {
      handleRequestError(e, notificationProvider.handlers.showErrorToast);
    }
  }
}
</script>

<style scoped>

</style>
