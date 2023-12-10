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
        <div class="title editPackageBtn">
          {{ data.name }}
        </div>
        <div class="switch">
          <a
            href="#"
            :class="data.status === 'Active' ? 'is-active' : ''"
            class="filter-switch__option"
            >Active</a
          >
          <a
            href="#"
            :class="data.status === 'Inactive' ? 'is-active' : ''"
            class="filter-switch__option red switchToInactive"
            >Inactive</a
          >
        </div>
      </div>

      <div class="row g-3 w-100">
        <div class="col-6" v-for="plan in data?.plans" :key="plan?.id">
          <CardPackage v-bind="plan" />
        </div>
        <div class="col-6">
          <img
            src="~/assets/images/svg/plus-icon.svg?timestamp=1701243704100"
            alt="Add plan icon"
          />
          <div>Add Plan</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  packages: {
    type: Array<any>,
    default: () => [],
  },
});
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

.content-packages .package-row__status .switch {
  display: flex;
  background: #f2faff;
  border-radius: 10px;
  width: fit-content;
  padding: 4px;
}

.content-packages .package-row__status .switch a {
  color: #ccc;
  padding: 4px 12px;
  text-decoration: none;
  transition: 0.35s;
}

.content-packages .package-row__status .switch a:hover {
  color: #0a58ca;
}

.content-packages .package-row__status .switch a.is-active {
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  background: #0f2;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1607843137);
}

.content-packages .package-row__status .switch a.is-active.red {
  background: red;
}

.content-packages .package-row__status .switch a.is-active:hover {
  color: #fff;
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
