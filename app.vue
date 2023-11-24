<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useFranchiseStore } from "@/store/franchise";

const { getAllFranchises } = useFranchiseStore();

// here declare all function/ codes which are need to called at client side initally
const loadInitialClientOnlyData = async () => {
  await getAllFranchises();
};

onMounted(() => {
  loadInitialClientOnlyData();
});
</script>
