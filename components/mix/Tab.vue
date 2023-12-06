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
        <NuxtImg v-if="key === currentIndex"
          class="position-absolute end-0 "
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
    list-style: none;
    width: fit-content;

    li {
      cursor: pointer;
      padding: 0px 34px;
      position: relative;

      &.active {
        color: #fff;
        background-color: $main-blue;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: -20px; // Adjust this value to move the left corner image outside the background color
          width: 20px; // Set the width of your left corner image
          height: 100%;
          background: url(~/assets/images/svg/corner/left-corner.svg) no-repeat;
          background-position: left;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: -20px; // Adjust this value to move the right corner image outside the background color
          width: 20px; // Set the width of your right corner image
          height: 100%;
          background: url(~/assets/images/svg/corner/right-corner.svg) no-repeat;
          background-position: right;
        }
      }

      // &:hover {
      //   background: $hover-blue;
      // }
    }
  }
}
</style>
