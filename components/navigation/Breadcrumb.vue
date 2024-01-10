<template>
  <div class="breadcrumb" v-if="breadcrumb">
    <div
      class="container h-100 row align-items-center justify-content-between mx-auto"
    >
      <div class="col-4">
        <ul class="link">
          <li v-for="item in breadcrumb.items" :key="item.link">
            <NuxtLink :to="item.link"> {{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="tab col-8" v-if="breadcrumbTab">
        <ul class="d-flex py-0 flex-nowrap text-nowrap">
          <li
            v-for="(item, key) in breadcrumbTab.items"
            :key="key"
            class="d-flex align-items-center position-relative"
            :class="route.path === item.link ? 'active' : ''"
          >
            <NuxtLink :to="item.link"> {{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useBreadcrumbStore } from "~/store/breadcrumb";

const route = useRoute();

const { breadcrumb, breadcrumbTab } = storeToRefs(useBreadcrumbStore());
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
    margin: 0;
    &.link {
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
  }
  .tab {
    overflow-x: scroll;

    ul {
      height: 44px;
      width: 100%;
      font-family: "Poppins Medium", sans-serif, Arial;
      font-size: 14px;
      list-style: none;
      width: fit-content;

      li {
        cursor: pointer;
        padding: 0px 34px;
        height: 42px;
        position: relative;
        a {
          text-decoration: none;
          color: inherit;
        }

        &.active {
          background-color: #fff;
          color: #000;
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: -20px; // Adjust this value to move the left corner image outside the background color
            width: 20px; // Set the width of your left corner image
            height: 100%;
            background: url(~/assets/images/svg/corner/left-corner-light.svg)
              no-repeat;
            background-position: left;
          }

          &:after {
            content: "";
            position: absolute;
            top: 0;
            right: -20px; // Adjust this value to move the right corner image outside the background color
            width: 20px; // Set the width of your right corner image
            height: 100%;
            background: url(~/assets/images/svg/corner/right-corner-light.svg)
              no-repeat;
            background-position: right;
          }
        }
      }
    }
  }
}
</style>
