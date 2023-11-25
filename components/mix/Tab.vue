<template>
  <div class="tab disable-scorllbar">
    <ul class="d-flex p-0 flex-nowrap text-nowrap">
      <li
        v-for="(item, key) in items"
        :key="key"
        :class="key === currentIndex ? 'active' : ''"
        class="d-flex align-items-center"
        @click="currentIndex = key"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Number,
  },
  items: {
    type: Array<string>,
    default: [],
  },
});
const emit = defineEmits(["update:modelValue"]);
const currentIndex = useVModel(props, "modelValue", emit);
</script>

<style scoped lang="scss">
.tab {
  overflow-x: scroll;

  ul {
    background-color: $main-bg;
    height: 40px;
    width: 100%;
    font-family: "Poppins Medium", sans-serif, Arial;
    font-size: 14px;
    border-start-start-radius: 23px;
    border-start-end-radius: 23px;
    list-style: none;
    width: fit-content;
    li {
      cursor: pointer;
      border-start-start-radius: 23px;
      border-start-end-radius: 23px;
      padding: 0 40px;
      &.active {
        background-color: $main-blue;
        color: #fff;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
