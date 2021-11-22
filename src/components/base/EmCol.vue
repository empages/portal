<template>
  <Component
    :is="tag"
    :class="[classes, classList, 'em-col']">
    <slot />
  </Component>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, defineProps} from "vue";

const breakpointCol = {
  sm: {type: [String, Number], default: null},
  md: {type: [String, Number], default: null},
  lg: {type: [String, Number], default: null},
  xl: {type: [String, Number], default: null}
};

const breakpointOffset = {
  offsetSm: {type: [String, Number], default: null},
  offsetMd: {type: [String, Number], default: null},
  offsetLg: {type: [String, Number], default: null},
  offsetXl: {type: [String, Number], default: null}
}
const breakpointOrder = {
  orderSm: {type: [String, Number], default: null},
  orderMd: {type: [String, Number], default: null},
  orderLg: {type: [String, Number], default: null},
  orderXl: {type: [String, Number], default: null}
}

const props = defineProps({
  col: {type: Boolean, default: false},
  cols: {type: [String, Number], default: null},
  sm: {type: [String, Number], default: null},
  md: {type: [String, Number], default: null},
  lg: {type: [String, Number], default: null},
  xl: {type: [String, Number], default: null},
  offset: {type: [String, Number], default: null},
  offsetSm: {type: [String, Number], default: null},
  offsetMd: {type: [String, Number], default: null},
  offsetLg: {type: [String, Number], default: null},
  offsetXl: {type: [String, Number], default: null},
  order: {type: [String, Number], default: null},
  orderSm: {type: [String, Number], default: null},
  orderMd: {type: [String, Number], default: null},
  orderLg: {type: [String, Number], default: null},
  orderXl: {type: [String, Number], default: null},
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
