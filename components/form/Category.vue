<template>
  <div class="px-5">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <div class="row mt-4">
        <div class="col-6">
          <FormKit
            type="uppy"
            label="Upload Image or Video"
            name="image"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg and .png."
          />
        </div>
        <div class="col-6">
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
        </div>
      </div>

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

const emit = defineEmits(["reload"]);

const { currentUserType } = useAuthStore();

const submitHandler = async (categoryData) => {
  try {
    const { data } = await useFetch("/api/class/add-category", {
      method: "POST",
      body: {
        ...categoryData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      alert("Category added successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/class/add", err);
  }
};
</script>
<style lang="scss" scoped></style>
