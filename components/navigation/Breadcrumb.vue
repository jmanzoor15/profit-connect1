<template>
  <div class="breadcrumb" v-if="breadcrumb">
    <ul class="container">
      <li v-for="item in breadcrumb.items" :key="item.link">
        <NuxtLink :to="item.link"> {{ item.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBreadcrumbStore } from "~/store/breadcrumb";

const { breadcrumb } = storeToRefs(useBreadcrumbStore());
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  height: 43px;
  background: $dark-blue-seconadary;
  color: #c5c5c5;
  margin: 0;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  a {
    color: #c5c5c5;
    text-decoration: none;

    &:last-child:not(.is-active) {
      color: #ffffff;
    }
  }
  li {
    display: flex;
    align-items: center;
    &:not(:last-child)::after {
      content: ">";
      margin: 0 10px;
      font-size: 18px;
    }
  }
}
</style>
