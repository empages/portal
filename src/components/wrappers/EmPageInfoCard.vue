<template>
  <div class="em-page-info-card">
    <RouterLink :to="`/admin/${props.page.route}`">
      <div class="card">
        <div class="card-header pt-3 px-3">
          <div class="d-flex">
            <div class="icon-container mb-auto mt-0 disable-select">
              <div class="page-icon">
                <span class="letter">
                  {{ props.page.title[0] }}
                </span>
              </div>
            </div>
            <div class="mb-auto mt-1">
              <h3 class="card-title">
                {{ getPluralFormat(props.page.title) }}
              </h3>
              <p class="text-muted text-small">
                {{ props.page.route }}
              </p>
            </div>
          </div>
        </div>
        <div class="card-body pt-2 pb-3 px-3">
          <p class="m-0">
            {{ props.page.description }}
          </p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import {EmPageSimpleModel} from "@/models/em-page-simple-model";
import {getPluralFormat} from "@/shared/helpers";
import logo from "@/assets/images/logo.svg";
import {computed} from "vue";

const props = defineProps<{
  page: EmPageSimpleModel
}>();

function getColorFromString(string: string): string {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}

const pageColor = getColorFromString(props.page.title);

</script>

<style scoped lang="scss">
  @import "src/assets/styles/variables";
  .em-page-info-card {
    .icon-container {
      .page-icon {
        border-radius: 4px;
        height: 40px;
        width: 40px;
        background: v-bind(pageColor);
        display: flex;
        line-height: 0;

        .letter {
          margin: auto;
          color: $white;
          font-size: 24px;
          font-weight: bold;
          line-height: 0;
        }
      }

      margin-right: 0.65rem
    }

    text-decoration: none !important;
    * {
      text-decoration: none !important;
    }

    .card {

      &:hover {
        background: $ghost-white;
      }

      .card-header {
        background: none;
      }

      .card-title {
        font-size: 16px;
        font-weight: bold;
        line-height: 16px;
      }

      .card-body {
        p {
          font-size: 12px;
          color: $black;
        }
      }
    }
  }
</style>
