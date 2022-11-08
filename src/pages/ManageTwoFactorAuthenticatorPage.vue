<template>
  <EmCard title="Manage Two Factor Authenticator">
    <div v-if="!is2FaEnabled">
      <EmRow>
        <EmCol sm="6">
          <div class="panel">
            <p>Scan the QR Code or enter this key <kbd> {{ sharedKey }} </kbd> into your two factor authenticator app. Spaces and casing do not matter.</p>
            <div class="my-4 text-center">
              <canvas ref="qrCodeRef" />
            </div>
          </div>
        </EmCol>
        <EmCol sm="6">
          <form @submit.prevent="activateTwoFactorAuthentication">
            <EmFormGroup label="Verification Code">
              <EmInput
                v-model="form.code"
                placeholder="Code"
                autocomplete="off"
                :validator="v$.code" />
            </EmFormGroup>
            <EmFormGroup>
              <button
                type="submit"
                class="btn btn-primary mt-2">
                Activate Authenticator
              </button>
            </EmFormGroup>
          </form>
        </EmCol>
      </EmRow>
    </div>
    <div v-else>
      <EmConfirmation
        v-slot="{ context }"
        message="Are you sure you want to reset your two-factor authenticator?"
        :callback="resetAuthenticatorKey">
        <button
          type="button"
          class="btn btn-primary"
          @click="context.show">
          Reset Authenticator
        </button>
      </EmConfirmation>
    </div>
  </EmCard>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import EmCard from "@/components/base/EmCard.vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";
import {helpers, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import EmInput from "@/components/base/EmInput.vue";
import QRCode from "qrcode"
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import {handleRequestError} from "@/shared/helpers";
import {useRouter} from "vue-router";
import EmRow from "@/components/base/EmRow.vue";
import EmCol from "@/components/base/EmCol.vue";
import {notificationService} from "@/services/notification-service";

const adminLayout = useAdminLayout();
adminLayout.reload({
  navbarActions: []
})

const form = ref({
  code: ''
});

const rules = {
  code: { required: helpers.withMessage('Verification code is required', required) }
};

const v$ = useVuelidate(rules, form);
const router = useRouter();

const qrCodeRef: Ref<Element | null> = ref(null);
const sharedKey = ref('');
const is2FaEnabled = ref(false);

onMounted(() => {
  loadInitialData();
})

async function activateTwoFactorAuthentication() {
  // const isFormValid = await v$.value.$validate();
  // if (isFormValid) {
  //   try {
  //     const result = await adminService.activateTwoFactorAuthentication(form.value.code);
  //     if (result.succeeded) {
  //       form.value.code = '';
  //       v$.value.$reset();
  //       notificationService.showSuccessToast('Your two-factor authenticator has been activated');
  //       await loadInitialData();
  //     }
  //     else {
  //       notificationService.showErrorToast('Your two-factor authenticator has not been activated');
  //     }
  //   }
  //   catch (e) {
  //     handleRequestError(e, notificationService.handlers.showErrorToast);
  //   }
  // }
}

async function resetAuthenticatorKey() {
  // try {
  //   const result = await adminService.resetTwoFactorAuthenticator();
  //   if (result.succeeded) {
  //     notificationService.showSuccessToast('Your two-factor authenticator has been reset');
  //     router.go(0);
  //   }
  //   else {
  //     notificationService.showErrorToast('Your two-factor authenticator has not been reset');
  //   }
  // }
  // catch (e) {
  //   handleRequestError(e, notificationService.handlers.showErrorToast);
  // }
}

async function loadInitialData() {
  // try {
  //   const twoFactorDescription = await adminService.requestTwoFactorAuthenticationDescription();
  //   sharedKey.value = twoFactorDescription.sharedKey;
  //   is2FaEnabled.value = twoFactorDescription.is2FaEnabled;
  //   if (!twoFactorDescription.is2FaEnabled) {
  //     await QRCode.toCanvas(qrCodeRef.value, twoFactorDescription.authenticatorUri, {
  //       width: 240
  //     });
  //   }
  // }
  // catch (e) {
  //   handleRequestError(e, notificationService.handlers.showErrorToast);
  // }
}
</script>

<style scoped>

</style>
