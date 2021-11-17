<template>
  <EmAdminLayout>
    <table
      v-if="viewModel"
      class="table table-striped">
      <tbody>
        <tr
          v-for="(field, fieldIndex) in viewModel.fields"
          :key="`details-field-${fieldIndex}`">
          <td>
            <strong>{{ field.title }}:</strong>
          </td>
          <td class="white-space-normal">
            <Component
              :is="field?.component.sourceName"
              :view-model="viewModel"
              :component="field?.component"
              :renderer-value="field?.value"
              v-bind="field?.parameters" />
          </td>
        </tr>
      </tbody>
    </table>
  </EmAdminLayout>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue'
import EmAdminLayout from "@/components/layouts/EmAdminLayout.vue";
import { EmPageDetailsViewModel } from '@/models/em-page-details-view-model';
import adminService from "@/services/admin-service";
import {ActionModel} from "@/models/action-model";
import _ from "lodash";
export default defineComponent({
  name: "AdminDetailsViewEmPage",
  components: {EmAdminLayout},
  setup() {
    let viewModel: Ref<EmPageDetailsViewModel | null> = ref(null);

    return {
      viewModel
    }
  },
  computed: {
    route() {
      return this.$route.params.route;
    },
    identifier(): string {
      return this.$route.params.id.toString();
    }
  },
  watch: {
    async route(value) {
      await this.loadViewModel(value, this.identifier);
    }
  },
  async mounted() {
    await this.loadViewModel(this.route, this.identifier);
  },
  methods: {
    async loadViewModel(route: any, identifier: string) {
      this.viewModel = await adminService.getDetailsViewModel(route, identifier);
      this.$store.commit('breadcrumbsModule/setBreadcrumbs', this.viewModel.context.breadcrumbs);
      this.$store.commit('navActionsModule/setActions', this.viewModel.context.navbarActions);
    },
    orderedActions(actions: Array<ActionModel>): Array<ActionModel> {
      return _.sortBy(actions, x => x.order);
    }
  }
})
</script>

<style scoped>

</style>
