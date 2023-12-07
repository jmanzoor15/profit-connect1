<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <div class="d-flex align-items-center gap-3"> 
    <h1 style="font-size: 22px; margin-bottom: 0px;">Classes</h1>
        <MixButton style="background-color: #f2faff; ;"
          @click="showClassForm = true"
          size="sm"
          label="New Class"
        />
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
          label="New Category"
        />
      </div>
      <div class="row g-3">
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
      <template #title>
        {{ selectedClass ? "Update" : "Create" }} a Class or Event
      </template>
      <FormClass
        :categories="getCategorOptions"
        @reload="refreshData"
        :category="getCurrentCategory"
        :class-data="selectedClass"
        v-if="showClassForm"
      />
    </Modal>
    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedCategory ? "Update" : "Create" }} a Category
      </template>
      <FormClassCategory
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
const selectedCategory = ref();
const showCatrgoryForm = ref(false);

const { data, pending, refresh } = await useFetch("/api/class/categories", {
  query: { facility_id: currentUserType?.id },
});

const refreshData = () => {
  refresh();
};

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
    : [];
});

const computedCategories = computed(() => {
  return data.value && data.value.categories && data.value.categories.length
    ? data.value.categories.map((item: any) => ({
        name: item.name,
        description: item.description,
        image: item.img_src,
        category_id: item.id,
      }))
    : [];
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

const onSelectCategory = (tab: number) => {
  selectedCategory.value =
    data.value && data.value.categories && data.value.categories.length
      ? {
          name: data.value.categories[tab].name,
          description: data.value.categories[tab].description,
          image: data.value.categories[tab].img_src,
          category_id: data.value.categories[tab].id,
        }
      : null;
  showCatrgoryForm.value = true;
};

watch(showClassForm, (val) => {
  if (!val) {
    selectedClass.value = null;
  }
});

watch(showCatrgoryForm, (val) => {
  if (!val) {
    selectedCategory.value = null;
  }
});
</script>
