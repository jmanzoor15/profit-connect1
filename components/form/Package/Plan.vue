<template>
  <div class="px-5">
    <FormKit
      type="form"
      :modelValue="selectedPlan"
      @submit="submitHandler"
      :actions="false"
      #default="{ state: { valid } }"
    >
      <div class="d-flex justify-content-end align-items-center gap-4 mb-3">
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
      <FormKit
        type="text"
        label="Name"
        name="name"
        placeholder="Name"
        validation="required"
        help="Recommended 26 charector"
      />
      <FormKit
        type="text"
        name="description"
        label="Description"
        placeholder="Short description"
        help="Recommended 35 charector"
        validation="required"
      />
      <div class="plan-tab my-4">
        <MixTab v-model="activeTab" :items="['General', 'Access', 'Other']" />
        <div v-show="activeTab === 0">
          <div class="row mb-4">
            <div class="col-6">
              <MixInputBox title="Type">
                <div class="d-flex align-items-center gap-2">
                  <FormKit
                    type="number"
                    name="credit_count"
                    v-if="planTypeData === 'credits'"
                    placeholder="Count"
                    validation="required"
                  />
                  <FormKit
                    :classes="{
                      outer: 'w-100 plan-input-min-width',
                    }"
                    type="multiselect"
                    v-model="planTypeData"
                    name="type"
                    mode="single"
                    validation="required"
                    :options="planType"
                  />
                </div>
              </MixInputBox>
            </div>
            <div class="col-6">
              <MixInputBox title="Duration">
                <div class="d-flex align-items-center gap-2">
                  <FormKit
                    type="number"
                    name="duration"
                    validation="required"
                  />
                  <FormKit
                    :classes="{
                      outer: 'w-100',
                    }"
                    type="multiselect"
                    name="period"
                    mode="single"
                    :options="periodType"
                    validation="required"
                  />
                </div>
              </MixInputBox>
            </div>
          </div>

          <MixInputBox title="Payment">
            <div class="row">
              <div class="col-5 d-flex align-items-center gap-2">
                <FormKit
                  type="multiselect"
                  name="category"
                  mode="single"
                  :classes="{
                    outer: 'plan-input-min-width',
                  }"
                  :options="paymentCategory"
                  v-model="paymentCategoryData"
                  validation="required"
                />
                <FormKit
                  type="number"
                  name="price"
                  placeholder="Price"
                  validation="required"
                />
              </div>
              <div
                class="col-7 d-flex align-items-center gap-2"
                v-if="paymentCategoryData === 'Recurring'"
              >
                <span class="mb-3"> every </span>
                <FormKit
                  type="number"
                  name="payment_duration"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  placeholder="Dration"
                />
                <FormKit
                  type="multiselect"
                  name="payment_period"
                  mode="single"
                  :classes="{
                    outer: 'plan-input-min-width',
                  }"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  :options="periodType"
                />
                <span class="mb-3"> for </span>
                <FormKit
                  type="number"
                  name="payment_cycle"
                  :validation="
                    paymentCategoryData === 'Recurring' ? 'required' : ''
                  "
                  placeholder="Cycle"
                />
              </div>
            </div>
          </MixInputBox>
        </div>
        <div v-show="activeTab === 1" class="row g-4">
          <div class="col-4">
            <MixInputBox title="Classes">
              <FormKit
                type="multiselect"
                name="classes"
                mode="multiple"
                :options="accessData.classes"
                :hideSelected="false"
              />
            </MixInputBox>
          </div>
          <div
            class="col-4"
            v-for="space in accessData.spaces"
            :key="space.value"
          >
            <MixInputBox :title="space.label">
              <FormKit
                type="multiselect"
                :name="`spaces[${space.label}]`"
                mode="multiple"
                :options="space.rooms"
                :hideSelected="false"
              />
            </MixInputBox>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="d-flex align-items-center gap-4 mb-4">
            <FormKit
              type="checkbox"
              name="charge_on_first"
              outer-class="m-0"
              label="Charge on 1st of every month"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="auto_renew"
              label="Will auto-renew"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="first_class_free"
              label="First class free"
              :value="false"
            />
            <FormKit
              type="checkbox"
              outer-class="m-0"
              name="joining_fee"
              label="Joining fee"
              :value="false"
            />
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
            v-model="promotion_price"
            label="Promotion price"
            placeholder="Promotion price"
            :disabled="!isPromotionPriceActive"
            :validation="isPromotionPriceActive ? 'required' : ''"
          />
          <FormKit
            type="checkbox"
            outer-class="m-0"
            label="Display original price"
            name="display_original_price"
            :value="false"
            :validation="isPromotionPriceActive ? 'required' : ''"
          />
        </div>
        <div class="d-flex gap-2">
          <FormKit
            type="date"
            outer-class="m-0"
            label="Start date"
            name="promotion_start"
            help="Promotion start date"
            v-model="promotionStartDate"
            :validation="isPromotionPriceActive ? 'required' : ''"
          />
          <FormKit
            type="date"
            outer-class="m-0 date-width"
            label="End date"
            placeholder="End date"
            name="promotion_end"
            help="Promotion end date"
            :validation="`${
              isPromotionPriceActive ? 'required|' : ''
            }date_after:${promotionStartDate}`"
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
import { useAuthStore } from "@/store/auth";
import { useVModel } from "@vueuse/core";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
import { periodType, planType, paymentCategory } from "@/constants/plan";

const emit = defineEmits(["reload", "update:planData"]);

const props = defineProps({
  planData: {
    type: Object,
    default: () => {},
  },
  selectedPackage: {
    type: Object,
    default: () => {},
  },
  accessData: {
    type: Object,
    default: () => {},
  },
});

const { currentUserType } = useAuthStore();
const selectedPlan = useVModel(props, "planData", emit);
const promotionStartDate = ref(selectedPlan.value?.promotion_start);
const { $toast } = useNuxtApp();

const isPromotionPriceActive = ref(!!selectedPlan.value?.promotion_price);
const activeTab = ref(0);
const { tags } = storeToRefs(useTagStore());
const availableTagsSelected = ref([]);
const exceptTagsSelected = ref([]);
const planTypeData = ref();
const paymentCategoryData = ref();

const promotion_price = ref(selectedPlan.promotion_price || "");
watch(isPromotionPriceActive, (newVal) => {
  console.log({ isPromotionPriceActive });
  if (!newVal) {
    // promotion_price.value = null;
  }
});

const createPlan = async (planData) => {
  try {
    const { data } = await useFetch("/api/package/addplan", {
      method: "POST",
      body: {
        package_id: props.selectedPackage?.package_id,
        facility_id: currentUserType?.id,
        plans: [planData],
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast.success("Plan added successfully!");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/addplan", err);
  }
};

const editPlan = async (planData) => {
  try {
    const { data } = await useFetch("/api/package/updateplan", {
      method: "POST",
      body: {
        facility_id: currentUserType?.id,
        plan_id: selectedPlan.value.plan_id,
        plans: [planData],
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast.success("Plan edited successfully!");
    } else {
      $toast.error(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/package/updateplan", err);
  }
};

const submitHandler = async (planData) => {
  const totalSpaces = props.accessData.spaces.length;
  const spaces = [];
  for (let i = 0; i < totalSpaces; i++) {
    if (planData[`spaces[${props.accessData.spaces[i].label}]`])
      planData[`spaces[${props.accessData.spaces[i].label}]`].forEach(
        (item) => {
          spaces.push(item);
        }
      );
  }

  const postData = {
    pay_with_card: planData.pay_with_card ? "Yes" : "No",
    pay_with_gift_card: planData.pay_with_gift_card ? "Yes" : "No",
    name: planData.name,
    description: planData.description,
    charge_on_first: planData.charge_on_first ? "Yes" : "No",
    auto_renew: planData.auto_renew ? "Yes" : "No",
    first_class_free: planData.first_class_free ? "Yes" : "No",
    joining_fee: planData.joining_fee ? "Yes" : "No",
    available_tags: planData.available_tags,
    except_tags: planData.except_tags,
    display_original_price: planData.display_original_price ? "Yes" : "No",
    promotion_end: planData.promotion_end ?? null,
    promotion_price: isPromotionPriceActive.value
      ? planData.promotion_price ?? ""
      : "",
    promotion_start: planData.promotion_start ?? null,
    classes: planData.classes,
    spaces,
    credit_count: planData.credit_count,
    price: planData.price,
    payment_duration: planData.payment_duration,
    payment_period: planData.payment_period,
    payment_cycle: planData.payment_cycle,
    type: planData.type,
    duration: planData.duration,
    period: planData.period,
    category: planData.category,
  };
  planData.plan_id ? editPlan(postData) : createPlan(postData);
};

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
</script>

<style lang="scss">
.plan-tab {
  ul {
    width: 100% !important;
    li {
      flex-basis: 100%;
    }
  }
}
.plan-input-min-width {
  min-width: 180px;
}
</style>
