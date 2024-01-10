<template>
  <div class="px-5">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedSpace"
      #default="{ value }"
    >
      <div class="row">
        <div class="col-8">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            validation="required"
          />
        </div>
        <div class="col-4">
          <FormKit
            type="multiselect"
            label="Category id"
            name="category_id"
            openDirection="bottom"
            validation="required"
            :value="category?.id"
            :options="categories"
            :key="category?.id"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <FormKit
            type="textarea"
            name="description"
            label="Description"
            placeholder="Description"
            validation="required"
          />
        </div>
      </div>
      <div class="d-flex align-items-center-end gap-3 justify-content-end">
          <div class="d-flex align-items-center gap-2">
            <div class="">
             <p>Space Capacity</p> 
            </div>
              <div>
              <FormKit
              style="width: 50px;"
                type="text"
                name="capacity"
                label="Capacity"
                validation="required"
              />
            </div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <FormKit
              type="checkbox"
              name="virtual_room"
              label="Virtual Room"
              :value="false"
              v-model="enableVirtualRoom"
            />
            <FormKit
            style="width: 120px;"
              type="text"
              name="url"
              placeholder="Add Url"
              label="Url"
              :disabled="!enableVirtualRoom"
            />
          </div>
      
      </div>
      <div class="room-availabilty my-4">
        <h6 class="text-center">Availability</h6>
        <FormKit
          type="checkbox"
          name="follow_facility_timing"
          label="Follows Facility Timing"
          :value="value.follow_facility_timing"
        />
      </div>

      <div class="schedule-container" v-if="!value.follow_facility_timing">
        <div
          v-for="(day, index) in value.timings"
          :key="index"
          class="day-schedule"
        >
        <div style="width: 100px;">{{ day.day }}</div>
          <FormKit
            type="time"
            :placeholder="'From'"
            :ignore="true"
            v-model="value.timings[index].start_time"
            class="time-input"
          />
          <span>to</span>
          <FormKit
            type="time"
            :ignore="true"
            :placeholder="'To'"
            v-model="value.timings[index].end_time"
            class="time-input"
          />
        </div>
      </div>

      <div class="mt-4 d-flex justify-content-center">
        <FormKit type="submit">Submit</FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { removeObjectKeys } from "@/utils/dataCleaner";
import { defaultTiming } from "~/constants/common";
const { $toast } = useNuxtApp();
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  category: {
    tye: Object,
    default: () => {},
  },
  spaceData: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(["reload"]);
const enableVirtualRoom = ref(false);

const { currentUserType } = useAuthStore();

const computedSelectedSpace = computed(() => {
  const timing = props.spaceData?.timings?.filter(Boolean);
  return props.spaceData
    ? {
        ...props.spaceData,
        timings: timing && timing.length ? timing : defaultTiming(),
        follow_facility_timing:
          props.spaceData?.follow_facility_timing === "1" ||
          props.spaceData?.follow_facility_timing === "Yes"
            ? true
            : false,
        virtual_room: props.spaceData?.url ? true : false,
      }
    : { timings: defaultTiming() };
});

const addSpace = async (spaceData) => {
  try {
    const { data } = await useFetch("/api/space/add", {
      method: "POST",
      body: {
        ...spaceData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      $toast("Space added successfully!");
      emit("reload");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/space/add", err);
  }
};

const updateSpace = async (spaceData) => {
  try {
    const { data } = await useFetch("/api/space/edit", {
      method: "POST",
      body: {
        ...spaceData,
        facility_id: currentUserType?.id,
        room_id: computedSelectedSpace.value?.id,
        follow_facility_timing: spaceData.follow_facility_timing ? "Yes" : "No",
      },
    });
    if (data.value.return) {
      $toast("Space edited successfully!");
      emit("reload");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/space/edit", err);
  }
};

const submitHandler = async (spaceData) => {
  let tempData = { ...spaceData };
  if (!tempData.virtual_room) {
    tempData = removeObjectKeys(tempData, ["url"]);
  }
  tempData = removeObjectKeys(tempData, ["virtual_room", "updated_date"]);

  computedSelectedSpace.value?.id ? updateSpace(tempData) : addSpace(tempData);
};
</script>

<style lang="scss" scoped>
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
</style>