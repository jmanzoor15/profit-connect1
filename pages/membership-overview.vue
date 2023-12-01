<template> 
      <section class="content-section">
        <SidebarUpdateMember />

    <MembershipOverview />
  

</section>

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
  <style lang="scss" scoped>
  .content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
}

  </style>