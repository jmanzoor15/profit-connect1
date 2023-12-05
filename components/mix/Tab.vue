<template>
  <div class="tab disable-scorllbar">
    <ul class="d-flex p-0 flex-nowrap text-nowrap">
      <li
        v-for="(item, key) in items"
        :key="key"
        :class="key === currentIndex ? 'active' : ''"
        class="d-flex align-items-center position-relative"
        @click="currentIndex = key"
      >
        {{ item }}
        <NuxtImg
          class="position-absolute end-0 mx-4"
          src="/images/svg/edit-icon-white.svg"
          height="14"
          width="14"
          @click="onClickEdit(key)"
        />
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
const emit = defineEmits(["update:modelValue", "edit"]);
const currentIndex = useVModel(props, "modelValue", emit);

const onClickEdit = (tab:number) => {
  emit("edit",tab);
};
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
      padding: 0px 64px;
      &.active {
        background-color: $main-blue;
        color: #fff;
      }
      &:hover {
        background: $hover-blue;
      }
    }
  }
}
</style>
