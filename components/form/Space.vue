<template>
    <div class="px-5">
      <FormKit
        type="form"
        @submit="submitHandler"
        :actions="false"
        :modelValue="computedSelectedClass"
        :key="computedSelectedClass?.id"
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
              <FormKit
              type="textarea"
              name="description"
              label="Description"
              placeholder="Description"
            />
            <div>
                <div class="d-flex flex-row justify-content-end align-items-center"> 
                <label class="checkbox-container ">
                Space Capacity
                </label>
            <div class="capacity">
            <FormKit
          type="text"
          label="capacity"
          name="capacity"
          placeholder="00"
          validation="required"
        />
        </div>
            <FormKit
              name="type"
              type="radio"
              v-model="classType"
            />
        <label class="checkbox-container ">
          Virtual Room
        </label>
        <div class="col-2 ">
        <FormKit
          type="text"
          label="Add url"
          name="Add url"
          placeholder="Add url"
         :disabled="isUrlInputDisabled"
        />
      </div>
    </div>
    </div>
    <div class="mt-4 d-flex flex-column justify-content-center align-items-center">
            <h4>Availablity</h4>
        </div>
    <div class="d-flex">
        <FormKit
              name="type"
              type="radio"
              v-model="UrlType"
            />
            <label class="">
                Follows Facility Timing
        </label>
    </div>
       
    <div class="mt-4 d-flex flex-column justify-content-center align-items-center">
            <div class="col-6">
                <FormKit type="submit">Save</FormKit>
            </div>
            <p class="mt-4">Cancel</p>
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

  import { ref, computed } from 'vue';

  const UrlType = ref(null);

const isUrlInputDisabled = computed(() => {
  // Adjust the condition based on your specific requirement
  return UrlType.value !== 'desiredValue';
});
  
  const selectedCategory = ref();
  const emits = defineEmits(["reload"]);
  
  const { currentUserType } = useAuthStore();
  const classType = ref("On-site");

  const submitHandler = async (classData) => {
    try {
      const { data } = await useFetch("/api/space/add", {
        method: "POST",
        body: {
          ...classData,
          facility_id: currentUserType?.id,
        },
      });
      if (data.success) {
        emits("reload");
        alert("spaceadded successfully!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log("Error:/api/space/add", err);
    }
  };
  </script>
  
  <style lang="scss" scoped>
 .virtual-room {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}
.checkbox-container {
    // display: flex;
    // align-items: center;
    // cursor: pointer;
    margin-bottom: 13px;
    margin-right: 10px;
}
.capacity{
 margin: 0px 10px 0px 2px; 
 width: 40px;  
}

</style>
  