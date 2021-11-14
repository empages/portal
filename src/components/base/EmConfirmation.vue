<template>
  <div class="confirmation-modal">
    <EmModal
      size="sm"
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
            {{ message }}
          </p>
          <div class="mt-2 disable-select">
            <label
              v-if="confirmationWord"
              class="d-block w-100">
              <span class="mb-2 confirmation-word-message">
                Type '{{ confirmationWord }}' to confirm!
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
          {{ yesText }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="clickNo">
          {{ noText }}
        </button>
      </template>
    </EmModal>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EmModal, {ModalContext} from "@/components/base/EmModal.vue";

export default defineComponent({
  name: "EmConfirmation",
  components: {EmModal},
  props: {
    callback: {
      type: Function,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    confirmationWord: {
      type: String,
      default: ''
    },
    yesText: {
      type: String,
      default: 'Yes'
    },
    noText: {
      type: String,
      default: 'No'
    }
  },
  data() {
    return {
      modalContext: null as ModalContext | null,
      userConfirmationWord: ''
    }
  },
  computed: {
    confirmationAllowed() {
      if (!this.confirmationWord) {
        return true;
      }

      return this.confirmationWord === this.userConfirmationWord;
    }
  },
  methods: {
    confirm() {
      this.callback();
    },
    clickYes() {
      this.callback();
      this.modalContext?.hide();
      this.userConfirmationWord = '';
    },
    clickNo() {
      this.modalContext?.hide();
      this.userConfirmationWord = '';
    },
    modalLoaded(modalContext: ModalContext): void {
      this.modalContext = modalContext;
      this.userConfirmationWord = '';
    }
  }
})
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

  :deep {
    .modal-header {
      padding-top: 10px;
      padding-bottom: 10px;

      h5 {
        margin: 0;
        font-size: 18px;
      }
    }

    .modal-footer {
      padding-top: 0;
      border-top: none;
    }
  }
</style>
