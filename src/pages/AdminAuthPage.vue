<template>
  <div class="auto-form-wrapper">
    <form @submit.prevent="submitForm">
      <div v-if="authenticationState === AuthenticationState.Login">
        <div
          v-if="!isSelectedApplicationConnected"
          class="form-group mb-2">
          <div class="alert alert-danger text-small px-2 py-1">
            Authentication is not allowed for applications that are not connected with the Emeraude Portal
          </div>
        </div>
        <div class="form-group mb-2">
          <label class="form-label">Email:</label>
          <EmInput
            v-model="loginForm.email"
            :validator="v$.loginForm.email"
            :disabled="!isSelectedApplicationConnected"
            placeholder="Enter email address" />
        </div>
        <div class="form-group mb-2">
          <label class="form-label">Password:</label>
          <EmInput
            v-model="loginForm.password"
            :validator="v$.loginForm.password"
            :disabled="!isSelectedApplicationConnected"
            type="password"
            placeholder="Enter password" />
        </div>
      </div>
      <div v-else-if="authenticationState === AuthenticationState.LoginWithTwoFactor">
        <div class="form-group mb-2">
          <label class="form-label">Authentication Code:</label>
          <EmInput
            v-model="loginWithTwoFactor.code"
            :validator="v$.loginWithTwoFactor.code"
            placeholder="Enter authentication code" />
        </div>
      </div>
      <div v-else-if="authenticationState === AuthenticationState.Authenticated">
        <div class="w-100 d-flex">
          <div class="mx-auto my-3">
            <EmLoadingSpinner />
          </div>
        </div>
      </div>
      <div
        v-if="authenticationState === AuthenticationState.Login || authenticationState === AuthenticationState.LoginWithTwoFactor"
        class="form-group mt-4">
        <button
          :disabled="!isSelectedApplicationConnected"
          type="submit"
          :class="{ 'btn-primary': isSelectedApplicationConnected, 'btn-light': !isSelectedApplicationConnected }"
          class="btn w-100 submit-btn">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, reactive, ref} from 'vue'
import {Application} from "@/models/application";
import {LoginRequest} from '@/models/login-request';
import adminService from '@/services/admin-service';
import {handleRequestError} from '@/shared/helpers';
import useVuelidate from '@vuelidate/core'
import {email, helpers, required, requiredIf} from '@vuelidate/validators'
import EmInput from "@/components/base/EmInput.vue";
import {AuthenticationState} from '@/shared/enums';
import {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {AdminAuthResponse} from '@/models/admin-auth-response';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import EmLoadingSpinner from "@/components/base/EmLoadingSpinner.vue";
import {notificationProvider} from "@/services/notification-provider";

const store = useStore();
const router = useRouter();
const authenticationState = ref(AuthenticationState.Login);
const postAuthenticationToken = ref('');

const rules = computed(() => {
  return {
    loginForm: {
      email: { required: helpers.withMessage('Email is required', required), email },
      password: { required: helpers.withMessage('Password is required', requiredIf(authenticationState.value === AuthenticationState.Login)) },
    },
    loginWithTwoFactor: {
      code: { required: helpers.withMessage('Code is required', requiredIf(authenticationState.value === AuthenticationState.LoginWithTwoFactor)) }
    }
  }
})

const loginForm: LoginRequest = reactive({
  email: '',
  password: ''
})

const loginWithTwoFactor: LoginWithTwoFactorAuthenticationRequest = reactive({
  email: '',
  code: ''
})

const v$ = useVuelidate(rules, { loginForm, loginWithTwoFactor })

const application: ComputedRef<Application> = computed(() => {
  return store.getters['settingsModule/selectedApplication'];
})

const isSelectedApplicationConnected: ComputedRef<boolean> = computed(() => {
  return store.getters['settingsModule/isSelectedApplicationConnected'];
})

async function submitForm() {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return;
  }

  try {
    let authResponse: AdminAuthResponse | null = null;
    if (authenticationState.value === AuthenticationState.Login) {
      authResponse = await adminService.login(loginForm);
    }
    else if (authenticationState.value === AuthenticationState.LoginWithTwoFactor) {
      loginWithTwoFactor.email = loginForm.email;
      authResponse = await adminService.loginWithTwoFactor(loginWithTwoFactor, postAuthenticationToken.value);
    }

    if (authResponse && authResponse.succeeded) {
      if (authResponse.requiresAdditionalAuthenticationFactor && authResponse.postAuthenticationToken) {
        notificationProvider.showWarningToast(authResponse.message);
        authenticationState.value = AuthenticationState.LoginWithTwoFactor;
        postAuthenticationToken.value = authResponse.postAuthenticationToken;
        loginForm.password = '';
        v$.value.$reset();
        return;
      }

      loginForm.email = '';
      loginWithTwoFactor.email = '';
      loginWithTwoFactor.code = '';
      postAuthenticationToken.value = '';
      authenticationState.value = AuthenticationState.Authenticated;
      v$.value.$reset();

      store.commit('identityModule/storeIdentity', {
        accessToken: authResponse.accessToken,
        applicationId: application.value.id
      });

      router.go(0);
    }
  }
  catch(e: any) {
    handleRequestError(e, notificationProvider.handlers.showErrorToast);
  }
}

</script>

<style scoped>

</style>
