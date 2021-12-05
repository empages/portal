<template>
  <ContentCard title="Terms">
    <h4>Introduction</h4>
    <p>
      Please read these Terms carefully before using this website. By using this website (the "Emeraude Portal"),
      the user ("You") has accepted these Terms of Use. If You do not accept these Terms of Use, do not use
      the Emeraude Portal.
    </p>
    <p>
      Emeraude Portal may modify all or any part of these Terms of Use from time to time and may not provide
      notice to You. You are encouraged to check back often so You are aware of your current rights and
      responsibilities. Your continued use of this website after changes to the Terms of Use have been published
      constitutes your binding acceptance of the updated Terms of Use. If at any time the Terms of Use are no
      longer acceptable to You, You should immediately cease all use of this Emeraude Portal.
    </p>
    <h4>Usage</h4>
    <p>
      Emeraude Portal is a free and open-source web client that can be considered as a static website if no
      external application is linked so every user can use it without any limitations.
      The functional side of the Emeraude Portal is dependent on the application that is linked to it
      so the portal website has no limitations and all data that flows through is outside of the scope of these terms.
    </p>
    <p>
      In case you are going to make your own instance of the Emeraude Portal - this Terms are not applicable
      and you have to make your own Terms of use.
      In case of creating a separate instance of the Emeraude Portal - consider the open-source license information
      as a reference about the usage limitations.
    </p>
    <p>
      In case of improper work or unexpected behavior of the website - Emeraude Portal and its creators and maintainers
      are free of responsibility.
      In case the website is down for any reason - Emeraude Portal and its creators and maintainers
      are free of responsibility.
    </p>
    <h4>Content</h4>
    <p>
      All static content on this website is under the open-source license of the Emeraude Portal. All dynamic content provided
      by external API to the Emeraude Portal is outside of the current terms.
    </p>
    <p>
      All content that is rendered by the Emeraude Portal is available only for you and your data provider.
    </p>
    <h4>Data Exposure</h4>
    <p>
      Emeraude Portal is a single-page website that exposes predefined content and data provided by external API.
      The website doesn't include any internal and/or third-party services that log, track or analyze the data that
      flows through the website. In case of data breach consider that as an improper work of the Emeraude Portal.
      In case of a data breach please contact us immediately.
    </p>
    <h4>Privacy</h4>
    <p>
      Emeraude Portal has no deal with any internal APIs different from the one that the user includes.
      It means no personal data is used. The website is using application data (application URLs, gateway IDs,
      and access tokens) specified or retrieved by the user to access external APIs. That data is stored only
      in the local storage on the user's browser. In addition, Emeraude Portal does not expose that application
      data to any third-party service so you can consider that data as private.
    </p>
    <h4>Contact</h4>
    <p>
      Please send your feedback, comments, requests for technical support by email: <a
        href="mailto:contact@emeraude.dev"
        title="contact@emeraude.dev">contact@emeraude.dev</a>.
    </p>
  </ContentCard>
</template>

<script lang="ts" setup>

import ContentCard from "@/components/wrappers/ContentCard.vue";
</script>

<style scoped lang="scss">
p {
  font-size: 1rem;
}

h4 {
  font-weight: 500;
}
</style>
