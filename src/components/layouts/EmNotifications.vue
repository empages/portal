<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <EmToast
      v-for="(notification, notificationIndex) in notifications"
      :key="`toast-${notificationIndex}`"
      :notification="notification" />
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import EmToast from "@/components/base/EmToast.vue";
import {useStore} from "vuex";

const store = useStore();
const notifications = computed(() => {
  return store.getters['notificationModule/notifications'];
})

</script>

<style scoped>

</style>
