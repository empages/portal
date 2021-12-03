<template>
  <div class="card">
    <div class="card-body">
      <h1 class="title">
        {{ props.title }}
      </h1>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  title: string
}>();

</script>

<style scoped lang="scss">
  .card {
    margin: 1em 0 50px;

    .title {
      font-size: 28px;
      text-align: center;
      font-weight: bold;
    }
  }
</style>
