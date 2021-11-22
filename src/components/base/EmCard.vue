<template>
  <div class="card">
    <div
      v-if="props.title"
      :class="`card-header ${props.headerClasses}`">
      <h3 :class="`card-title ${props.titleClasses}`">
        {{ title }}
      </h3>
    </div>
    <div class="card-body">
      <slot />
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
