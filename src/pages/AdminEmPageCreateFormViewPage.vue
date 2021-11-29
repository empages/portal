<template>
  <EmPageFormView
    :page-route="route"
    :type="EmPageFormType.CreateForm"
    :identifier="null" />
</template>

<script lang="ts" setup>
import { useEmPageArgs } from '@/composables/em-page-args-composable'
import EmPageFormView from '@/components/em-pages/views/EmPageFormView.vue'
import {EmPageFormType} from "@/shared/enums";

const { route } = useEmPageArgs();
</script>

<style scoped>

</style>
