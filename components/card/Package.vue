<template>
  <div class="card-package">
    <MixToggleStar
      v-model="isFeatured"
      size="24"
      class="star-toggle"
      @update:model-value="onFeaturedChange"
    />
    <div class="d-flex justify-content-between">
      <div class="title" role="button" @click="$emit('on-plan-select')">
        {{ name }}
      </div>
      <div class="d-flex gap-4">
        <a href="/" target="_blank">
          <img
            src="~assets/images/svg/link-icon.svg?timestamp=1701243704100"
            alt="Link to package"
          />
        </a>
        <span>Public</span>
        <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
      </div>
    </div>
    <div class="text-end">
      <template
        v-if="promotion_price == '0' && display_original_price !== 'Yes'"
      >
        <div class="price-only">
          AED <span>{{ price }} </span>
        </div>
      </template>

      <template
        v-else-if="promotion_price !== '0' && display_original_price === 'Yes'"
      >
        <div class="">
          <div class="price-only">AED {{ promotion_price }}</div>
          <div class="gap-1 d-flex align-items-center justify-content-end">
            <div class="custom-badge">
              {{ `${discountInPercent}% off ` }}
            </div>
            <div class="line-though">
              AED <span>{{ price }} </span>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="price-only">
          AED
          <span>{{ promotion_price !== "0" ? promotion_price : price }} </span>
        </div>
      </template>
    </div>
    <div class="d-flex justify-content-between">
      <div
        class="d-flex gap-2 align-items-center"
        v-if="category === 'Recurring'"
      >
        <img
          src="~assets/images/svg/recurring-icon.svg?timestamp=1701243704100"
          alt="Recurring img"
        />
        <span>Recurring</span>
      </div>
      <div class="d-flex align-items-center gap-2" v-else>
        <img
          src="~assets/images/svg/one-time-icon.svg?timestamp=1701243704100"
          alt="One-time img"
        />
        <div>One-time</div>
      </div>

      <div class="d-flex gap-2 align-items-center">
        <img
          src="~assets/images/svg/tax-icon.svg?timestamp=1701243704100"
          alt="Tax icluded img"
        />
        <span>included</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  promotion_price: {
    type: Number,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  private: {
    type: String,
    default: "No",
  },
  featured: {
    type: String,
    default: "No",
  },
  status: {
    type: String,
    default: "Active",
  },
  display_original_price: {
    type: String,
    default: "No",
  },
});
const isPublic = ref(props.private === "No" ?? false);
const isFeatured = ref(props.featured === "Yes" ?? false);
const emit = defineEmits([
  "on-planstatus-change",
  "on-featured-change",
  "on-plan-select",
]);

const discountInPercent = computed(() => {
  if (!props.promotion_price) return 0;
  return Math.ceil(
    ((+props.price - +props.promotion_price) * 100) / +props.price
  );
});
const onFeaturedChange = (val: boolean) => {
  emit("on-featured-change", {
    plan_id: props.id,
    featured: val ? "Yes" : "No",
  });
};
</script>

<style scoped lang="scss">
.card-package {
  position: relative;
  background: #f2faff;
  padding: 12px;
  border-radius: 10px;
  .star-toggle {
    position: absolute;
    top: -8px;
    left: -8px;
  }

  .price-only {
    font-size: 20px;
    span {
      font-weight: 900;
    }
  }
  .custom-badge {
    background: red;
    display: inline-block;
    color: #fff;
    font-size: 10px;
    padding: 0 6px;
    height: 18px;
    align-items: center;
  }
  .line-though {
    text-decoration: line-through;
  }
}
</style>
<!-- <style lang="scss">
.card-package {
  .toggle-off {
    background: #dcdcdc;
  }
  .star-toggle {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1215686275));
  }
}
</style> -->
