<template>
  <div>
    <div class="row">
      <EmCol
        v-for="page in pages"
        :key="`em-page-info-card-${page.route}`"
        sm="6"
        md="4"
        lg="3"
        class="mb-4">
        <EmPageInfoCard
          :page="page" />
      </EmCol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, Ref, ref} from "vue";
import {EmPageSimpleModel} from "@/models/em-page-simple-model";
import adminService from "@/services/admin-service";
import EmPageInfoCard from "@/components/wrappers/EmPageInfoCard.vue";
import EmCol from "@/components/base/EmCol.vue";
import {useAdminLayout} from "@/composables/admin-layout-composable";

const pages: Ref<Array<EmPageSimpleModel>> = ref([]);

const adminLayout = useAdminLayout();
adminLayout.reload({
  navbarActions: []
})

onMounted(async () => {
  pages.value = await adminService.getEmPagesList();
})

</script>

<style scoped>

</style>
