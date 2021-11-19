<template>
  <div class="html-raw-editor">
    <div ref="editorElement" />
  </div>
</template>

<script lang="ts" setup>
import {EditorState, basicSetup} from "@codemirror/basic-setup"
import {EditorView, keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import {html} from "@codemirror/lang-html"
import {defineProps, withDefaults, defineEmits, Ref, ref, onMounted} from "vue";

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue'])

const editorElement: Ref<Element | null> = ref(null)
const editorView: Ref<EditorView | null> = ref(null);
const value: Ref<string> = ref(props.modelValue);

function updateContent(content: string) {
  emit('update:modelValue', content);
}

function init() {
  const initialState = EditorState.create({
    doc: value.value,
    extensions: [
      basicSetup,
      keymap.of([indentWithTab]),
      html(),
      EditorView.updateListener.of((viewUpdate) => {
        if (viewUpdate.docChanged) {
          updateContent(viewUpdate.state.doc.toString());
        }
      }),
    ]
  });

  if (editorElement.value) {
    editorView.value = new EditorView({
      state: initialState,
      parent: editorElement.value,
    })
  }
}

onMounted(init)

</script>

<style scoped>
</style>
