<template>
  <slot
    name="trigger"
    :show="show"
    :hide="hide"
    :assigner="assignContext"
    :modalRef="modalElement" />
  <div
    ref="modalElement"
    :class="`modal fade modal-target ${modalClass}`"
    :data-bs-backdrop="props.static ? 'static' : true"
    :data-bs-keyboard="keyboard"
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

<script lang="ts" setup>
import { Modal } from 'bootstrap'
import {withDefaults, ref, computed, onMounted} from "vue";
import type {Ref} from "vue";
import type {ModalContext} from "@/shared/types/modal-context";

const props = withDefaults(defineProps<{
  hideHeader?: boolean,
  hideFooter?: boolean,
  size?: string,
  modalClass?: string,
  headerClass?: string,
  bodyClass?: string,
  footerClass?: string,
  static?: boolean,
  keyboard?: boolean
}>(), {
  hideHeader: false,
  hideFooter: false,
  size: '',
  modalClass: '',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  static: false,
  keyboard: true
})

const emit = defineEmits(['modal:loaded', 'modal:opened', 'modal:closed']);

const modal: Ref<Modal | null> = ref(null);
const modalElement: Ref<Element | null> = ref(null);
const modalSizeClass = computed(() => `modal-${props.size}`)

function show() {
  modal.value?.show();
}

function hide() {
  modal.value?.hide();
}

const assignContext = (assigner: (context: ModalContext) => void) => {
  assigner({
    show,
    hide,
    modalRef: modalElement.value
  });
}

onMounted(() => {
  if (modalElement.value) {
    document.body.appendChild(modalElement.value);
  }
  modalElement.value?.addEventListener('shown.bs.modal', () => {
    emit('modal:opened');
  });
  modalElement.value?.addEventListener('hidden.bs.modal', () => {
    emit('modal:closed');
  });
  modal.value = new Modal(modalElement.value as Element, {});
  emit('modal:loaded', {
    modalRef: modalElement.value,
    show: show,
    hide: hide
  } as ModalContext);
})

</script>

<style scoped>

</style>
