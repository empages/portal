<template>
  <div class="em-file-uploader">
    <input
      class="form-control"
      type="file"
      @change="handleFileSelect">
  </div>
</template>

<script lang="ts" setup>

const emit = defineEmits(['file:uploaded', 'file:reset']);

async function handleFileSelect(event: Event) {
  const element = event.target as HTMLInputElement;
  if (element.files && element.files.length) {
    // const response = await adminService.uploadFile(element.files[0]);
    // emit('file:uploaded', response.tempFileId);
  }
  else {
    emit('file:reset');
  }
}
</script>

<style scoped>

</style>
