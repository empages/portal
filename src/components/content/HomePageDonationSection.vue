<template>
  <HomePageSection
    id="donation"
    title="Support us">
    <div class="donate-section text-center">
      <a
        :href="paypalDonateUrl"
        class="btn btn-secondary mx-1"
        target="_blank">Donate via PayPal</a>
      <a
        :href="patreonDonateUrl"
        class="btn btn-secondary mx-1"
        target="_blank">Become a backer or sponsor via Patreon</a>
    </div>
  </HomePageSection>
</template>

<script lang="ts" setup>
import HomePageSection from "@/components/wrappers/HomePageSection.vue";
const paypalDonateUrl = 'https://www.paypal.com/donate?hosted_button_id=4FEAXAP5TL3EG';
const patreonDonateUrl = 'https://www.patreon.com/gsk567';

</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";
@import "src/assets/styles/mixins";
#donation {
  .btn {
    font-size: 20px;
    margin-bottom: 10px;

    @include respond-below(sm) {
      font-size: 16px;
    }

    @include respond-below(xs) {
      font-size: 14px;
    }
  }

  :deep .card {

  }
}


</style>
