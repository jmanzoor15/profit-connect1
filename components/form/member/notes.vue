<template>
    <div class="px-5">
      <FormKit
        type="form"
        :modelValue="selectedPackage"
        @submit="submitHandler"
        :actions="false"
      >
        <FormKit
          type="text"
          name="header"
          placeholder="Title"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          placeholder="Notes"
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
  
  const emit = defineEmits(["reload", "update:packageData"]);
  
  const props = defineProps({
    packageData: {
      type: Object,
      default: () => {},
    },
  });
  
  const { currentUserType } = useAuthStore();
  const selectedPackage = useVModel(props, "packageData", emit);
  
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
  