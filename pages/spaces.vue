<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <div class="d-flex align-items-baseline">
        <MixTab v-model="activeTab" :items="getCategories" />

        <MixButton
          @click="showCatrgoryForm = true"
          size="sm"
          label="New Category"
          style="width: 328px"
        />
      </div>

      <MixButton
        @click="showSpaceForm = true"
        size="lg"
        label="New Class"
        v-if="showNoDataMsg"
      />

      <div class="row g-3" v-else>
        <div
          class="col-6 col-lg-4 d-flex justify-content-center align-item-center"
        >
          <MixButton
            @click="showSpaceForm = true"
            size="lg"
            label="New Space"
          />
        </div>
        <div
          class="col-6 col-lg-4"
          v-for="category in computedSpaces"
          :key="category.id"
        >
          <CardSpace v-bind="category" @click="onSpaceSelect(category.id)" />
        </div>
      </div>
    </div>
    <Modal v-model="showSpaceForm" id="class-modal">
      <template #title> Create a Space</template>
      <FormSpace
        :categories="getCategorOptions"
        @reload="refresh"
        :category="getCurrentCategory"
        :class-data="selectedSpace"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title> Create a Category </template>
      <FormSpaceCategory/>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { ICategory, ISpace } from "@/types/api/space/category";

const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Spaces", link: "/" },
  ],
});
const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const showSpaceForm = ref(false);
const selectedSpace = ref();
const showCatrgoryForm = ref(false);

const { data, pending, refresh } = await useFetch("/api/space/categories", {
  query: { facility_id: currentUserType?.id },
  
});

const getCategorOptions = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: ICategory) => ({
        label: item.name,
        value: item.id,
      }))
    : [];
});

const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: ICategory) => item.name)
    : [];
});

const computedSpaces = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value].room
        .filter((item: ISpace) => item)
        .map((item: ISpace) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          capacity:item.capacity,
        }))
    : null;
});

const showNoDataMsg = computed(() => {
  return (
    computedSpaces.value && !computedSpaces.value.length && !pending.value
  );
});

const getCurrentCategory = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value]
    : null;
});

const onSpaceSelect = (class_id: number) => {
  selectedSpace.value =
    data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value].class.find(
          (item: ISpace) => item && item.id === class_id.toString()
        )
      : null;
      showSpaceForm.value = true;
};

watch(showSpaceForm, (val) => {
  if (!val) {
    selectedSpace.value = null;
  }
});
</script>

  