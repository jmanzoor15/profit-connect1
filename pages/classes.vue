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
        @click="showClassForm = true"
        size="lg"
        label="New Class"
        v-if="showNoDataMsg"
      />

      <div class="row g-3" v-else>
        <div
          class="col-6 col-lg-4 d-flex justify-content-center align-item-center"
        >
          <MixButton
            @click="showClassForm = true"
            size="lg"
            label="New Class"
          />
        </div>
        <div
          class="col-6 col-lg-4"
          v-for="category in computedClasses"
          :key="category.id"
        >
          <CardClass v-bind="category" @click="onClassSelect(category.id)" />
        </div>
      </div>
    </div>
    <Modal v-model="showClassForm" id="class-modal">
      <template #title> Create a Class or Event </template>
      <FormClass
        :categories="getCategorOptions"
        @reload="refresh"
        :category="getCurrentCategory"
        :class-data="selectedClass"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title> Create a Category </template>
      <FormCategory />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { ICategory, IClass } from "@/types/api/class/category";

const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Classes", link: "/" },
  ],
});
const activeTab = ref(0);
const { currentUserType } = useAuthStore();
const showClassForm = ref(false);
const selectedClass = ref();
const showCatrgoryForm = ref(false);

const { data, pending, refresh } = await useFetch("/api/class/categories", {
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

const computedClasses = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value].class
        .filter((item: IClass) => item)
        .map((item: IClass) => ({
          id: item.id,
          name: item.name,
          image: item.img_src,
          duration: item.duration,
          description: item.description,
          period: item.period,
        }))
    : null;
});

const showNoDataMsg = computed(() => {
  return (
    computedClasses.value && !computedClasses.value.length && !pending.value
  );
});

const getCurrentCategory = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories[activeTab.value]
    : null;
});

const onClassSelect = (class_id: number) => {
  selectedClass.value =
    data.value && data.value.categories && data.value.categories.length
      ? data.value.categories[activeTab.value].class.find(
          (item: IClass) => item && item.id === class_id.toString()
        )
      : null;
  showClassForm.value = true;
};

watch(showClassForm, (val) => {
  if (!val) {
    selectedClass.value = null;
  }
});
</script>
