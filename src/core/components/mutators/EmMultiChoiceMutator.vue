<template>
  <div class="em-multichoise-mutator">
    <div v-if="pageResponse">
      <div v-if="props.args.multiChoiceType === MultiChoiceType.Select">
        <div class="form-floating form-group">
          <select class="form-select">
            <option
              v-for="(item, itemIndex) in targetTypeDescription.items"
              :key="`mutator-${mutatorId}-option-${itemIndex}`"
              :value="item.value">
              {{ item.name }}
            </option>
          </select>
          <label
            v-if="props.label"
            class="form-label">
            {{ props.label }}
          </label>
        </div>
      </div>
      <div v-if="props.args.multiChoiceType === MultiChoiceType.CheckboxGroup">
        <div class="form-group">
          <div class="card">
            <div class="card-body pt-2 pb-3">
              <label
                v-if="props.label"
                class="form-label">
                {{ props.label }}
              </label>
              <div class="form-content">
                <div
                  v-for="(item, itemIndex) in targetTypeDescription.items"
                  :key="`mutator-${mutatorId}-checkbox-${itemIndex}`"
                  class="form-check">
                  <input
                    :id="`mutator-${mutatorId}-checkbox-${itemIndex}`"
                    v-model="values"
                    :value="item.value"
                    class="form-check-input"
                    :name="`mutator-${mutatorId}`"
                    type="checkbox">
                  <label
                    class="form-check-label"
                    :for="`mutator-${mutatorId}-checkbox-${itemIndex}`">
                    {{ item.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="props.args.multiChoiceType === MultiChoiceType.RadioGroup">
        <div class="form-group">
          <div class="card">
            <div class="card-body pt-2 pb-3">
              <label
                v-if="props.label"
                class="form-label">
                {{ props.label }}
              </label>
              <div class="form-content">
                <div
                  v-for="(item, itemIndex) in targetTypeDescription.items"
                  :key="`mutator-${mutatorId}-radio-${itemIndex}`"
                  class="form-check">
                  <input
                    :id="`mutator-${mutatorId}-radio-${itemIndex}`"
                    v-model="values"
                    :value="item.value"
                    class="form-check-input"
                    :name="`mutator-${mutatorId}`"
                    type="radio">
                  <label
                    class="form-check-label"
                    :for="`mutator-${mutatorId}-radio-${itemIndex}`">
                    {{ item.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, type Ref} from "vue";
import {MultiChoiceType} from "@/core/types";
import {randomString} from "@/shared/helpers";
import {useEmPageResponse} from "@/core/composables";

const props = defineProps<{
  modelValue: any,
  label: string,
  args: any
}>();

const value: Ref<any> = ref(props.modelValue);
const values: Ref<any[]> = ref([]);
if (props.args.multiChoiceType === MultiChoiceType.CheckboxGroup) {
  values.value = [...values.value, ...(props.modelValue || [])];
}

const mutatorId = randomString(16);

const pageResponse = useEmPageResponse();

const typeDescriptions = computed(() => {
  return pageResponse?.value?.typeDescriptions;
})

const targetTypeDescription = computed(() => {
  return typeDescriptions.value?.find(x => x.typeId === props.args.customTypeId);
})

</script>

<style scoped lang="scss">
@import '../../../assets/styles/core/mixins/general';
.form-group {
  .card {
    border: 1px solid #dedede;
    @include box-shadow-full(none);

    .card-body {
      position: relative;

      .form-content {
        padding-top: 1.5rem;
      }

      .form-label {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        padding: 1rem 1.25rem;
        pointer-events: none;
        border: 1px solid transparent;
        transform-origin: 0 0;
        transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
        opacity: 0.65;
        transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
      }
    }
  }
}
</style>
