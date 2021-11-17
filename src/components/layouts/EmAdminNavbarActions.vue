<template>
  <ul class="addon-navbar navbar-nav navbar-nav-left header-links d-none d-md-flex p-0">
    <li
      v-for="(action, actionIndex) in actions"
      :key="`navbar-action-${actionIndex}`"
      class="nav-item p-1">
      <div v-if="action.actionHttpMethod.method === HttpMethods.GET">
        <RouterLink
          :to="action.actionUrl"
          :title="action.title"
          :target="getTargetAttribute(action)"
          class="nav-link btn btn-secondary h-auto">
          {{ action.title }}
        </RouterLink>
        <div v-if="executionMethods.includes(action.actionHttpMethod.method)">
          <button
            class="nav-link btn btn-secondary h-auto"
            @click="execute(action)" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import {useStore} from "vuex";
  import {computed} from "vue";
  import {ActionModel} from "@/models/action-model";
  import {HttpMethods} from "@/models/http-method";

  const executionMethods: Array<string> = [HttpMethods.POST, HttpMethods.PUT, HttpMethods.DELETE];
  const store = useStore();
  const actions = computed(() => store.getters['navActionsModule/actions']);

  function getTargetAttribute(action: ActionModel) {
    return action.openOnSeparatePage ? "_blank" : "_self";
  }

  function execute(action: ActionModel) {
    console.log(action);
  }
</script>

<style scoped>

</style>
