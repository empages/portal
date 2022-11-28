<template>
  <div class="auth-container">
    <span v-if="!isSelectedApplicationConnected">
      <span class="alert alert-danger text-small px-2 py-1 mb-4 d-block">
        Authentication is not allowed for applications that are not connected with the Portal
      </span>
    </span>
    <div class="card mx-auto">
      <div class="card-body">
        <div>
          <div class="logo-container">
            <div class="logo">
              <img
                :src="logo"
                :class="{ 'grayscale': !isSelectedApplicationConnected }"
                alt="Emerald Pages">
            </div>
          </div>
          <h2 class="title">
            Emerald Pages Portal Login
          </h2>
          <div class="subtitle">
            <span
              v-if="application"
              class="my-2 d-block">
              Identify and authenticate yourself to the<br>
              <span
                :class="{ 'bg-primary': isSelectedApplicationConnected, 'bg-dark': !isSelectedApplicationConnected }"
                class="app-badge no-select d-inline-block my-2">{{ application.name }}</span>
            </span>
          </div>
        </div>
        <form @submit.prevent="submitForm">
          <div v-if="authenticationState === AuthenticationState.Login">
            <EmFormGroup label="Email address">
              <EmInput
                v-model="loginForm.email"
                :validator="v$.loginForm.email"
                :disabled="!isSelectedApplicationConnected"
                placeholder="Email address" />
            </EmFormGroup>
            <EmFormGroup label="Password">
              <EmInput
                v-model="loginForm.password"
                :validator="v$.loginForm.password"
                :disabled="!isSelectedApplicationConnected"
                type="password"
                placeholder="Password" />
            </EmFormGroup>
          </div>
          <div v-else-if="authenticationState === AuthenticationState.LoginWithTwoFactor">
            <EmFormGroup label="Authentication code">
              <EmInput
                v-model="loginWithTwoFactor.code"
                :validator="v$.loginWithTwoFactor.code"
                placeholder="Authentication code" />
            </EmFormGroup>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive, ref} from 'vue'
import type {ComputedRef} from 'vue'
import type {Application} from "@/models/application";
import type {LoginRequest} from '@/models/login-request';
import {handleRequestError} from '@/shared/helpers';
import useVuelidate from '@vuelidate/core'
import {email, helpers, required, requiredIf} from '@vuelidate/validators'
import EmInput from "@/components/base/EmInput.vue";
import {AuthenticationState} from '@/shared/enums';
import type {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import EmLoadingSpinner from "@/components/base/EmLoadingSpinner.vue";
import {notificationService} from "@/services/notification-service";
import logo from "@/assets/images/logo.svg";
import EmFormGroup from "@/components/base/EmFormGroup.vue";
import type {AuthResult} from "@/models/auth-result";
import authenticationService from "@/services/authentication-service";

const store = useStore();
const router = useRouter();
const authenticationState = ref(AuthenticationState.Login);

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
  code: '',
  postAuthenticationToken: ''
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
    let authResult: AuthResult | null = null;
    if (authenticationState.value === AuthenticationState.Login) {
      authResult = await authenticationService.login(loginForm.email, loginForm.password);
    }
    // else if (authenticationState.value === AuthenticationState.LoginWithTwoFactor) {
    //   loginWithTwoFactor.email = loginForm.email;
    //   authResponse = await adminService.loginWithTwoFactor(loginWithTwoFactor, postAuthenticationToken.value);
    // }

    if (authResult && !authResult.succeeded) {
      notificationService.showErrorToast(authResult.message);
      return;
    }

    if (authResult && authResult.succeeded) {
      if (authResult.postAuthenticationToken) {
        notificationService.showWarningToast(authResult.message);
        authenticationState.value = AuthenticationState.LoginWithTwoFactor;
        loginWithTwoFactor.postAuthenticationToken = authResult.postAuthenticationToken;
        loginForm.password = '';
        v$.value.$reset();
        return;
      }

      loginForm.email = '';
      loginWithTwoFactor.email = '';
      loginWithTwoFactor.code = '';
      loginWithTwoFactor.postAuthenticationToken = '';
      authenticationState.value = AuthenticationState.Authenticated;
      v$.value.$reset();

      store.commit('identityModule/storeIdentity', {
        accessToken: authResult.accessToken,
        applicationId: application.value.id
      });

      router.go(0);
    }
  }
  catch(e: any) {
    handleRequestError(e, notificationService.handlers.showErrorToast);
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/styles/core";

.grayscale {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
}

.auth-container {
  max-width: 420px;
  margin: auto;

  .logo-container {
    display: flex;

    .logo {
      display: flex;
      width: 100px;
      height: 100px;
      padding: 1.35em;
      margin-top: -1.35em;
      margin-right: auto;
      margin-left: auto;

      img {
        width: 100%;
      }
    }
  }

  .title {
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .subtitle {
    text-align: center;
    line-height: 1.6rem;

    .app-badge {
      padding: .2rem .6rem;
      color: $white;
      border-radius: 4px;
      font-weight: bold;
    }
  }

  button {
    width: 100%;
  }
}

</style>
