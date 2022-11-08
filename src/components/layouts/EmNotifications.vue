<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <EmToast
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification" />
  </div>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, ref} from "vue";
import EmToast from "@/components/base/EmToast.vue";
import {notificationService} from "@/services/notification-service";

const counter = ref(0);

function trigger() {
  counter.value++;
}

const notifications = computed(() => {
  if (counter.value > 0) {
      // trigger reactivity
  }

  return notificationService.getNotifications();
})

onBeforeMount(() => {
  notificationService.setTrigger(trigger);
})

</script>

<style scoped>

</style>
