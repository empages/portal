<template>
  <slot
    name="trigger"
    :show="show"
    :hide="hide"
    :modalRef="$refs.modalTarget" />
  <div
    ref="modalTarget"
    class="modal fade modal-target"
    tabindex="-1"
    aria-hidden="true">
    <div
      class="modal-dialog"
      :class="modalSizeClass">
      <div class="modal-content">
        <div
          v-if="!hideHeader"
          class="modal-header"
          :class="headerClass">
          <slot name="header" />
        </div>
        <div
          class="modal-body"
          :class="bodyClass">
          <slot name="body" />
        </div>
        <div
          v-if="!hideFooter"
          class="modal-footer"
          :class="footerClass">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap'
import {defineComponent} from "vue";

export interface ModalContext {
  modalRef: Element;
  show: () => void;
  hide: () => void;
}

export default defineComponent({
  name: "EmModal",
  props: {
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    headerClass: {
      type: String,
      default: ''
    },
    bodyClass: {
      type: String,
      default: ''
    },
    footerClass: {
      type: String,
      default: ''
    }
  },
  emits: ['modal:loaded'],
  data() {
    return {
      modal: null as Modal | null
    }
  },
  computed: {
    modalSizeClass() {
      return `modal-${this.size}`;
    }
  },
  mounted() {
    const modalElement = this.$refs.modalTarget as Element;
    this.modal = new Modal(modalElement, {});
    this.$emit('modal:loaded', {
      modalRef: modalElement,
      show: this.show,
      hide: this.hide
    } as ModalContext);
  },
  methods: {
    show() {
      this.modal?.show();
    },
    hide() {
      this.modal?.hide();
    }
  }
})
</script>

<style scoped>

</style>
