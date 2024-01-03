<template>
    <section class="content-section">

        <FacilityUpdate   />
      <div class="content-box">
         <FacilityTiming  v-if="generalInfo" :general-info="generalInfo"  :general-timing="generalTiming"/>
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
  
  const facilityData = ref(null);
const memberInfoPending = ref(false);
const { currentUserType } = useAuthStore();


const SelectFacility = async (value) => {
  try {
    const { data } = await useFetch("/api/franchise/current-facility", {
      method: "POST",
      body: {
        facility_id: currentUserType?.id,
      },
    });
    facilityData.value = data;
  }catch (err) {
        console.error("Error fetching facility data:", err);
      } finally {
        memberInfoPending.value = false; // End loading
      }
};

const generalTiming = computed(() => {
  if (!facilityData.value) return null;
  return facilityData.value.value.facility[0].general[0].timings;
  
});
const generalInfo = computed(() => {
  if (!facilityData.value) return null;
  return facilityData.value.value.facility[0].general[0];
  
});

onMounted(SelectFacility);

// Watch for changes in the facility ID
watch(
  () => currentUserType.value?.id,
  async (facilityId) => {
    if (facilityId) {
      memberInfoPending.value = true;

      try {
        const { data } = await useFetch("/api/franchise/current-facility", {
          method: "POST",
          body:{ facility_id: facilityId },
        });
        facilityUpdateInfoData.value = data.value;
      } catch (err) {
        console.error("Error fetching facility data:", err);
      } finally {
        memberInfoPending.value = false; // End loading
      }
    }
  },
  { immediate: true }
);
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
  