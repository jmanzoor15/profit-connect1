<template>
  <div class="px-5 store-form">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedStore"
    >
      <div class="row">
        <div class="col-4">
          <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :hideUploadButton="true"
            help="Max image upload: 960x540px, 1MB, in .jpg and .png."
          />
        </div>
        <div class="col-8">
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
                placeholder="Category"
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
            validation="required"
            :classes="{
              input: 'description-height',
            }"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-4"></div>
        <div class="col-8 d-flex align-items-center justify-content-between">
          <FormKit
            type="number"
            outer-class="m-0"
            name="price"
            label="Price"
            placeholder="Price"
            validation="required"
          />
          <div class="d-flex align-items-center gap-4">
            <span> Can be paid with </span>
            <FormKit
              type="checkbox"
              name="pay_with_card"
              outer-class="m-0"
              label="card"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="pay_with_gift_card"
              label="gift card"
              :value="false"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex gap-4 align-items-center">
          <FormKit
            type="checkbox"
            outer-class="m-0"
            label="On Promotion for"
            :value="false"
            v-model="isPromotionPriceActive"
          />
          <FormKit
            type="number"
            outer-class="m-0"
            name="promotion_price"
            label="Promotion price"
            placeholder="Promotion price"
            :disabled="!isPromotionPriceActive"
          />
          <FormKit
            type="checkbox"
            outer-class="m-0"
            label="Display original price"
            name="display_original_price"
            :value="false"
          />
        </div>
        <div class="d-flex gap-2">
          <FormKit
            type="date"
            outer-class="m-0"
            label="Start date"
            name="promotion_start"
            help="Promotion start date"
          />
          <FormKit
            type="date"
            outer-class="m-0 date-width"
            label="Start date"
            placeholder="End date"
            name="promotion_end"
            help="Promotion end date"
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
import { useTagStore } from "@/store/tag";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";
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
  storeData: {
    type: Object,
    default: () => {},
  },
});

const selectedCategory = ref();
const emit = defineEmits(["reload"]);
const isPromotionPriceActive = ref(false);

const { currentUserType } = useAuthStore();
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

const computedSelectedStore = computed(() => {
  return props.storeData
    ? {
        ...props.storeData,
        available_tags: props.storeData.available_tags
          .filter((item) => item)
          .map((item) => item.id),
        except_tags: props.storeData.except_tags
          .filter((item) => item)
          .map((item) => item.id),
        display_original_price:
          props.storeData.display_original_price === "Yes" ? true : false,
        pay_with_gift_card:
          props.storeData.pay_with_gift_card === "Yes" ? true : false,
        pay_with_card: props.storeData.pay_with_card === "Yes" ? true : false,
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

const addStore = async (storeData) => {
  try {
    const { data } = await useFetch("/api/store/add", {
      method: "POST",
      body: {
        ...storeData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      alert("Store added successfully!");
      emit("reload");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/store/add", err);
  }
};

const updateStore = async (storeData) => {
  try {
    const { data } = await useFetch("/api/store/edit", {
      method: "POST",
      body: {
        ...storeData,
        facility_id: currentUserType?.id,
        store_item_id: computedSelectedStore.value?.id,
      },
    });
    if (data.value.return) {
      alert("Store edited successfully!");
      emit("reload");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/store/edit", err);
  }
};

const submitHandler = async (storeData) => {
  const data = {
    ...storeData,
    display_original_price: storeData.display_original_price ? "Yes" : "No",
    pay_with_gift_card: storeData.pay_with_gift_card ? "Yes" : "No",
    pay_with_card: storeData.pay_with_card ? "Yes" : "No",
  };
  computedSelectedStore.value?.id ? updateStore(data) : addStore(data);
};
</script>
<style lang="scss">
.store-form {
  .description-height {
    height: 10em !important;
  }
}
</style>
