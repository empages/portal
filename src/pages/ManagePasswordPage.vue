<template>
  <EmCard title="Manage Password">
    <form @submit.prevent="changePassword">
      <EmFormGroup label="Current Password">
        <EmInput
          v-model="form.currentPassword"
          type="password"
          :validator="v$.currentPassword"
          placeholder="Current Password" />
      </EmFormGroup>
      <EmFormGroup label="New Password">
        <EmInput
          v-model="form.newPassword"
          type="password"
          :validator="v$.newPassword"
          placeholder="New Password" />
      </EmFormGroup>
      <EmFormGroup label="Confirmed Password">
        <EmInput
          v-model="form.confirmedPassword"
          type="password"
          :validator="v$.confirmedPassword"
          placeholder="Confirmed Password" />
      </EmFormGroup>
      <div class="form-group mb-0">
        <button
          type="submit"
          class="btn btn-primary mt-2">
          Change Password
        </button>
      </div>
    </form>
  </EmCard>
</template>

<script lang="ts" setup>

import EmCard from "@/components/base/EmCard.vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import {computed, ref} from "vue";
import {helpers, required, sameAs} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import {handleRequestError} from "@/shared/helpers";
import {notificationProvider} from "@/services/notification-provider";
const adminLayout = useAdminLayout();

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmedPassword: ''
});

const newPassword = computed(() => form.value.newPassword);

const rules = {
  currentPassword: { required: helpers.withMessage('Current password is required', required) },
  newPassword: { required: helpers.withMessage('New password is required', required) },
  confirmedPassword: { sameAsPassword: helpers.withMessage('Confirmed password has to match with new password', sameAs(newPassword)) }
};

const v$ = useVuelidate(rules, form);

adminLayout.reload({
  navbarActions: []
})

async function changePassword() {
  const isFormValid = await v$.value.$validate();
  if (isFormValid) {
    try {
      // const result = await adminService.changePassword(form.value.currentPassword, form.value.newPassword, form.value.confirmedPassword);
      // if (result.succeeded) {
      //   form.value.currentPassword = '';
      //   form.value.newPassword = '';
      //   form.value.confirmedPassword = '';
      //   v$.value.$reset();
      //   notificationProvider.showSuccessToast('Your password has been changed successfully');
      // }
      // else {
      //   notificationProvider.showErrorToast('Your password has not been changed');
      // }
    }
    catch (e) {
      handleRequestError(e, notificationProvider.handlers.showErrorToast);
    }
  }
}

</script>

<style scoped>

</style>
