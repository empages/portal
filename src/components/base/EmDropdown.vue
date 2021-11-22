<template>
  <div class="dropdown">
    <button
      ref="dropdownElement"
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

<script lang="ts" setup>
import { Dropdown } from 'bootstrap';
import {withDefaults, Ref, ComputedRef, computed, onMounted, ref} from "vue";

const dropdownVisibilities = ['show', 'shown', 'hide', 'hidden'];

interface EmDropdownContext {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  update: () => void;
}

const props = withDefaults(defineProps<{
  title: string,
  buttonClasses?: string,
  menuClasses?: string,
  autoClose?: boolean | string,
  toggleIcon?: boolean
}>(), {
  buttonClasses: '',
  menuClasses: '',
  autoClose: true,
  toggleIcon: true
})

const emit = defineEmits(['show', 'shown', 'hide', 'hidden']);
const dropdown: Ref<Dropdown | null> = ref(null);
const dropdownElement: Ref<HTMLButtonElement | null> = ref(null);
const context: ComputedRef<EmDropdownContext | null> = computed(() => {
  if (!dropdown.value) {
    return null
  }

  return {
    show: dropdown.value.show.bind(dropdown.value),
    hide: dropdown.value.hide.bind(dropdown.value),
    toggle: dropdown.value.toggle.bind(dropdown.value),
    update: dropdown.value.update.bind(dropdown.value)
  }
})

onMounted(() => {
  if (dropdownElement.value) {
    dropdown.value = new Dropdown(dropdownElement.value, {
      autoClose: props.autoClose as (boolean | 'inside' | 'outside')
    });

    dropdownVisibilities.forEach((e: any) => {
      dropdownElement.value?.addEventListener(`${e}.bs.dropdown`, () => {
        emit(e);
      });
    });
  }
})
</script>

<style scoped>

</style>
