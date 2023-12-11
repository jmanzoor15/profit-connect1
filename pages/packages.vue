<template>
  <div class="container bg-white h-full p-4">
    <div class="content__title-box">
      <div class="content-left">
        <div>
          <h1>Membership Packages</h1>
        </div>
        <div
          class="addNewBtn addNewPackage createRow"
          @click="showCatrgoryForm = true"
        >
          <div class="plus">+</div>
          <div class="text-add">Add a Package</div>
        </div>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
    <div class="content-filters">
      <FilterSort />
      <MixBtnGroup
        v-model="currentFilter"
        :labels="['All', 'Active', 'Inactive']"
      />
    </div>
    <ListPackages :packages="data.packages" />

    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title> Create a Package </template>
      <FormPackage v-if="showCatrgoryForm" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

const { setBreadcrumb } = useBreadcrumb();
const { currentUserType } = useAuthStore();
const showCatrgoryForm = ref(false);
const currentFilter = ref(1);
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Membership", link: "/" },
  ],
});

const { data, pending, refresh } = await useFetch("/api/package/packages", {
  query: { facility_id: currentUserType?.id },
});
</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}
.content-box {
  position: relative;
  width: 70vw;
  max-width: 1396px;
  margin: unset;
  height: fit-content;
}

.content__title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.content-left {
  display: flex;
  align-items: center;
}

.content-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}
.content__title-box .addNewBtn {
  width: 150px;
  height: 40px;
  margin-top: 0;
  margin-left: 15px;
}

.content__title-box .addNewBtn {
  width: 150px;
  height: 40px;
  margin-top: 0;
  margin-left: 15px;
}
.addNewBtn .plus {
  border: 1px solid #84ceff;
  width: 14px;
  height: 14px;
  color: #84ceff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.addNewBtn {
  display: flex;
  background: #f2faff;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  cursor: pointer;
  margin-right: 12px;
  transition: 0.35s;
}
.addNewBtn .text-add {
  margin-left: 5px;
}
</style>
