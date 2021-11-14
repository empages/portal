<template>
  <div class="html-raw-editor">
    <div ref="editor" />
  </div>
</template>

<script lang="ts">
import {EditorState, basicSetup} from "@codemirror/basic-setup"
import {EditorView, keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import {html} from "@codemirror/lang-html"
import {defineComponent} from "vue";

export default defineComponent({
  name: "EmHtmlRawEditor",
  props: {
    modelValue: {
      type: String,
      default() {
        return '';
      }
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      editorView: null as EditorView | null,
      value: (this.modelValue?.toString() || '') as string,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    updateContent(content: string) {
      this.$emit('update:modelValue', content);
    },
    init() {
      const initialState = EditorState.create({
        doc: this.value,
        extensions: [
          basicSetup,
          keymap.of([indentWithTab]),
          html(),
          EditorView.updateListener.of((viewUpdate) => {
            if (viewUpdate.docChanged) {
              this.updateContent(viewUpdate.state.doc.toString());
            }
          }),
        ]
      });

      this.editorView = new EditorView({
        state: initialState,
        parent: this.$refs.editor as Element,
      })
    },
  },
})
</script>

<style scoped>
</style>
