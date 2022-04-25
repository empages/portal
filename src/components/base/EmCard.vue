<template>
  <div class="card">
    <div
      v-if="props.title"
      :class="`card-header ${props.headerClasses}`">
      <h4 :class="`card-title ${props.titleClasses}`">
        <slot
          name="title"
          :cardTitle="title">
          {{ title }}
        </slot>
      </h4>
    </div>
    <div class="card-body py-0">
      <slot />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {withDefaults} from 'vue'

const props = withDefaults(defineProps<{
  title: string,
  headerClasses?: string,
  titleClasses?: string
}>(),{
  headerClasses: '',
  titleClasses: ''
})

</script>

<style scoped>

</style>
