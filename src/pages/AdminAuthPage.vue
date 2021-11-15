<template>
  <EmAdminAuthLayout>
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
        <p>Authenticated.</p>
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
  </EmAdminAuthLayout>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import EmAdminAuthLayout from "@/components/layouts/EmAdminAuthLayout.vue";
import {Application} from "@/models/application";
import accessService from "@/services/access-service";
import {LoginRequest} from '@/models/login-request';
import adminService from '@/services/admin-service';
import {AxiosError} from "axios";
import {handleRequestError} from '@/utils/helpers';
import useVuelidate from '@vuelidate/core'
import {email, helpers, required, requiredIf} from '@vuelidate/validators'
import EmInput from "@/components/base/EmInput.vue";
import {AuthenticationState} from '@/shared/enums';
import {LoginWithTwoFactorAuthenticationRequest} from "@/models/login-with-two-factor-authentication-request";
import {AdminAuthResponse} from '@/models/admin-auth-response';
import { useNotifications } from '@/composables/notifications-composable';

export default defineComponent({
name: "AdminAuthPage",
  components: {EmInput, EmAdminAuthLayout},
  setup() {
    const { showWarningToast, showErrorToast } = useNotifications();
    return {
      showWarningToast,
      showErrorToast,
      v$: useVuelidate() as any
    }
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      } as LoginRequest,
      loginWithTwoFactor: {
        email: '',
        code: ''
      } as LoginWithTwoFactorAuthenticationRequest,
      authenticationState: AuthenticationState.Login as AuthenticationState,
      AuthenticationState,
      postAuthenticationToken: ''
    }
  },
  validations (): any {
    return {
      loginForm: {
        email: { required: helpers.withMessage('Email is required', required), email },
        password: { required: helpers.withMessage('Password is required', requiredIf(this.authenticationState === AuthenticationState.Login)) },
      },
      loginWithTwoFactor: {
        code: { required: helpers.withMessage('Code is required', requiredIf(this.authenticationState === AuthenticationState.LoginWithTwoFactor)) }
      }
    }
  },
  computed: {
    applications(): Array<Application> {
      return this.$store.getters['settingsModule/applications'];
    },
    application(): Application {
      return this.$store.getters['settingsModule/selectedApplication'];
    },
    isSelectedApplicationConnected(): boolean {
      return this.$store.getters['settingsModule/isSelectedApplicationConnected'];
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        return;
      }

      try {
        let authResponse: AdminAuthResponse | null = null;
        if (this.authenticationState === AuthenticationState.Login) {
          authResponse = await adminService.login(this.loginForm);
        }
        else if (this.authenticationState === AuthenticationState.LoginWithTwoFactor) {
          this.loginWithTwoFactor.email = this.loginForm.email;
          authResponse = await adminService.loginWithTwoFactor(this.loginWithTwoFactor, this.postAuthenticationToken);
        }

        if (authResponse && authResponse.succeeded) {
          if (authResponse.requiresAdditionalAuthenticationFactor && authResponse.postAuthenticationToken) {
            this.showWarningToast(authResponse.message);
            this.authenticationState = AuthenticationState.LoginWithTwoFactor;
            this.postAuthenticationToken = authResponse.postAuthenticationToken;
            this.loginForm.password = '';
            this.v$.$reset();
            return;
          }

          this.loginForm.email = '';
          this.loginWithTwoFactor.email = '';
          this.loginWithTwoFactor.code = '';
          this.postAuthenticationToken = '';
          this.authenticationState = AuthenticationState.Authenticated;
          this.v$.$reset();

          this.$store.commit('identityModule/storeIdentity', {
            accessToken: authResponse.accessToken,
            applicationId: this.application.id
          });
          this.$router.go(0);
        }
      }
      catch(e: any) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async verifyApplicationAccess(applicationId: string): Promise<boolean> {
      const application = this.applications.find(x => x.id === applicationId);
      if (!application) {
        return false;
      }

      try {
        const gatewayResponse = await accessService.verifyPortalAccess(application);
        return gatewayResponse.verified;
      }
      catch (e) {
        console.log("Portal access has not been verified");
      }

      return false;
    }
  }
})
</script>

<style scoped>

</style>
