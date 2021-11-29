<template>
  <EmPageFormView
    :page-route="route"
    :identifier="identifier"
    :type="EmPageFormType.EditForm" />
</template>

<script lang="ts" setup>
import { useEmPageArgs } from '@/composables/em-page-args-composable'
import EmPageFormView from '@/components/em-pages/views/EmPageFormView.vue'
import {EmPageFormType} from "@/shared/enums";

const { route, identifier } = useEmPageArgs();
</script>

<style scoped>

</style>
