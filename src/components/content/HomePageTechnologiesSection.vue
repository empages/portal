<template>
  <HomePageSection
    title="Stay current"
    :use-card="false">
    <div class="row">
      <EmCol
        v-for="technology in technologies"
        :key="`hp-tech-${technology.title}`"
        sm="6"
        md="4"
        class="mb-4">
        <a
          class="tech-link"
          target="_blank"
          :href="`${technology.link}?reference=https://emeraude.io`">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex">
                <div class="w-auto">
                  <div class="w-100">
                    <img
                      class="tech-logo"
                      :title="technology.title"
                      :alt="technology.title"
                      :src="technology.logo">
                  </div>
                </div>
                <div class="w-auto ms-3">
                  <h3 class="tech-title">
                    {{ technology.title }}
                  </h3>
                  <p
                    v-strong
                    class="tech-description mb-0">
                    {{ technology.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </EmCol>
    </div>
  </HomePageSection>
</template>

<script lang="ts" setup>

import HomePageSection from "@/components/wrappers/HomePageSection.vue";
import EmCol from "@/components/base/EmCol.vue";

import vueLogo from '@/assets/images/technologies/vue.svg';
import typeScriptLogo from '@/assets/images/technologies/typescript.svg';
import viteLogo from '@/assets/images/technologies/vite.svg';
import bootstrapLogo from '@/assets/images/technologies/bootstrap.svg';
import sassLogo from '@/assets/images/technologies/sass.svg';
import netlifyLogo from '@/assets/images/technologies/netlify.svg';

const technologies = [
  {
    title: 'Vue',
    description: 'Developed on **Vue 3** following the best of the framework (composition API, vue-router, vuex).',
    logo: vueLogo,
    link: 'https://vuejs.org'
  },
  {
    title: 'TypeScript',
    description: 'Developed in a way that takes the advantage of type-safe and scalable JavaScript.',
    logo: typeScriptLogo,
    link: 'https://www.typescriptlang.org'
  },
  {
    title: 'Vite',
    description: 'Built with the fastest build tool for developing and bundling modern web applications.',
    logo: viteLogo,
    link: 'https://vitejs.dev'
  },
  {
    title: 'Bootstrap',
    description: 'Designed with **Bootstrap 5** in order to provide standard and recognizable structure.',
    logo: bootstrapLogo,
    link: 'https://getbootstrap.com'
  },
  {
    title: 'Sass',
    description: 'Well-organized stylesheet project providing simple customization in case of branching.',
    logo: sassLogo,
    link: 'https://sass-lang.com'
  },
  {
    title: 'Netlify',
    description: 'Deployed and hosted by the most comprehensive platform for web projects.',
    logo: netlifyLogo,
    link: 'https://www.netlify.com'
  }
]

</script>

<style scoped lang="scss">
@import "src/assets/styles/mixins";
.tech-link {
  text-decoration: none !important;
  * {
    text-decoration: none !important;
  }

  .tech-logo {
    width: 36px;
    height: auto;
  }

  .tech-title {
    color: black;
    font-size: 20px;
    font-weight: bold;
  }

  .tech-description {
    color: black;
    font-size: 18px;

    @include respond-below(sm) {
      font-size: 16px;
    }
  }
}

</style>
