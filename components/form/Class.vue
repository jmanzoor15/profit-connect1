<template>
  <div class="px-5">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedClass"
      :key="computedSelectedClass?.id"
    >
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Name"
        validation="required"
      />
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-5">
              <MixInputBox title="Category">
                <FormKit
                  type="multiselect"
                  label="Category id"
                  name="category_id"
                  openDirection="bottom"
                  validation="required"
                  :value="category?.id"
                  :options="categories"
                  :key="category?.id"
              /></MixInputBox>
            </div>
            <div class="col-7">
              <MixInputBox title="Duration">
                <div class="row">
                  <div class="col-5">
                    <FormKit
                      type="number"
                      name="duration"
                      validation="required"
                    />
                  </div>
                  <div class="col-7">
                    <FormKit
                      type="multiselect"
                      label="Class"
                      class="w-75"
                      name="period"
                      openDirection="bottom"
                      validation="required"
                      :options="timeTypeSelect"
                    />
                  </div>
                </div>
              </MixInputBox>
            </div>
          </div>
        </div>
        <div class="col-6">
          <FormKit
            type="textarea"
            name="description"
            label="Description"
            placeholder="Description"
            validation="required"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <FormKit
            type="uppy"
            label="Upload Image or Video"
            name="image_video"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg and .png."
          />
        </div>
        <div class="col-6">
          <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg and .png."
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <FormKit
            name="type"
            type="radio"
            v-model="classType"
            :options="classOptions"
          />
        </div>
      </div>
      <div class="row" :key="['On-site', 'Online'].includes(classType)">
        <div class="col-6">
          <FormKit
            type="text"
            label="Location"
            name="location"
            placeholder="Location"
            :disabled="['On-site', 'Online'].includes(classType)"
          />
        </div>
        <div class="col-6">
          <FormKit
            type="text"
            label="Google Map Url"
            name="googlemaps"
            placeholder="Google Map Url"
            :disabled="['On-site', 'Online'].includes(classType)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <FormKit
            type="text"
            label="Url"
            name="url"
            placeholder="Url"
            :disabled="['On-site', 'Off-site'].includes(classType)"
            :key="['On-site', 'Off-site'].includes(classType)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="Available To"
            openDirection="top"
            placeholder="Available To"
            name="available_tags"
            mode="tags"
            v-model="availableTagsSelected"
            :options="availableTags"
          />
        </div>
        <div class="col-6">
          <FormKit
            type="multiselect"
            label="Except"
            placeholder="Except"
            name="except_tags"
            mode="tags"
            openDirection="top"
            :options="exceptTags"
            v-model="exceptTagsSelected"
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
import { classOptions, timeTypeSelect } from "@/constants/class";
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  category: {
    tye: Object,
    default: () => {},
  },
  classData: {
    type: Object,
    default: () => {},
  },
});

const selectedCategory = ref();
const emit = defineEmits(["reload"]);

const { currentUserType } = useAuthStore();
const classType = ref("On-site");
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);

const { tags } = storeToRefs(useTagStore());

const exceptTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            availableTagsSelected.value &&
            !availableTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const computedSelectedClass = computed(() => {
  return props.classData
    ? {
        ...props.classData,
        available_tags: props.classData.available_tags
          .filter((item) => item)
          .map((item) => item.id),
        except_tags: props.classData.except_tags
          .filter((item) => item)
          .map((item) => item.id),
      }
    : {};
});

const availableTags = computed(() => {
  return tags.value
    ? tags.value
        .filter(
          (item) =>
            exceptTagsSelected.value &&
            !exceptTagsSelected.value.includes(item.id.toString())
        )
        .map((item) => ({ label: item.name, value: item.id }))
    : [];
});

const submitHandler = async (classData) => {
  try {
    const { data } = await useFetch("/api/class/add", {
      method: "POST",
      body: {
        ...classData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      alert("Class added successfully!");
      emit("reload");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/class/add", err);
  }
};
</script>
<style lang="scss" scoped></style>
