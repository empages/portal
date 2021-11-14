<template>
  <EmClientBuilderLayout>
    <EmMainCard
      :title="title"
      :sub-title="subTitle">
      <hr class="w-100">
      <div class="">
        <div class="mb-4">
          <h5>Generate all by instance type</h5>
          <div>
            <button
              v-for="module in uniqueModulesByInstanceType"
              :key="module.type"
              class="btn btn-primary cb-gen-btn"
              @click="generateModulesByInstanceType(module.type)">
              <span class="cb-gen-btn-text">
                <i :class="getInstanceTypeIcon(module.type)" /> {{ getInstanceTypeText(module.type) }} Modules ({{ getModulesCountByExpression(x => x.type === module.type) }})
              </span>
            </button>
          </div>
        </div>
        <div class="">
          <h5>Generate all by client type</h5>
          <div>
            <button
              v-for="module in uniqueModulesByClient"
              :key="module.clientId"
              class="btn btn-primary cb-gen-btn"
              @click="generateModulesByClientId(module.clientId)">
              <img
                alt="icon"
                :src="getApplicationUrl(module.iconUrl)"
                class="cb-gen-btn-img">
              <span class="cb-gen-btn-text">
                {{ module.scaffoldTypeName }} Modules ({{ getModulesCountByExpression(x => x.clientId === module.clientId) }})
              </span>
            </button>
          </div>
        </div>
      </div>
      <hr class="w-100">
      <EmTable
        :columns="tableColumns"
        :data="modules">
        <template #icon="{ data }">
          <img
            class="module-icon"
            :src="getApplicationUrl(data.iconUrl)"
            alt="icon">
        </template>
        <template #type="{ value }">
          <span
            class="badge type-icon"
            :class="getInstanceTypeColor(value)">
            <i
              class="mdi"
              :class="getInstanceTypeIcon(value)" /> {{ getInstanceTypeText(value) }}
          </span>
        </template>
        <template #folders="{ data }">
          <EmModal
            hide-header
            hide-footer
            size="xl">
            <template #trigger="{ show }">
              <button
                class="btn btn-primary module-items-btn"
                @click="show()">
                {{ data.folders.length }} folder{{ data.folders.length === 1 ? '' : 's' }}
              </button>
            </template>
            <template #body>
              <EmTable
                :data="data.folders"
                :columns="[ { key: 'name', title: 'Folder' }, { key: 'relativePath', title: 'Path' } ]" />
            </template>
          </EmModal>
        </template>
        <template #files="{ data }">
          <EmModal
            hide-header
            hide-footer
            size="xl">
            <template #trigger="{ show }">
              <button
                class="btn btn-primary module-items-btn"
                @click="show()">
                {{ data.files.length }} file{{ data.files.length === 1 ? '' : 's' }}
              </button>
            </template>
            <template #body>
              <EmTable
                :data="data.files"
                :columns="[ { key: 'name', title: 'File' }, { key: 'relativePath', title: 'Path' } ]" />
            </template>
          </EmModal>
        </template>
        <template #generated="{ value }">
          <EmFlag :value="value" />
        </template>
        <template #locked="{ value }">
          <EmFlag :value="value" />
        </template>
        <template #actions="{ data }">
          <div>
            <button
              class="btn btn-primary px-2 py-1"
              @click="generateModuleById(data.id)">
              Generate
            </button>
          </div>
        </template>
      </EmTable>
    </EmMainCard>
  </EmClientBuilderLayout>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { useUrlBuilder } from "@/composables/url-builder-composable";
import { useNotifications } from "@/composables/notifications-composable";
import {handleRequestError} from "@/utils/helpers";
import {ApplicationInstanceType} from "@/shared/enums";
import { ScaffoldModule } from "@/models/scaffold-module";
import {getTypeColor, getTypeIcon, getTypeText} from "@/shared/instanceTypeDictionary";
import clientBuilderService from "@/services/client-builder-service";
import EmTable from "@/components/base/EmTable.vue";
import EmModal from "@/components/base/EmModal.vue";
import EmMainCard from "@/components/base/EmMainCard.vue";
import {strings} from "@/shared/strings";
import {scaffoldModulesTableColumns} from "@/shared/tables-columns/scaffold-modules-table-columns";
import EmClientBuilderLayout from "@/components/layouts/EmClientBuilderLayout.vue";
import EmFlag from "@/components/base/EmFlag.vue";

