<template>
  <div class="spinner-container">
    <div class="spinner-blocks">
      <div class="spinner-content">
        <div class="top-left" />
        <div class="top-center" />
        <div class="top-right" />
        <div class="middle-left" />
        <div class="middle-center">
          <i class="mdi mdi-spin mdi-cog" />
        </div>
        <div class="middle-right" />
        <div class="bottom-left" />
        <div class="bottom-center" />
        <div class="bottom-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";

.spinner-container {
  display: flex;
  margin-top: 25px;
  margin-bottom: 25px;

  .spinner-blocks {
    width: 52px;
    height: 52px;
    display: inline-block;
    margin: auto;
    overflow: hidden;
    background: none;

    .spinner-content {
      width: 100%;
      height: 100%;
      position: relative;
      transform: translateZ(0) scale(0.46);
      backface-visibility: hidden;
      transform-origin: 0 0;

      div {
        position: absolute;
        width: 18px;
        height: 18px;
        background: #7eb62f;
        animation: spinner-animation 1s linear infinite;
        box-sizing: content-box;

        &.top-left {
          left:16px;
          top:16px;
          animation-delay:0s;
          border-bottom: 18px solid $base;
          border-left: 18px solid transparent;
          background: none !important;
          height: 0;
          width: 0;
        }

        &.top-center {
          left:39px;
          top:16px;
          width: 36px;
          animation-delay:0.125s
        }

        &.top-right {
          left:80px;
          top:16px;
          animation-delay:0.25s;
          border-bottom: 18px solid $base-dark;
          border-right: 18px solid transparent;
          background: none !important;
          height: 0;
          width: 0;
        }

        &.middle-left {
          left:16px;
          top:39px;
          height: 36px;
          animation-delay:0.875s
        }

        &.middle-center {
          animation: none !important;
          background: linear-gradient(45deg, $base, $base-dark) !important;
          width: 36px !important;
          height: 36px !important;;
          left:39px;top:39px;
          display: flex;

          .mdi {
            margin: auto;
            font-size: 34px;
            color: $white;
            line-height: 36px;
          }
        }

        &.middle-right {
          left:80px;
          top:39px;
          height: 36px;
          animation-delay:0.375s
        }

        &.bottom-left {
          left:16px;
          top:80px;
          animation-delay:0.75s;
          border-top: 18px solid $base-dark;
          border-left: 18px solid transparent;
          background: none !important;
          height: 0;
          width: 0;
        }

        &.bottom-center {
          left:39px;
          top:80px;
          width: 36px;
          animation-delay:0.625s
        }

        &.bottom-right {
          left:80px;
          top:80px;
          animation-delay:0.5s;
          border-top: 18px solid $base;
          border-right: 18px solid transparent;
          background: none !important;
          height: 0;
          width: 0;
        }
      }
    }
  }
}

@keyframes spinner-animation {
  0% {
    background: $base-dark;
  }
  12.5% {
    background: $base-dark
  }
  12.625% {
    background: $base
  }
  100% {
    background: $base
  }
}


</style>
