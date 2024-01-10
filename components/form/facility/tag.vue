<template>
    <div class="px-5">
      <FormKit
        type="form"
        @submit="submitHandler"
        :actions="false"
        #default="abc"
      >
        <div class="d-flex align-items-start gap-3">
          <FormKit v-if="tagData" :value="tagData.id" type="hidden" name="id" />
  
          <FormKit
            type="text"
            name="name"
            placeholder="name"
            v-model="form.name"
            validation="required"
          />
          <FormKit
            type="text"
            name="description"
            placeholder="Description"
            v-model="form.description"
            :classes="{
              outer: 'flex-grow-1',
            }"
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
  import { useVModel } from "@vueuse/core";
  const { $toast } = useNuxtApp();
  const emit = defineEmits(["reload", "update:tagData"]);
  
  const props = defineProps({
    tagData: {
      type: Object,
      default: () => {},
    },
  });
  
  const defaultForm = () => ({ name: "", description: "" });
  const form = ref({
    ...defaultForm,
    ...(props.tagData || {}),
  });
  watch(
    () => props.tagData,
    (newValue) => {
      watch(
        () => props.tagData,
        (newValue) => {
          Object.assign(form, newValue || defaultForm());
        }
      );
    }
  );
  
  const { currentUserType, loggedUser } = useAuthStore();
  const selectedPackage = useVModel(props, "tagData", emit);
  
  const createTag = async (tagData) => {
    try {
      const { data } = await useFetch("/api/franchise/add-tag", {
        method: "POST",
        body: {
          ...form.value,
          facility_id: currentUserType?.id,
        },
      });
      $toast(data.value.message);
    } catch (err) {
      console.log("Error:/tags/create", err);
    }
  };
  
  const editTag = async (tagData) => {
    try {
      const { data } = await useFetch("/api/api/tags/create", {
        method: "POST",
        body: {
          ...form.value,
          facility_id: currentUserType?.id,
        },
      });
  
      $toast(data.value.message);
    } catch (err) {
      console.log("Error:/api/tag/update", err);
    }
  };
  
  const submitHandler = async () => {
    props.tagData && props.tagData.id ? editTag() : createTag();
  };
  </script>