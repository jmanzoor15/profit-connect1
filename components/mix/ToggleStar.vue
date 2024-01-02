<template>
  <div>
    <NuxtImg
      v-if="data"
      src="/images/svg/star-yellow.svg"
      @click="data = false"
      :height="size ?? 16"
      :width="size ?? 16"
    />
    <NuxtImg
      :height="size ?? 16"
      :width="size ?? 16"
      v-else
      src="/images/svg/star-grey.svg"
      @click="data = true"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
  size?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
<style lang="scss" scoped></style>
