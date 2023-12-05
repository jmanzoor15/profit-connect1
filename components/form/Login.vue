<template>
  <div class="login-form">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <FormKit
        type="multiselect"
        label="Franchise/Facility"
        name="franchise_or_facility_name"
        placeholder="Franchise/Facility"
        validation="required"
        :options="combinedNames"
        :searchable="true"
      />
      <FormKit
        type="text"
        name="username"
        label="username"
        placeholder="Username"
        validation="required"
      />

      <FormKit
        type="password"
        name="password"
        label="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        validation="required"
        placeholder="Password"
      />

      <FormKit type="submit" label="Sign In" />
      <div class="bottom-link-action d-flex justify-content-between">
        <FormKit
          type="checkbox"
          label="Remember me"
          name="remember_me"
          :value="true"
        />

        <NuxtLink to="/auth/forget-password"> Forgot password </NuxtLink>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFranchiseStore } from "~/store/franchise";
import { useAuthStore } from "~/store/auth";

const submitted = ref(false);
const { getCurrentFranchiseOrCurrentFacility, franchise } = useFranchiseStore();
const { initClientAuthSetup } = useAuthStore();


const combinedNames = computed(() => {
  try {
    const franchises = franchise.franchise || [];
    return franchises.flatMap(franchise => [
      franchise.name,
      ...franchise.facility.map(facility => facility.name)
    ]);
  } catch (error) {
    console.error('Error getting combined names:', error);
    return [];
  }
});

const submitHandler = async (event) => {
  const authData = {
    username: event.username,
    password: event.password,
    facility_id: "",
    franchise_id: "",
  };
  const userTypeData = getCurrentFranchiseOrCurrentFacility(
    event.franchise_or_facility_name
  );
  if (userTypeData) {
    userTypeData.type === "franchise"
      ? (authData.franchise_id = userTypeData.id)
      : (authData.facility_id = userTypeData.id);
    try {
      const { data } = await useFetch("/api/auth/login", {
        method: "POST",
        body: {
          ...authData,
        },
      });
      if (data.value.return) {
        initClientAuthSetup(data, userTypeData);
      } else {
        alert(data.value.message);
      }
    } catch (err) {
      console.log("Error:/api/auth/login", err);
    }
  }
  submitted.value = true;
};

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
  node.props.type = node.props.type === "password" ? "text" : "password";
};
</script>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>

<style lang="scss">
.login-form {
  .bottom-link-action {
    .formkit-label {
      display: block !important;
      color: #000;
      font-size: 14px;
    }
    a {
      color: #000;
      text-decoration: none;
      font-size: 14px;
    }
  }
}
</style>
