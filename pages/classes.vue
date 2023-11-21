<template>
  <div class="container bg-white h-full">This is for classes</div>
</template>

<script lang="ts" setup>
const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Manage", link: "/" },
    { label: "Members", link: "/" },
  ],
});
</script>
