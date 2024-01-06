<template>
  <TemplatesFacility>
    <!-- <button @click="SelectFacility('2')">select facility</button> -->
    <FacilityGeneral v-if="generalInfo" :general-info="generalInfo" />
  </TemplatesFacility>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

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
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {
    memberInfoPending.value = false; // End loading
  }
};

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
          body: { facility_id: facilityId },
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
