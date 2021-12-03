<template>
  <div>
    <div
      id="main"
      class="container px-sm-5 px-2">
      <h1 class="title">
        Outstanding Management Experience
      </h1>
      <h2 class="sub-title">
        A web client for your <strong><a
          target="_blank"
          title="Emeraude Framework"
          href="https://emeraude.dev">Emeraude</a></strong>-based project
      </h2>
      <RouterLink
        :to="{ name: 'settings' }"
        class="btn btn-secondary">
        Configure Now
      </RouterLink>
    </div>
    <HomePageInfoSection />
    <HomePageTechnologiesSection />
    <HomePageSecuritySection />
    <HomePageCustomizationSection />
    <HomePageDonationSection class="mb-0" />
  </div>
</template>

<script lang="ts" setup>

import HomePageInfoSection from "@/components/content/HomePageInfoSection.vue";
import HomePageTechnologiesSection from "@/components/content/HomePageTechnologiesSection.vue";
import HomePageSecuritySection from "@/components/content/HomePageSecuritySection.vue";
import HomePageCustomizationSection from "@/components/content/HomePageCustomizationSection.vue";
import HomePageDonationSection from "@/components/content/HomePageDonationSection.vue";
</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  #main {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: center;

    .title {
      font-size: 50px;
      font-weight: bold;
    }

    .sub-title {
      font-size: 24px;
      color: $darker-gray;

      strong {
        color: $base-dark;
        a {
          text-decoration: none !important;
        }
      }
    }

    .btn {
      font-size: 20px;
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
</style>
