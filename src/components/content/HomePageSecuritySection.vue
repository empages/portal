<template>
  <HomePageSection
    id="security"
    title="Feel safe">
    <p>
      The safety and security of you and your application are a top priority for us. So that's why
      Emeraude Portal is designed to be unbreakable.
    </p>
    <p>
      Consider the web client as a local application that you are open in your browser. The portal saves everything
      in your browser's local storage so for instance if you are connecting your web API to the Emeraude Portal
      that connection will be available only for you only on the machine and corresponding browser you are using.
    </p>
    <p>
      During the work with the portal - the whole data flow is between your back-end and Emeraude Portal. No tools
      related to logging, tracking and anything that intercepts the data flow is not available. Check the network
      tab of your browser if you don't believe us.
    </p>
    <p>
      In a few words, Emeraude Portal is nothing other than a static <code>index.html</code> file with the built
      Vue bundle and a few design assets.
    </p>
  </HomePageSection>
</template>

<script lang="ts" setup>

import HomePageSection from "@/components/wrappers/HomePageSection.vue";
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";
@import "src/assets/styles/mixins";
#security {
  :deep {
    .card {
      background: $safe-blue;
      color: $white;

      p {
        font-size: 18px;
        font-weight: bold;

        @include respond-below(sm) {
          font-size: 16px;
        }
      }

      code {
        color: $cyan;
      }
    }
  }
}


</style>
