<template>
  <div class="container bg-white h-full">This is for classes</div>
</template>

<script lang="ts" setup>
const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Classes", link: "/" },
  ],
});
</script>
