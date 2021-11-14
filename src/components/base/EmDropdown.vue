<template>
  <div class="dropdown">
    <button
      ref="el"
      :class="`em-dropdown btn btn-primary ${toggleIcon ? 'dropdown-toggle' : ''} ${buttonClasses}`"
      type="button"
      :title="title"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      aria-expanded="false">
      <slot name="title">
        {{ title }}
      </slot>
    </button>
    <ul :class="`dropdown-menu ${menuClasses}`">
      <slot
        name="menu"
        :context="context" />
    </ul>
  </div>
</template>

<script lang="ts">
import { newGuid } from '@/utils/helpers';
import { Dropdown } from 'bootstrap';
import {defineComponent} from "vue";

export interface EmDropdownContext {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  update: () => void;
}

export default defineComponent({
  name: "EmDropdown",
  props: {
    title: {
      type: String,
      required: true
    },
    buttonClasses: {
      type: String,
      default: () => ''
    },
    menuClasses: {
      type: String,
      default: () => ''
    },
    autoClose: {
      type: [Boolean, String],
      default: () => true
    },
    toggleIcon: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      dropdown: null as Dropdown | null,
      id: newGuid()
    }
  },
  computed: {
    context(): EmDropdownContext | null {
      if (!this.dropdown) {
        return null
      }

      return {
        show: this.dropdown.show.bind(this.dropdown),
        hide: this.dropdown.hide.bind(this.dropdown),
        toggle: this.dropdown.toggle.bind(this.dropdown),
        update: this.dropdown.update.bind(this.dropdown)
      }
    }
  },
  mounted() {
    const targetElement: HTMLButtonElement = this.$refs.el as HTMLButtonElement;
    this.dropdown = new Dropdown(targetElement, {
      autoClose: this.autoClose as (boolean | 'inside' | 'outside')
    });

    ['show', 'shown', 'hide', 'hidden'].forEach((e) => {
      targetElement.addEventListener(`${e}.bs.dropdown`, () => {
        this.$emit(e);
      });
    });
  }
})
</script>

<style scoped>

</style>
