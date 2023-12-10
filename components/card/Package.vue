<template>
  <div class="card-package">
    <div class="d-flex justify-content-between">
      <div class="title">
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
        <FormKit type="switch" name="is_public" v-model="isPublic" />
      </div>
    </div>
    <div class="text-end">
      <div>AED {{ price }}</div>
      <div v-if="promotion_price" style="font-size: 12px">
        AED {{ promotion_price }}
      </div>
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
    default: 0,
  },
  category: {
    type: String,
    default: "",
  },
  private: {
    type: String,
    default: "No",
  },
});
const isPublic = ref(props.private === "No" ?? false);
</script>

<style scoped lang="scss">
.card-package {
  position: relative;
  background: #f2faff;
  padding: 12px;
  border-radius: 10px;
}
</style>
