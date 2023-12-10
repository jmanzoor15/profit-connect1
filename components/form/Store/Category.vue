<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedCategory"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="row mt-4">
        <div class="col-6">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Name"
            validation="required"
          />
        </div>
        <div class="col-6">
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
    <div class="saved-category my-4" v-if="selectedCategory">
      <h5 class="text-center mb-3">Saved Categories</h5>
      <div class="row g-3">
        <div
          v-for="category in categories"
          :key="category.category_id"
          class="col-4 saved-category-card"
        >
          <CardEdit
            @edit="onCategorySelect(category)"
            :active="category.category_id === selectedCategory?.category_id"
          >
            <h6>
              {{ category.name }}
            </h6>

            <p class="mt-2">
              {{ category.description }}
            </p>
          </CardEdit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import { useVModel } from "@vueuse/core";

const emit = defineEmits(["reload", "update:categoryData"]);

const props = defineProps({
  categoryData: {
    type: Object,
    default: () => {},
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const { currentUserType } = useAuthStore();
const selectedCategory = useVModel(props, "categoryData", emit);

const createCategory = async (categoryData) => {
  try {
    const { data } = await useFetch("/api/store/add-category", {
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
    console.log("Error:/api/store/add-category", err);
  }
};

const editCategory = async (categoryData) => {
  try {
    const { data } = await useFetch("/api/store/update-category", {
      method: "POST",
      body: {
        ...categoryData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      emit("reload");
      alert("Category edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/store/update-category", err);
  }
};

const onCategorySelect = (category) => {
  console.log(category);
  selectedCategory.value = category;
};

const submitHandler = async (categoryData) => {
  categoryData.category_id
    ? editCategory(categoryData)
    : createCategory(categoryData);
};
</script>
<style lang="scss" scoped>
.saved-category-card {
  > div {
    min-height: 148px;
  }
  h6 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
