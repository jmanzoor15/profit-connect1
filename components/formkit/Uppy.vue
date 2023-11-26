<template>
  <ClientOnly>
    <Dashboard :uppy="uppy" :props="dataTemp" :plugins="['DragDrop']" />
  </ClientOnly>
</template>

<script setup>
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
// Don't forget the CSS: core and UI components + plugins you are using
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const props = defineProps({
  context: Object,
});

const values = ref(props.context._value);

const dataTemp = {
  inline: true,
  height: props.context.height ?? 200,
  width: "100%",
  maxHeight: props.context.heigh ?? 200,
  hideUploadButton: props.context.hideUploadButton ?? true,
  closeAfterFinish: false,
  showProgressDetails: true,
  proudlyDisplayPoweredByUppy: false,
  showRemoveButtonAfterComplete: true,
};

const uppy = ref();
onMounted(() => {
  uppy.value = new Uppy({
    debug: false,
    autoProceed: false,
    restrictions: {
      maxFileSize: props.context.maxFileSize ?? 1000000,
      maxNumberOfFiles: props.context.maxNumberOfFiles ?? 1,
      minNumberOfFiles: props.context.minNumberOfFiles ?? 0,
      allowedFileTypes: props.context.allowedFileTypes ?? [
        ".png",
        ".jpg",
        ".jpeg",
      ],
    },
    locale: {
      strings: {
        dropPasteFiles:
          `${props.context.label}%{browse}` ?? "Browse files%{browse}",
      },
    },
  });

  const getFiles = computed(() => {
    return uppy.value.getFiles();
  });

  watch(getFiles, (val) => {
    props.context.node.input(val);
  });
});
</script>
