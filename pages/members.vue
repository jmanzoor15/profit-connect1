<template>
  <!-- Content section -->
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <h1>Member Search</h1>

        <div class="content-filters">
          <!-- *********** Filters  *********** -->
          <FilterSort />
          <FilterStatus />
        </div>
      </div>
      <!-- *********** <Search>    *************** -->
      <SearchBar />
      <!-- *************  <list of members>  ****************** -->
      <ListMembers />
    </div>
    <SidebarMember />
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
/*****************************
 **** 1. Content section *****
 ****************************/

.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}

// .content {
//   &__title-box {
//     display: flex;
//     align-items: center;
//     margin-bottom: 30px;

//     h1 {
//       width: 250px;
//       font-size: 22px;
//       margin-bottom: 0;
//     }
//   }
// }


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
}

.content__title-box {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.content-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 50px;
}
</style>