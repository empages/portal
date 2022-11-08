<template>
  <ContentCard
    title="Terms"
    class="text-start my-2">
    <h4>Introduction</h4>
    <p>
      Please read these Terms carefully before using this website. By using this website (the "Emerald Pages Portal"),
      the user ("You") has accepted these Terms of Use. If You do not accept these Terms of Use, do not use
      the Emerald Pages Portal.
    </p>
    <p>
      Emerald Pages Portal may modify all or any part of these Terms of Use from time to time and may not provide
      notice to You. You are encouraged to check back often so You are aware of your current rights and
      responsibilities. Your continued use of this website after changes to the Terms of Use have been published
      constitutes your binding acceptance of the updated Terms of Use. If at any time the Terms of Use are no
      longer acceptable to You, You should immediately cease all use of this Emerald Pages Portal.
    </p>
    <h4 class="mt-2">Usage</h4>
    <p>
      Emerald Pages Portal is a free and open-source web client that can be considered as a static website if no
      external application is linked so every user can use it without any limitations.
      The functional side of the Emerald Pages Portal is dependent on the application that is linked to it
      so the portal website has no limitations and all data that flows through is outside of the scope of these terms.
    </p>
    <p>
      In case you are going to make your own instance of the Emerald Pages Portal - this Terms are not applicable
      and you have to make your own Terms of use.
      In case of creating a separate instance of the Emerald Pages Portal - consider the open-source license information
      as a reference about the usage limitations.
    </p>
    <p>
      In case of improper work or unexpected behavior of the website - Emerald Pages Portal and its creators and maintainers
      are free of responsibility.
      In case the website is down for any reason - Emerald Pages Portal and its creators and maintainers
      are free of responsibility.
    </p>
    <h4 class="mt-2">Content</h4>
    <p>
      All static content on this website is under the open-source license of the Emerald Pages Portal. All dynamic content provided
      by external API to the Emerald Pages Portal is outside of the current terms.
    </p>
    <p>
      All content that is rendered by the Emerald Pages Portal is available only for you and your data provider.
    </p>
    <h4 class="mt-2">Data Exposure</h4>
    <p>
      Emerald Pages Portal is a single-page website that exposes predefined content and data provided by external API.
      The website doesn't include any internal and/or third-party services that log, track or analyze the data that
      flows through the website. In case of data breach consider that as an improper work of the Emerald Pages Portal.
      In case of a data breach please contact us immediately.
    </p>
    <h4 class="mt-2">Privacy</h4>
    <p>
      Emerald Pages Portal has no deal with any internal APIs different from the one that the user includes.
      It means no personal data is used. The website is using application data (application URLs, gateway IDs,
      and access tokens) specified or retrieved by the user to access external APIs. That data is stored only
      in the local storage on the user's browser. In addition, Emerald Pages Portal does not expose that application
      data to any third-party service so you can consider that data as private.
    </p>
    <h4 class="mt-2">Contact</h4>
    <p>
      Please send your feedback, comments, requests for technical support by email: <a
        href="mailto:georgi.karagogov@gmail.com"
        title="georgi.karagogov@gmail.com">georgi.karagogov@gmail.com</a>.
    </p>
  </ContentCard>
</template>

<script lang="ts" setup>

import ContentCard from "@/components/misc/ContentCard.vue";
</script>

<style scoped lang="scss">
p {
  font-size: 1rem;
}

h4 {
  font-weight: 500;
}
</style>
