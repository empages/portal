<template>
  <Component
    :is="tag"
    :class="[classes, classList, 'em-col']">
    <slot />
  </Component>
</template>

<script lang="ts">
import {defineComponent} from "vue";

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

export default defineComponent({
  name: 'EmCol',
  props: {
    col: {type: Boolean, default: false},
    cols: {type: [String, Number], default: null},
    ...breakpointCol,
    offset: {type: [String, Number], default: null},
    ...breakpointOffset,
    order: {type: [String, Number], default: null},
    ...breakpointOrder,
    alignSelf: {type: String, default: null},
    tag: {type: String, default: 'div'},
  },
  computed: {
    properties(): Array<any> {
      return [
        {content: breakpointCol, propPrefix: 'cols', classPrefix: 'col'},
        {content: breakpointOffset, propPrefix: 'offset'},
        {content: breakpointOrder, propPrefix: 'order'},
      ]
    },
    classList(): Array<string> {
      let classList: Array<string> = [];
      this.properties.forEach((property: any) => {
        classList = classList.concat(
          getClasses(this.$props, property.content, property.propPrefix, property.classPrefix)
        )
      })

      return classList;
    },
    classes(): any {
      return {
        col: this.col || !this.classList.some((e) => /^col-/.test(e) && !this.cols),
        [`col-${this.cols}`]: !!this.cols,
        [`offset-${this.offset}`]: !!this.offset,
        [`order-${this.order}`]: !!this.order,
        [`align-self-${this.alignSelf}`]: !!this.alignSelf,
      }
    }
  }
})

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
