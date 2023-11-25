<template>
  <div class="container bg-white h-full">
    <div class="p-5">
      <MixTab v-model="activeTab" :items="getCategories" />
      <MixNoData v-if="showNoDataMsg" />
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
          v-for="category in computedCategories"
          :key="category.id"
        >
          <CardClass v-bind="category" />
        </div>
      </div>
    </div>
    <Modal v-model="showClassForm">
      <template #title> Create a Class or Event </template>
      <FormClass/>
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

const { data, pending } = await useFetch("/api/class/categories", {
  query: { facility_id: currentUserType?.id },
});

const getCategories = computed(() => {
  return data.value && data.value.categories
    ? data.value.categories.map((item: ICategory) => item.name)
    : [];
});

const computedCategories = computed(() => {
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
    computedCategories.value &&
    !computedCategories.value.length &&
    !pending.value
  );
});
</script>
