<template>
    <section class="content-section">

        <FacilityUpdate   />
      <div class="content-box">
         <FacilityGeneral />
      </div>
  
      
    </section>
  </template>
  
  <script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  
 
  // const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
  // setBreadcrumb({
  //   items: [
  //     { label: "Control Panel", link: "/" },
  //     { label: "Facility", link: "/" },
  //   ],
  // });
  // setBreadcrumbTab({
  //   items: [
  //     {
  //       // label: "General",
  //       link: `/facility`,
  //     },
  //     { label: "Timing", link: `/facility/timing` },
  //     { label: "Staff", link: `/facility/staff` },
  //     { label: "Forms", link: `/facility/forms` },
  //     { label: "Payments", link: `/facility/payments` },
  //     { label: "Discount Codes", link: `/facility/discount` },
  //     { label: "Tax", link: `/facility/tax` },
  //     { label: "Activity", link: `/facility/activity` },
  //   ],
  // });
  
  const { currentUserType } = useAuthStore();
  
  const {
    data: membersData,
    pending: membersPending,
    refresh: refreshMembers,
  } = await useFetch("/api/member/all", {
    query: { facility_id: currentUserType?.id },
  });

  
  const getMembers = computed(() => {
    return membersData.value && membersData.value.members
      ? membersData.value.members
      : [];
  });
  
  const refreshData = () => {
    refreshMembers();
  };
  </script>
  
  <style lang="scss" scoped>
  .content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
  }
  
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
  