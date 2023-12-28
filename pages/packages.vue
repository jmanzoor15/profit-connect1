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
        <SearchBar @on-search="onSearch" />
      </div>
    </div>
    <div class="content-filters">
      <MixToggleBtn v-model="sortingOrder" left="A-Z" right="Z-A" />
      <MixBtnGroup
        v-model="currentFilter"
        :labels="['All', 'Active', 'Inactive']"
      />
    </div>
    <ListPackages
      :packages="computedData"
      @onPackageSelect="onPackageSelect"
      @onChangePackageStatus="onChangePackageStatus"
      @onPlanstatusChange="onPlanstatusChange"
      @onAddPlan="onAddPlan"
      @onFeaturedChange="onFeaturedChange"
      @onPlanSelect="onPlanSelect"
    />

    <Modal v-model="showCatrgoryForm" id="category-modal">
      <template #title>
        {{ selectedPackage ? "Update" : "Create" }} a Package
      </template>
      <FormPackage
        v-if="showCatrgoryForm"
        v-model:packageData="selectedPackage"
        @reload="refresh"
      />
    </Modal>
    <Modal v-model="showPlanForm" id="plan-modal">
      <template #title>
        {{ selectedPlan ? "Update" : "Create" }} a Plan
        <h5 class="text-center mt-2">
          {{ selectedPackageForPlan?.package_name }}
        </h5>
      </template>
      <FormPackagePlan
        v-if="showPlanForm"
        v-model:planData="selectedPlan"
        :selectedPackage="selectedPackageForPlan"
        @reload="refresh"
        :accessData="accessData ?? {}"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { stringToBoolean } from "@/utils/booleanConverter";

const { setBreadcrumb } = useBreadcrumb();
const { currentUserType } = useAuthStore();
const showCatrgoryForm = ref(false);
const currentFilter = ref(1);
const sortingOrder = ref("A-Z");
const selectedPackage = ref();
const showPlanForm = ref(false);
const selectedPlan = ref();
const selectedPackageForPlan = ref();
const searchTerm = ref();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Membership", link: "/" },
  ],
});

const { data, pending, refresh } = await useFetch("/api/package/packages", {
  query: { facility_id: currentUserType?.id },
});
const { data: accessData } = await useFetch("/api/package/access", {
  query: { facility_id: currentUserType?.id },
});

const filterPackages = (data: any) => {
  switch (currentFilter.value) {
    case 1:
      return data;
    case 2:
      return data.filter((item: any) => item.status === "Active");
    case 3:
      return data.filter((item: any) => item.status === "Inactive");
    default:
      return data;
  }
};

const onPackageSelect = (data: any) => {
  selectedPackage.value = {
    name: data.name,
    description: data.description,
    start_date: data.start_date,
    end_date: data.end_date,
    package_id: data.id,
  };
  showCatrgoryForm.value = true;
};

const onChangePackageStatus = async (selectedPackage: any) => {
  try {
    const { data } = await useFetch("/api/package/packagestatus", {
      method: "POST",
      body: {
        package_id: selectedPackage.id,
        facility_id: currentUserType?.id,
        status: selectedPackage.status,
      },
    });
    if (data.value.return) {
      refresh();
      alert("Package status edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/packagestatus", err);
  }
};

const computedData = computed(() => {
  const newData: any = searchTerm.value
    ? data.value.packages.filter((a: any) => a.name.includes(searchTerm.value))
    : data.value.packages;
  if (sortingOrder.value === "A-Z") {
    return filterPackages(newData);
  } else {
    return filterPackages(
      useOrderBy(newData, [(item) => item.name.toLowerCase()], ["desc"])
    );
  }
});

const onPlanstatusChange = async (newData: any) => {
  try {
    const { data } = await useFetch("/api/package/planstatus", {
      method: "POST",
      body: {
        ...newData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      refresh();
      alert("Plan status edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/planstatus", err);
  }
};

const onFeaturedChange = async (newData: any) => {
  try {
    const { data } = await useFetch("/api/package/planfeatured", {
      method: "POST",
      body: {
        ...newData,
        facility_id: currentUserType?.id,
      },
    });
    if (data.value.return) {
      refresh();
      alert("Plan featured status edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/planfeatured", err);
  }
};

// for the plan
const onAddPlan = (data: any) => {
  console.log(data, "data");
  selectedPackageForPlan.value = data;
  showPlanForm.value = true;
};

const onPlanSelect = (plan: any) => {
  selectedPlan.value = {
    ...plan,
    private: stringToBoolean(plan.private),
    pay_with_card: stringToBoolean(plan.pay_with_card),
    pay_with_gift_card: stringToBoolean(plan.pay_with_gift_card),
    charge_on_first: stringToBoolean(plan.charge_on_first),
    auto_renew: stringToBoolean(plan.auto_renew),
    first_class_free: stringToBoolean(plan.first_class_free),
    display_original_price: stringToBoolean(plan.display_original_price),
    featured: stringToBoolean(plan.featured),
    plan_id: plan.id,
  };
  showPlanForm.value = true;
};
const onSearch = (data: string) => {
  searchTerm.value = data;
};
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
