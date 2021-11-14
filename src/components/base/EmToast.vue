<template>
  <div
    :id="notification.id"
    ref="toast"
    :class="`toast align-items-center ${notification.toastClass}`"
    role="alert"
    aria-live="assertive"
    aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">
        {{ notification.message }}
      </div>
      <button
        type="button"
        :class="`btn-close me-2 m-auto ${notification.closeClass}`"
        data-bs-dismiss="toast"
        aria-label="Close" />
    </div>
  </div>
</template>

<script lang="ts">
import { ToastNotification } from "@/models/notification";
import { Toast } from "bootstrap"
import {defineComponent} from "vue"

export default defineComponent({
  name: "EmToast",
  props: {
    notification: {
      type: Object as () => ToastNotification,
      required: true
    }
  },
  data() {
    return {
      toast: null as Toast | null,
    }
  },
  computed: {

  },
  mounted() {
    const toastElement = this.$refs.toast as Element;
    this.toast = new Toast(toastElement);
    this.toast.show();
    toastElement.addEventListener('hidden.bs.toast', () => {
      this.$store.commit('notificationModule/clearNotification', this.notification.id);
    })
  }
})
</script>

<style scoped>

</style>
