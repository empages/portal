<template>
  <slot
    name="trigger"
    :show="show"
    :hide="hide"
    :modalRef="modalElement" />
  <div
    ref="modalElement"
    :class="`modal fade modal-target ${modalClass}`"
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
import {withDefaults, Ref, ref, computed, onMounted} from "vue";
import {EmModalContext} from "@/shared/types/em-modal-context";

const props = withDefaults(defineProps<{
  hideHeader?: boolean,
  hideFooter?: boolean,
  size?: string,
  modalClass?: string,
  headerClass?: string,
  bodyClass?: string,
  footerClass?: string
}>(), {
  hideHeader: false,
  hideFooter: false,
  size: '',
  modalClass: '',
  headerClass: '',
  bodyClass: '',
  footerClass: ''
})

const emit = defineEmits(['modal:loaded']);

const modal: Ref<Modal | null> = ref(null);
const modalElement: Ref<Element | null> = ref(null);
const modalSizeClass = computed(() => `modal-${props.size}`)

function show() {
  modal.value?.show();
}

function hide() {
  modal.value?.hide();
}

onMounted(() => {
  if (modalElement.value) {
    document.body.appendChild(modalElement.value);
  }

  modal.value = new Modal(modalElement.value as Element, {});
  emit('modal:loaded', {
    modalRef: modalElement.value,
    show: show,
    hide: hide
  } as EmModalContext);
})

</script>

<style scoped>

</style>
