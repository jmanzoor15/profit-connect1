<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="d-flex gap-2">
        <FormKit
          type="date"
          label="Start date"
          name="start_date"
          validation="required"
          help="Start date"
          v-model="startDate"
        />
        <FormKit
          type="date"
          label="End date"
          name="end_date"
          help="End date"
          :validation="`required|date_after:${startDate}`"
        />
      </div>
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Name"
        validation="required"
      />
      <FormKit
        type="textarea"
        name="description"
        label="Description"
        placeholder="Description"
      />
      <div class="mt-4 d-flex justify-content-center">
        <FormKit type="submit">Submit</FormKit>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useVModel } from "@vueuse/core";
const { $toast } = useNuxtApp();

const emit = defineEmits(["reload", "update:packageData"]);

const props = defineProps({
  packageData: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);
const startDate = ref(selectedPackage.value?.start_date);

const createCategory = async (packageData) => {
  try {
    const { data } = await useFetch("/api/package/add", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast.success("Package added successfully!");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

const editCategory = async (packageData) => {
  try {
    const { data } = await useFetch("/api/package/update", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast.success("Package edited successfully!");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/update", err);
  }
};

const submitHandler = async (packageData) => {
  packageData.package_id
    ? editCategory(packageData)
    : createCategory(packageData);
};
</script>
