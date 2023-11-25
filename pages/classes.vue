<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <MixTab v-model="activeTab" :items="items" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const { setBreadcrumb } = useBreadcrumb();
const items = [
  "Shake",
  "Shape",
  "Pilates new 1q",
  "Stallion",
  "COMBAT",
  "STRENGTH",
];
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Classes", link: "/" },
  ],
});
const activeTab = ref(0);
</script>
