<template>
  <div class="spinner-container">
    <div class="spinner-blocks">
      <img :src="spinner" alt="Loading.." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import spinner from '@/assets/images/spinner.svg';
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";

.spinner-container {
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;

  .spinner-blocks {
    width: 80px;
    height: 80px;
    display: inline-block;
    margin: auto;
    overflow: hidden;
    background: none;

    img {
      height: 56px;
    }
  }
}

</style>
