<template>
  <ClientOnly>
    <Dashboard :uppy="uppy" :plugins="['DragDrop']" />
  </ClientOnly>
</template>

<script setup>
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import DragDrop from "@uppy/drag-drop";
// Don't forget the CSS: core and UI components + plugins you are using
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.min.css";

const props = defineProps({
  context: Object,
});

const values = ref(props.context._value);

const uppy = ref();
onMounted(() => {
  uppy.value = new Uppy().use(DragDrop);
  const getFiles = computed(() => {
    return uppy.value.getFiles();
  });

  watch(getFiles, (val) => {
    props.context.node.input(val);
  });
});
</script>

<style lang="scss" scoped></style>
