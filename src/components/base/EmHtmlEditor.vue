<template>
  <div class="em-html-editor">
    <Editor
      v-model="editorValue"
      :api-key="tinyMceApiKey" />
  </div>
</template>

<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue"
import {tinyMceApiKey} from '@/shared/config'
import {ref, watch, withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue']);

const editorValue = ref(props.modelValue);

watch(() => editorValue, (value) => {
  emit('update:modelValue', value)
})

</script>

<style scoped lang="scss">
  .em-html-editor :deep .tox-tinymce {
    border-radius: 4px;
  }
</style>
