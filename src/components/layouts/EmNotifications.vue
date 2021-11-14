<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <EmToast
      v-for="(notification, notificationIndex) in notifications"
      :key="`toast-${notificationIndex}`"
      :notification="notification" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EmToast from "@/components/base/EmToast.vue";
export default defineComponent({
  name: "EmNotifications",
  components: {EmToast},
  computed: {
    notifications() {
      return this.$store.getters['notificationModule/notifications'];
    }
  }
})
</script>

<style scoped>

</style>
