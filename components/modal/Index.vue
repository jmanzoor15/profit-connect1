<template>
  <Teleport to="body">
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasModal"
        aria-labelledby="offcanvasModalLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasModalLabel">
            <slot name="title"></slot>
          </h5>
        </div>
        <div class="offcanvas-body">
          <slot />
        </div>
      </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);
const show = useVModel(props, "modelValue", emit);
const showModal = ref();

watch(show, (val) => {
  if (val) {
    showModal.value.show();
  } else {
    showModal.value.hide();
  }
});

onMounted(() => {
  const { $bootstrap } = useNuxtApp();
  const bsOffcanvas = new $bootstrap.Offcanvas("#offcanvasModal");
  showModal.value = bsOffcanvas;
});
</script>
