<template>
  <div class="content-packages">
    <div
      v-for="data in packages"
      :key="data.id"
      :class="data.status === 'Active' ? 'Active' : ''"
      class="package-row"
      :data-status="data.status === 'Active' ? 'Active' : 'Inactive'"
    >
      <div class="package-row__status">
        <div class="title editPackageBtn" @click="onPackageSelect(data)">
          {{ data.name }}
        </div>

        <MixToggleBtn
          v-model="data.status"
          left-color="#0f2"
          right-color="red"
          left="Active"
          right="Inactive"
          @update:model-value="$emit('on-change-package-status', data)"
        />
      </div>

      <div class="row g-3 w-100">
        <div class="col-6" v-for="plan in data?.plans" :key="plan?.id">
          <CardPackage
            v-bind="plan"
            @onPlanstatusChange="$emit('on-planstatus-change', $event)"
            @onFeaturedChange="$emit('on-featured-change', $event)"
            @onPlanSelect="$emit('on-plan-select', plan)"
          />
        </div>
        <div class="col-6">
          <div
            @click="
              $emit('on-add-plan', {
                package_id: data.id,
                package_name: data.name,
              })
            "
          >
            <img
              src="~/assets/images/svg/plus-icon.svg?timestamp=1701243704100"
              alt="Add plan icon"
            />
            <div>Add Plan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits([
  "on-package-select",
  "on-change-package-status",
  "on-planstatus-change",
  "on-add-plan",
  "on-featured-change",
  "on-plan-select",
]);
defineProps({
  packages: {
    type: Array<any>,
    default: () => [],
  },
});
const onPackageSelect = (data: any) => {
  emit("on-package-select", data);
};
</script>

<style lang="scss" scoped>
.content-packages {
  display: flex;
  flex-flow: column;
}

.content-packages.is-reverse {
  flex-flow: column-reverse;
}

.content-packages .package-row {
  display: flex;
  margin-bottom: 25px;
}

.content-packages .package-row__status {
  min-width: 280px;
  width: 280px;
  margin-right: 30px;
}

.content-packages .package-row__status .title {
  font: 22px "Poppins Medium", sans-serif, Arial;
  cursor: pointer;
  transition: 0.35s;
}

.content-packages .package-row__status .title:hover {
  color: #84ceff;
}

.featured-status {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 22px;
  height: 22px;
  cursor: pointer;
  background: url(assets/images/svg/star-grey.svg) no-repeat;
  background-size: cover;
  transition: 0.4s;
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1215686275));
}

.featured-status:hover {
  transform: scale(1.3);
}

.featured-status.featured {
  background: url(assets/images/svg/star-yellow.svg) no-repeat;
}
.add-plan {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  margin-left: 30px;
  font: 22px "Poppins Medium", sans-serif, Arial;
  cursor: pointer;
  min-width: 160px;
  margin-bottom: 15px;
}

.add-plan img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
</style>
