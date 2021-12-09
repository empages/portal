<template>
  <HomePageSection
    title="Customize your experience"
    :use-card="false">
    <EmRow
      class="main-row">
      <EmCol sm="6">
        <EmCard
          title="Current instance"
          class="instance-card mb-4">
          The fact that Emeraude Portal is built and deployed as a completed web client
          solution doesn't exclude the possibility to be customized. The web client supports
          a feature called <strong>Runtime Injection</strong> which provides API for including a custom JavaScript
          and CSS in order to extend and restyle the existing portal. For more information
          check the documentation of <a
            title="Emeraude Framework"
            target="_blank"
            :href="emeraudeFrameworkWebsite">Emeraude Framework</a>.
        </EmCard>
      </EmCol>
      <EmCol sm="6">
        <EmCard
          title="Other instance"
          class="instance-card mb-4">
          The web client is designed to be shared and public but you always can do it privately.
          Emeraude Portal is an open-source solution and as such provides the possibility
          to clone/fork the existing git repository, customize and extend the application, and deploy
          the new instance of the portal on any environment you want. If you are considering that kind of customization - <a
            title="Emeraude Portal Repository"
            :href="portalRepository"
            target="_blank">check the GitHub repository</a>.
        </EmCard>
      </EmCol>
    </EmRow>
  </HomePageSection>
</template>

<script lang="ts" setup>

import HomePageSection from "@/components/wrappers/HomePageSection.vue";
import EmRow from "@/components/base/EmRow.vue";
import EmCol from "@/components/base/EmCol.vue";
import EmCard from "@/components/base/EmCard.vue";
import {emeraudeFrameworkWebsite, portalRepository} from "@/shared/config";
</script>

<style scoped lang="scss">
@import "src/assets/styles/mixins";
  .main-row {
    :deep .card-header {
      text-align: center;
      .card-title {
        font-size: 24px;
        font-weight: bold;

        @include respond-below(sm) {
          font-size: 20px;
        }
      }
    }

    .instance-card {
      font-size: 18px;

      @include respond-below(sm) {
        font-size: 16px;
      }
    }
  }
</style>
