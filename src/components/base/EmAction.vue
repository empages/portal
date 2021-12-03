<template>
  <div class="action-container">
    <div v-if="props.action.actionHttpMethod.method === HttpMethods.GET">
      <RouterLink
        class="btn btn-primary px-2 py-1"
        :title="props.action.title"
        :to="props.action.actionUrl">
        {{ action.title }}
      </RouterLink>
    </div>
    <div v-else>
      <div v-if="!props.action.hasConfirmation">
        <button
          class="btn btn-primary px-2 py-1"
          type="button"
          @click="executeAction">
          {{ action.title }}
        </button>
      </div>
      <div v-else>
        <EmConfirmation
          v-slot="{ context }"
          :callback="executeAction"
          :message="props.action.confirmationMessage"
          :confirmation-word="action.title.toLowerCase().replaceAll(' ', '-')"
          class="w-100">
          <button
            class="btn btn-primary px-2 py-1"
            type="button"
            @click="context.show">
            {{ action.title }}
          </button>
        </EmConfirmation>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
import {ActionModel} from "@/models/action-model";
import EmConfirmation from "@/components/base/EmConfirmation.vue";
import adminService from "@/services/admin-service";
import {useNotifications} from "@/composables/notifications-composable";
import {useRouter} from "vue-router";
import {HttpMethods} from "@/models/http-method";

const props = defineProps<{
  action: ActionModel
}>();

const notifications = useNotifications();
const router = useRouter();

async function executeAction() {
  try {
    const result = await adminService.executeAction(props.action.actionHttpMethod, props.action.actionUrl);
    notifications.showExecutionToast(result.succeeded, result.message);
    if (result.succeeded) {
      router.go(0);
    }
  }
  catch (e) {
    notifications.showErrorToast("An unexpected error occurred during action execution");
  }
}
</script>

<style scoped>

</style>
