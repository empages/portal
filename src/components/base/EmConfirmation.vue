<template>
  <div class="confirmation-modal">
    <EmModal
      size="sm"
      modal-class="confirmation-modal"
      @modal:loaded="modalLoaded">
      <template #trigger="context">
        <slot :context="context" />
      </template>
      <template #header>
        <h5>
          We need your confirmation?
        </h5>
      </template>
      <template #body>
        <div class="confirmation-body">
          <p class="m-0 message">
            {{ props.message }}
          </p>
          <div class="mt-2 disable-select">
            <label
              v-if="props.confirmationWord"
              class="d-block w-100">
              <span class="mb-2 confirmation-word-message">
                Type '{{ props.confirmationWord }}' to confirm!
              </span>
              <input
                v-model="userConfirmationWord"
                class="form-control"
                placeholder="Type it here">
            </label>
          </div>
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          :disabled="!confirmationAllowed"
          class="btn btn-danger me-1"
          @click="clickYes">
          {{ props.yesText }}
        </button>
        <button
          type="button"
          class="btn btn-neutral"
          @click="clickNo">
          {{ props.noText }}
        </button>
      </template>
    </EmModal>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, withDefaults} from "vue";
import type {Ref} from "vue";
import EmModal from "@/components/base/EmModal.vue";
import type {ModalContext} from "@/shared/types/modal-context";

const props = withDefaults(defineProps<{
  callback: () => void,
  message: string,
  confirmationWord?: string,
  yesText?: string,
  noText?: string
}>(), {
  confirmationWord: '',
  yesText: 'Yes',
  noText: 'No'
});

const modalContext: Ref<ModalContext | null> = ref(null);
const userConfirmationWord: Ref<string> = ref('');

const confirmationAllowed = computed(() => {
  if (!props.confirmationWord) {
    return true;
  }

  return props.confirmationWord === userConfirmationWord.value;
})

function clickYes() {
  props.callback();
  modalContext.value?.hide();
  userConfirmationWord.value = '';
}

function clickNo() {
  modalContext.value?.hide();
  userConfirmationWord.value = '';
}

function modalLoaded(context: ModalContext): void {
  modalContext.value = context;
  userConfirmationWord.value = '';
}

</script>

<style scoped lang="scss">
  .confirmation-body {
    text-align: left !important;
  }

  .message {
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }

  .confirmation-word-message {
    font-weight: bold;
    font-size: 12px;
    display: block;
  }
</style>
