<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-4">
          <h1 style="font-size: 22px; margin-bottom: 0px">Store</h1>
          <MixButton
            style="background-color: #f2faff"
            @click="showSpaceForm = true"
            size="sm"
            label="New Item"
          />
        </div>
        <SearchBar />
      </div>
      <div class="d-flex align-items-baseline">
        <MixTab
          v-model="activeTab"
          :items="getCategories"
          @edit="onSelectCategory"
        />
        <MixButton
          @click="showCatrgoryForm = true"
          size="sm"
          label="Add category"
        />
      </div>
      <!-- <div class="row g-3">
        <div
          class="col-6 col-lg-3"
          v-for="space in computedSpaces"
          :key="space.id"
        >
          <CardSpace v-bind="space" @click="onSpaceSelect(space.id)" />
        </div>
      </div> -->
    </div>
    <!-- <Modal v-model="showSpaceForm" id="space-modal">
      <template #title>
        {{ selectedSpace ? "Update" : "Create" }} Space
      </template>
      <FormSpace
        :categories="getCategorOptions"
        @reload="refreshData"
        :category="getCurrentCategory"
        :space-data="selectedSpace"
        v-if="showSpaceForm"
      />
    </Modal> -->
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedCategory ? "Update" : "Create" }} a Category
      </template>
      <FormStoreCategory
        v-if="showCatrgoryForm"
        v-model:category-data="selectedCategory"
        @reload="refreshData"
        :categories="computedCategories"
      />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Manage", link: "/" },
    { label: "Store", link: "/" },
  ],
});

const activeTab = ref(0);
const { currentUserType } =  useAuthStore();
const showSpaceForm = ref(false);
const selectedSpace = ref();
const selectedCategory = ref();
const showCatrgoryForm = ref(false);

const { data, pending, refresh } = await useFetch("/api/store/items", {
  query: { facility_id: currentUserType?.id, category: "All", status: "All" },
});

const refreshData = () => {
  refresh();
};

const getCategorOptions = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
    : [];
});

const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: any) => item.name)
    : [];
});

// const computedSpaces = computed(() => {
//   return data.value && data.value.categories && data.value.categories.length
//     ? data.value.categories[activeTab.value].room
//         .filter((item: any) => item)
//         .map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           capacity: item.capacity,
//           description: item.description,
//         }))
//     : [];
// });

const computedCategories = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories.map((item: any) => ({
        name: item.name,
        description: item.description,
        category_id: item.id,
      }))
    : [];
});

const getCurrentCategory = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value]
    : null;
});

// const onSpaceSelect = (space_id: number) => {
//   selectedSpace.value =
//     data.value && data.value.categories && data.value.categories.length
//       ? data.value.categories[activeTab.value].room.find(
//           (item: any) => item && item.id === space_id.toString()
//         )
//       : null;
//   showSpaceForm.value = true;
// };

const onSelectCategory = (tab: number) => {
  selectedCategory.value =
    data.value && data.value.categories && data.value.categories.length
      ? {
          name: data.value.categories[tab].name,
          description: data.value.categories[tab].description,
          category_id: data.value.categories[tab].id,
        }
      : null;
  showCatrgoryForm.value = true;
};

// watch(showSpaceForm, (val) => {
//   if (!val) {
//     selectedSpace.value = null;
//   }
// });

watch(showCatrgoryForm, (val) => {
  if (!val) {
    selectedCategory.value = null;
  }
});
</script>
