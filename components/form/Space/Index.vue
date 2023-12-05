<template>
  <div class="px-5">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedSpace"
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
      <div class="row justify-content-end">
        <div class="col-8 row">
          <div class="col-6 d-flex align-items-center">
            <div style="padding-bottom: 16px; padding-right: 4px">
              Space Capacity
            </div>
            <div style="width: 68px">
              <FormKit
                type="number"
                name="capacity"
                label="Capacity"
                validation="required"
              />
            </div>
          </div>
          <div class="col-6">
            <FormKit
              type="checkbox"
              name="virtual_room"
              label="Virtual Room"
              :value="false"
              v-model="enableVirtualRoom"
            />
            <FormKit
              type="text"
              name="url"
              placeholder="Url"
              label="Url"
              :value="false"
              :disabled="!enableVirtualRoom"
            />
          </div>
        </div>
      </div>
      <div class="room-availabilty my-4">
        <h6 class="text-center">Availability</h6>
        <FormKit
          type="checkbox"
          name="follow_facility_timing"
          label="Follows Facility Timing"
          :value="false"
        />
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
  return props.spaceData
    ? {
        ...props.spaceData,
        timings: props.spaceData?.timings?.filter((item) => item),
        follow_facility_timing:
          props.spaceData?.follow_facility_timing === "1" ? true : false,
        virtual_room: props.spaceData?.url ? true : false,
      }
    : {};
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
      alert("Space added successfully!");
      emit("reload");
    } else {
      alert(data.value.message);
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
      },
    });
    if (data.value.return) {
      alert("Space edited successfully!");
      emit("reload");
    } else {
      alert(data.value.message);
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

<style lang="scss" scoped></style>
