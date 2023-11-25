<template>
  <Teleport to="body">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasModal"
      aria-labelledby="offcanvasModalLabel"
    >
      <div class="offcanvas-header" v-if="$slots.title">
        <h4
          class="offcanvas-title flex-fill text-center"
          id="offcanvasModalLabel"
        >
          <slot name="title"></slot>
        </h4>
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

  const offcanvas = document.getElementById("offcanvasModal");
  if (offcanvas)
    offcanvas.addEventListener("hidden.bs.offcanvas", (event) => {
      show.value = false;
    });
});
</script>

<style lang="scss" scoped>
.offcanvas {
  width: 954px !important;
  background: #ffffff;
  border-radius: 25px 0px 0px 25px;
  @media (max-width: 1200px) {
    width: 90% !important;
  }
}
.offcanvas-header {
  padding: 24px var(--bs-offcanvas-padding-x);
}
</style>
