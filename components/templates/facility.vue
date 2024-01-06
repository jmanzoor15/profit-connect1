<template>
  <section class="content-section">
    <div v-if="showFacilityForm"><FacilityAdd /></div>
    <div v-else><FacilityUpdate /></div>

    <div class="content-box">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const showFacilityForm = ref(false);
</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}

.content-box {
  position: relative;
  width: 70vw;
  max-width: 950px;
  margin: unset;
  height: fit-content;
  min-height: calc(100vh - 129px);
  margin-bottom: 50px;
}
</style>
