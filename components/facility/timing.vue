<template>
  <h3 class="mt-2">Facility Timing</h3>
  <div class="facility"> 
    <FormKit
      type="form"
      :modelValue="selectedPlan"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="general-timimg">
        <FormKit
          type="checkbox"
          name="always_open"
          outer-class="m-10"
          label="Always Open"
          v-model="form.always_open"
        />
      </div>
      <div class="schedule-container" v-if="!form.always_open">
        <div
          v-for="(day, index) in form.generalTiming"
          :key="index"
          class="day-schedule"
        > 
        <div style="width: 80px;">
          <p>{{ day.day }}</p>
        </div>
       
          <FormKit
            type="time"
            :placeholder="'From'"
            v-model="day.start_time"
            class="time-input"
          />
          <span>to</span>
          <FormKit
            type="time"
            :placeholder="'To'"
            v-model="day.end_time"
            class="time-input"
          />
          <div>
            <p
            ref="error"
            v-if="day.start_time > day.end_time"
            class="custom-formkit-message"
          >
            End time should be more than start time
          </p>
          </div>
          
        </div>
       
      </div>
      <div class="mt-4 d-flex justify-content-center">
        <FormKit type="submit">Submit</FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const { $toast } = useNuxtApp();
const { generalInfo, generalTiming } = defineProps({
  generalInfo: {
    type: Object,
    default: () => {},
  },
  generalTiming: {
    type: Array,
    default: () => [],
  },
});
const { currentUserType } = useAuthStore();

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
  always_open: convertYesNoToBoolean(generalInfo.always_open),
  generalTiming: [...generalTiming],
});

const submitHandler = async () => {
  const payload = {
    facility_id: currentUserType?.id,
    always_open: form.value.always_open,
    timings: form.value.generalTiming,
  };
  convertBooleanToYesNo(payload);

  try {
    const { data } = await useFetch("/api/franchise/update-facility", {
      method: "POST",
      body: payload,
    });
    $toast(data.value.message);
  } catch (err) {
    console.error("Error fetching facility data:", err);
  } finally {

  }
};

// Add additional logic as needed
</script>

<style scoped>
.general-timimg {
  margin-top: 40px;
  margin-bottom: 60px;
}
.schedule-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.day-schedule {
  display: flex;
  align-items: center;
  gap: 10px;
}

.day-checked label {
  color: #007bff; /* Bootstrap primary color */
}

.time-input {
  width: 100px;
  border: 1px solid #dee2e6; /* Bootstrap light grey border */
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}
.custom-formkit-message {
  color: red;
  font-size: 14px;
  margin-bottom: 0px;
  margin-top: -10px;
}
/* You will need to adjust the colors and sizes to match your design exactly */
</style>