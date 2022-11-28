<template>
  <div class="card">
    <div class="card-body p-0">
      <div class="table-responsive table-round-container">
        <table class="table table-striped">
          <tbody>
            <tr
              v-for="field in props.model.fields"
              :key="`details-field-${field.index}`">
              <th>
                {{ field.label }}
              </th>
              <td>
                {{ field.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import type {EmDetailsResponseModel} from "@/core/types";
import type {ComputedRef} from "vue";
import type {TableColumn} from "@/shared/types/table-column";
import {computed} from "vue";

const props = defineProps<{
  model: EmDetailsResponseModel;
  route: string;
}>()

</script>

<style scoped>
</style>
