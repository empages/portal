<template>
  <div
    :id="props.notification.id"
    ref="toastElement"
    :class="`toast align-items-center ${props.notification.toastClass}`"
    role="alert"
    aria-live="assertive"
    aria-atomic="true">
    <div class="d-flex">
      <div
        v-strong
        class="toast-body">
        {{ props.notification.message }}
      </div>
      <button
        type="button"
        :class="`btn-close me-2 m-auto ${props.notification.closeClass}`"
        data-bs-dismiss="toast"
        aria-label="Close" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Toast } from "bootstrap"
import {onMounted, ref} from "vue"
import type {Ref} from "vue";
import type { EmToastNotification } from '@/shared/types/em-toast-notification'
import {notificationService} from "@/services/notification-service";

const props = defineProps<{
  notification: EmToastNotification
}>()

const toastElement: Ref<Element | null> = ref(null);
const toast: Ref<Toast | null> = ref(null);

onMounted(() => {
  if (toastElement.value) {
    toast.value = new Toast(toastElement.value);
    toast.value.show();
    toastElement.value.addEventListener('hidden.bs.toast', () => {
      notificationService.removeToast(props.notification.id);
    })
  }
})

</script>

<style scoped>

</style>
