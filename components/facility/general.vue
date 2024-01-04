<template>
  <FormKit type="form" submit-label="Update" @submit="submitHandler">
    <div class="content__title-box">
      <h1 class="content-title">General</h1>
    </div>
    <div class="general__settings">
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            v-model="form.allow_leads_to_register"
            name="allow_leads_to_register"
          />
        </div>
        <Span> Allow leads to register on the website or app</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            v-model="form.schedule_available_to_clients"
            name="schedule_available_to_clients"
          />
        </div>
        <Span> Schedule available to registered clients only</Span>
      </div>

      <div class="row">
        <div class="d-flex align-items-center gap-2">
          <Span class="mb-3"> Schedule displays</Span>
          <div class="col-1">
            <FormKit type="number" name="duration" />
          </div>
          <div class="col-3">
            <FormKit
              :classes="{
                outer: 'w-100',
              }"
              type="multiselect"
              name="period"
              mode="single"
              :options="periodType"
            />
          </div>
          <Span class="mb-3"> of past and available</Span>
        </div>
      </div>
    </div>

    <div class="booking__settings mt-4">
      <h2 class="content-title">Booking &amp; Cancellation</h2>

      <div class="row">
        <div class="d-flex align-items-center gap-2">
          <FormKit type="switch" name="is_public" v-model="isPublic" />
          <Span class="mb-3"> Booking closes</Span>
          <div class="col-1">
            <FormKit
              type="number"
              v-model="form.booking_close_no"
              name="booking_close_no"
            />
          </div>
          <div class="col-3">
            <FormKit
              :classes="{
                outer: 'w-100',
              }"
              type="multiselect"
              v-model="form.booking_close_period"
              name="booking_close_period"
              mode="single"
              :options="bookingPeriodType"
            />
          </div>
          <Span class="mb-3"> of past and available</Span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <FormKit type="switch" name="" />
          <Span class="mb-3"> Allow clients to bring</Span>
          <div class="col-1">
            <FormKit type="number" name="foc" v-model="form.foc" />
          </div>

          <Span class="mb-3"
            >Friends for FREE (one-time FOC per friend) at a time</Span
          >
        </div>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            v-model="form.schedule_available_to_clients"
            name="schedule_available_to_clients"
          />
        </div>
        <Span>Schedule available to registered clients only</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            name="is_public"
            @update:model-value="
              $emit('on-planstatus-change', {
                plan_id: id,
                private: `${isPublic ? 'Yes' : 'No'}`,
              })
            "
            v-model="isPublic"
          />
        </div>
        <Span>Late cancellations consume credits (for credit plans only)</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            name="is_public"
            @update:model-value="
              $emit('on-planstatus-change', {
                plan_id: id,
                private: `${isPublic ? 'Yes' : 'No'}`,
              })
            "
            v-model="isPublic"
          />
        </div>
        <Span> Late cancellation costs (for unlimited plans only)</Span>
      </div>
    </div>

    <div class="plans__settings">
      <h2 class="content-title">Plans &amp; Packages</h2>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit type="switch" v-model="form.allow_pause" />
        </div>
        <Span> Allow existing plans to be paused</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit type="switch" v-model="form.allow_renewal_inactive" />
        </div>
        <Span>Allow renewal of inactive plans</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            name="is_public"
            @update:model-value="
              $emit('on-planstatus-change', {
                plan_id: id,
                private: `${isPublic ? 'Yes' : 'No'}`,
              })
            "
            v-model="isPublic"
          />
        </div>
        <Span> Allow credit sharing between Friends</Span>
      </div>
      <div class="d-flex gap-2">
        <div class="col-">
          <FormKit
            type="switch"
            name="is_public"
            @update:model-value="
              $emit('on-planstatus-change', {
                plan_id: id,
                private: `${isPublic ? 'Yes' : 'No'}`,
              })
            "
            v-model="isPublic"
          />
        </div>
        <Span> Allow group/family plans</Span>
      </div>
    </div>
  </FormKit>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { periodType, planType, paymentCategory } from "@/constants/plan";

const { generalInfo } = defineProps({
  generalInfo: {
    type: Object,
    required: true,
  },
});

const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Facility", link: "/" },
  ],
});

const emit = defineEmits(["reload", "update:categoryData"]);
const memberInfoPending = ref(false);
const { currentUserType } = useAuthStore();
const facilityData = ref(null);
const isFeatured = ref(false);
// setBreadcrumbTab({
//   items: [
//     {
//       label: "General",
//       link: `/facility/general`,
//     },
//     { label: "Timing", link: `/members/${memberId.value}/timing` },
//     { label: "Staff", link: `/members/${memberId.value}/staff` },
//     { label: "Forms", link: `/members/${memberId.value}/forms` },
//     { label: "Payments", link: `/members/${memberId.value}/payments` },
//     { label: "Discount Codes", link: `/members/${memberId.value}/discount` },
//     { label: "Tax", link: `/members/${memberId.value}/tax` },
//     { label: "Activity", link: `/members/${memberId.value}/activity` },
//   ],
// });

const convertYesNoToBoolean = (key: string) => key === "Yes";
function convertBooleanToYesNo(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "boolean") {
      obj[key] = obj[key] ? "Yes" : "No";
    }
  }
  return obj;
}

const form = ref({
  allow_leads_to_register: convertYesNoToBoolean(
    generalInfo.allow_leads_to_register
  ),
  schedule_available_to_clients: convertYesNoToBoolean(
    generalInfo.schedule_available_to_clients
  ),
  allow_pause: convertYesNoToBoolean(generalInfo.allow_pause),
  allow_renewal_inactive: convertYesNoToBoolean(
    generalInfo.allow_renewal_inactive
  ),
  foc: generalInfo.foc,
  booking_close_period: generalInfo.booking_close_period,
  booking_close_no: generalInfo.booking_close_no,
});

const submitHandler = async () => {
  const payload = { facility_id: currentUserType?.id, ...form.value };
  convertBooleanToYesNo(payload);

  try {
    const { data } = await useFetch("/api/franchise/update-facility", {
      method: "POST",
      body: payload,
    });
    facilityData.value = data.value.facility;
    alert("Data updated");
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {
    memberInfoPending.value = false; // End loading
  }
};

const SelectFacility = async () => {
  try {
    const { data } = await useFetch("/api/franchise/current-facility", {
      method: "POST",
      body: {
        facility_id: currentUserType?.id,
      },
    });
    facilityData.value = data.value.facility;
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {
    memberInfoPending.value = false; // End loading
  }
};
const getGeneralData = computed(() => {
  if (
    facilityData?.value &&
    facilityData.value[0].general &&
    facilityData.value[0].general > 0
  ) {
    return facilityData.value[0].general;
  }
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
        facilityData.value = data;
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
element.style {
}

.content__title-box {
  margin-bottom: 20px;
}
.plans__settings {
  margin-top: 60px;
}
</style>
