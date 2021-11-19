<template>
  <Component
    :is="tag"
    :class="[classes, classList, 'em-col']">
    <slot />
  </Component>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, defineProps} from "vue";
import {breakpointCol, breakpointOffset, breakpointOrder} from "@/utils/breakpoints";

const props = defineProps({
  col: {type: Boolean, default: false},
  cols: {type: [String, Number], default: null},
  ...breakpointCol,
  offset: {type: [String, Number], default: null},
  ...breakpointOffset,
  order: {type: [String, Number], default: null},
  ...breakpointOrder,
  alignSelf: {type: String, default: null},
  tag: {type: String, default: 'div'},
});

const properties: ComputedRef<Array<any>> = computed(() => {
  return [
    {content: breakpointCol, propPrefix: 'cols', classPrefix: 'col'},
    {content: breakpointOffset, propPrefix: 'offset'},
    {content: breakpointOrder, propPrefix: 'order'},
  ]
})

const classList: ComputedRef<Array<string>> = computed(() => {
  let classList: Array<string> = [];
  properties.value.forEach((property: any) => {
    classList = classList.concat(
        getClasses(props, property.content, property.propPrefix, property.classPrefix)
    )
  })

  return classList;
})

const classes = computed(() => {
  return {
    col: props.col || !classList.value.some((e) => /^col-/.test(e) && !props.cols),
    [`col-${props.cols}`]: !!props.cols,
    [`offset-${props.offset}`]: !!props.offset,
    [`order-${props.order}`]: !!props.order,
    [`align-self-${props.alignSelf}`]: !!props.alignSelf,
  }
});

function getClasses(properties: any, elements: Array<string>, propertyPrefix: string, classPrefix: string = propertyPrefix): any {
  return Object.keys(elements).reduce((array: Array<string>, property: string) => {
    if (!properties[property]) {
      return array;
    }

    array.push(
      [classPrefix, property.replace(propertyPrefix, ''), properties[property]]
        .filter((e) => e)
        .join('-')
        .toLowerCase()
    )
    return array
  }, [])
}
</script>
