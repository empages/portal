<template>
  <header class="mb-3">
    <div class="container-fluid">
      <div class="pt-6">
        <div class="row align-items-center">
          <div class="col-sm col-12">
            <h1 class="h2 ls-tight">
              {{ pageTitle }}
            </h1>
          </div>
          <div class="col-sm-auto col-12 mt-4 mt-sm-0">
            <div class="hstack gap-2 justify-content-sm-end">
              <div
                v-for="(pageAction, pageActionIndex) in pageActions"
                :key="`page-${pageTitle}-action-${pageActionIndex}`">
                <div v-if="pageAction.type === PageActionType.Function">
                  <button @click="invokeAction(pageAction.action)" class="btn btn-sm btn-neutral border-base">
                    <span class="pe-2">
                      <i :class="pageAction.icon" />
                    </span>
                    <span>
                      {{ pageAction.name }}
                    </span>
                  </button>
                </div>
                <div v-else-if="pageAction.type === PageActionType.Route">
                  <RouterLink
                    :to="pageAction.action"
                    class="btn btn-sm btn-neutral border-base">
                    <span class="pe-2">
                      <i :class="pageAction.icon" />
                    </span>
                    <span>
                      {{ pageAction.name }}
                    </span>
                  </RouterLink>
                </div>
                <div v-else-if="pageAction.type === PageActionType.Url">
                  <a :href="pageAction.action.toString()" class="btn btn-sm btn-neutral border-base">
                    <span class="pe-2">
                      <i :class="pageAction.icon" />
                    </span>
                    <span>
                      {{ pageAction.name }}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>

import {useStore} from "vuex";
import {computed, ComputedRef, Ref} from "vue";
import {PageAction, PageActionType} from "@/store/modules/general-module";

const store = useStore();

const pageTitle = computed(() => store.getters['generalModule/pageTitle']);
const pageActions: ComputedRef<PageAction[]> = computed(() => store.getters['generalModule/pageActions']);

function invokeAction(action: any) {
  action();
}

</script>

<style scoped>
</style>