export default defineComponent({
  name: "ScaffoldPage",
  components: {EmFlag, EmClientBuilderLayout, EmMainCard, EmModal, EmTable},
  setup() {
    return {
      ...useUrlBuilder(),
      ...useNotifications(),
      getInstanceTypeColor: getTypeColor,
      getInstanceTypeIcon: getTypeIcon,
      getInstanceTypeText: getTypeText
    }
  },
  data() {
    return {
      title: strings.clientBuilder.scaffoldPageTitle,
      subTitle: strings.clientBuilder.scaffoldPageDescription,
      tableColumns: scaffoldModulesTableColumns,
      modules: [] as Array<ScaffoldModule>,
    }
  },
  computed: {
    uniqueModulesByInstanceType(): Array<ScaffoldModule> {
      return this
          .getUniqueModulesPropertyByExpression<ApplicationInstanceType>((x: ScaffoldModule) => x.type)
          .map((x: ApplicationInstanceType) => this.getDefaultModuleByFilterExpression((y: ScaffoldModule) => y.type === x)) as Array<ScaffoldModule>;
    },
    uniqueModulesByClient(): Array<ScaffoldModule> {
      return this
          .getUniqueModulesPropertyByExpression<string>((x: ScaffoldModule) => x.clientId)
          .map((x: string) => this.getDefaultModuleByFilterExpression((y: ScaffoldModule) => y.clientId === x)) as Array<ScaffoldModule>;
    },
  },
  async mounted() {
    await this.loadModules();
  },
  methods: {
    getUniqueModulesPropertyByExpression<Property>(expression: (value: ScaffoldModule, index: number, array: ScaffoldModule[]) => Property): Array<Property> {
      if (this.modules && this.modules.length > 0) {
        return this.modules.map(expression).filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      }

      return [];
    },
    getDefaultModuleByFilterExpression(expression: any): ScaffoldModule | null {
      if (this.modules && this.modules.length > 0) {
        let currentModules = this.modules.filter(expression);
        if (currentModules.length > 0) {
          return currentModules[0];
        }
      }

      return null;
    },
    getModulesCountByExpression(expression: any) {
      return this.modules.filter(expression).length;
    },
    async loadModules() {
      try {
        this.modules = await clientBuilderService.getScaffoldModules();
      }
      catch(e: any) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async generateModuleById(moduleId: string) {
      try {
        await clientBuilderService.generateModuleById(moduleId);
        await this.loadModules();
        this.showSuccessToast(strings.clientBuilder.moduleGenerationSucceededMessage);
      }
      catch(e: any) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async generateModulesByClientId(clientId: string) {
      try {
        await clientBuilderService.generateModulesByClientId(clientId);
        await this.loadModules();
        this.showSuccessToast(strings.clientBuilder.modulesGenerationSucceededMessage);
      }
      catch(e: any) {
        handleRequestError(e, this.showErrorToast);
      }
    },
    async generateModulesByInstanceType(instanceType: ApplicationInstanceType) {
      try {
        await clientBuilderService.generateModulesByInstanceType(instanceType);
        await this.loadModules();
        this.showSuccessToast(strings.clientBuilder.modulesGenerationSucceededMessage);
      }
      catch(e: any) {
        handleRequestError(e, this.showErrorToast);
      }
    }
  }
})
</script>

<style scoped lang="scss">
  .module-icon {
    height: 18px;
  }

  .type-icon {
    font-size: 14px;
    padding: 4px 6px;
    text-align: center;
    font-weight: 400;
  }

  .module-items-btn {
    font-size: 12px;
    padding: 2px 6px;
  }

  .cb-gen-btn {
    width: auto;
    margin-right: 6px;
    margin-bottom: 6px;

    .cb-gen-btn-img {
      height: 16px;
    }

    &:hover,
    &:active,
    &:focus {
      .cb-gen-btn-img {
        -webkit-filter: brightness(0) invert(1);
        filter: brightness(0) invert(1);
      }
    }

    .cb-gen-btn-text {
      margin-left: 2px;
    }
  }
</style>
