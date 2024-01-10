<template>
  <div class="px-5">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <FormKit
        type="text"
        name="heading"
        placeholder="Title"
        validation="required"
      />
      <FormKit type="textarea" name="description" placeholder="Notes" />

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
  getCurrentMemberInfo: {
    type: Object,
    default: () => {},
  },
  loggedUser: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPackage = useVModel(props, "packageData", emit);

const createNote = async (packageData) => {
  try {
    const { data } = await useFetch("/api/member/add-note", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: currentUserType?.id,
        member_id: props.getCurrentMemberInfo.id,
        user_id: props.loggedUser.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast(data.value.message);
      emit("update:modelValue", false);
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};



const submitHandler = async (packageData) => {
  packageData.package_id ? editNote(packageData) : createNote(packageData);
};
</script>
