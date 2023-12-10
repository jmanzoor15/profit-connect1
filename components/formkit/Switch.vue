<template>
  <Toggle @change="handleInput" :modelValue="props?.context?._value" />
</template>

<script lang="ts" setup>
import Toggle from "@vueform/toggle";

const props = defineProps({
  context: Object,
});

function handleInput(value: any) {
  props?.context?.node.input(value);
}
</script>

<style src="@vueform/toggle/themes/default.css"></style>
