<template>
  <EmPageView :view-model="viewModel">
    <form>
      <div
        v-for="(input, inputIndex) in inputs"
        :key="`em-page-form-input-${inputIndex}`"
        class="form-group">
        <label class="form-label">
          {{ input.label }}
        </label>
        <Component
          :is="input?.component.sourceName"
          :view-model="viewModel"
          :component="input?.component"
          :mutator-value="input?.value"
          v-bind="input?.parameters" />
      </div>
    </form>
  </EmPageView>
</template>

<script lang="ts" setup>
import { useAdminLayout } from '@/composables/admin-layout-composable'
import { computed, onMounted, ref, Ref, watch } from 'vue'
import adminService from '@/services/admin-service'
import { EmPageFormViewModel } from '@/models/em-page-form-view-model'
import EmPageView from '@/components/em-pages/views/EmPageView.vue'

const props = defineProps<{
  pageRoute: string | null,
  identifier: string | null
}>()

const adminLayout = useAdminLayout();

const viewModel: Ref<EmPageFormViewModel | null> = ref(null);

async function loadViewModel (route: string | null, identifier: string | null) {
  viewModel.value = await adminService.getFormViewModel(route || '', identifier || '');
  adminLayout.reload({
    breadcrumbs: viewModel.value.context.breadcrumbs,
    navbarActions: viewModel.value.context.navbarActions
  })
}

watch(() => props.pageRoute, async (value) => {
  await loadViewModel(value, props.identifier);
})

watch(() => props.identifier, async (value) => {
  await loadViewModel(props.pageRoute, value);
})

const inputs = computed(() => viewModel.value?.inputs);

onMounted(async () => {
  await loadViewModel(props.pageRoute, props.identifier);
})
</script>

<style scoped>

</style>
