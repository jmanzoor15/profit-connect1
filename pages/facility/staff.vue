<template>
    <section class="content-section">
        <div v-if="showFacilityForm"> <FacilityAdd  /> </div>
         <div v-else><FacilityUpdate   /></div>
       
       
      <div class="content-box">
        <div class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Management & Staff</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showFacilityForm = !showFacilityForm"
          size="sm"
          label="New Staff"
        />
      </div>
         <FacilityStaff/>
      </div>
  
      
    </section>
  </template>
  
  <script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  const { setBreadcrumb } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Control Panel", link: "/" },
      { label: "Facilities", link: "/" },
    ],
  });
  
  const showFacilityForm = ref(false);
  const memberId = ref("");
  
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
  