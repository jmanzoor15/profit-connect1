<template>
  <div class="login-form">
    <FormKit type="form" @submit="submitHandler" :actions="false">
      <FormKit
        type="text"
        label="Franchise/Facility"
        name="franchise_id"
        placeholder="Franchise/Facility"
        validation="required"
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
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
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

const submitted = ref(false);

const submitHandler = async () => {
  // Let's pretend this is an ajax request:
  await new Promise((r) => setTimeout(r, 1000));
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
