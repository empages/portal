<template>
  <HomePageSection title="Emeraude Portal">
    <div class="container">
      <div class="row info-container">
        <EmCol sm="6">
          <ul>
            <li
              v-for="(item, itemIndex) in portalIsList"
              :key="`portal-is-${itemIndex}`">
              <span class="bullet text-success"><i class="mdi mdi-check-decagram" /> Is </span> {{ item }}
            </li>
          </ul>
        </EmCol>
        <EmCol sm="6">
          <ul>
            <li
              v-for="(item, itemIndex) in portalIsNotList"
              :key="`portal-is-not-${itemIndex}`">
              <span class="bullet text-danger"><i class="mdi mdi-alert-decagram" /> Is not</span> {{ item }}
            </li>
          </ul>
        </EmCol>
      </div>
    </div>
  </HomePageSection>
</template>

<script lang="ts" setup>

import HomePageSection from "@/components/wrappers/HomePageSection.vue";
import EmCol from "@/components/base/EmCol.vue";

const portalIsList = [
  'a web application client',
  'a single page application',
  'a multi-application manager',
  'a web API consumer',
  'the Emeraude Framework management portal',
  'free and open-source'
]

const portalIsNotList = [
  'a software as a service',
  'a NPM package',
  'consuming internal back-end',
  'tracking activity',
  'dependent on any server-side technology',
  'paid'
]

</script>

<style scoped lang="scss">
@import "src/assets/styles/mixins";

  .info-container {
    ul {
      list-style: none;
      padding: 0;

      li {
        .bullet {
          font-weight: bold;
        }

        font-size: 20px;

        @include respond-below(sm) {
          font-size: 18px;
        }
      }
    }
  }
</style>
