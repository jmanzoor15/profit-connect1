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
        />
        <FormKit
          type="date"
          label="End date"
          name="end_date"
          validation="required"
          help="End date"
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
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useVModel } from "@vueuse/core";

const emit = defineEmits(["reload", "update:categoryData"]);

const props = defineProps({
  packageData: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);

const createCategory = async (categoryData) => {
  try {
    const { data } = await useFetch("/api/package/add", {
      method: "POST",
      body: {
        ...categoryData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      alert("Package added successfully!");
    } else {
      alert(data.value.message);
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
      alert("Package edited successfully!");
    } else {
      alert(data.value.message);
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
