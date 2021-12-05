<template>
  <HomePageSection
    class="section"
    title="Attribution"
    :use-card="false">
    <div class="text-center">
      <a
        v-for="(reference, referenceIndex) in references"
        :key="`attribution-reference-${referenceIndex}`"
        target="_blank"
        class="ref-item mx-2"
        :href="reference.url"
        :title="reference.text">
        <img
          :src="reference.image"
          :alt="reference.text">
      </a>
    </div>
  </HomePageSection>
</template>

<script lang="ts" setup>
import HomePageSection from "@/components/wrappers/HomePageSection.vue";
import jetBrainsImage from "@/assets/images/attribution/jb_square.svg";
import netlifyImage from "@/assets/images/attribution/netlify-color-accent.svg";

const references = [
  {
    image: jetBrainsImage,
    text: 'Developed with the help of JetBrains',
    url: 'https://www.jetbrains.com/?from=Emeraude'
  },
  {
    image: netlifyImage,
    text: 'Deploys by Netlify',
    url: 'https://www.netlify.com'
  }
]

</script>

<style scoped lang="scss">
.section {
  :deep {
    .title {
      margin-bottom: 20px;
    }
  }
}


</style>
