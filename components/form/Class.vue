<template>
    <div class="px-5">
      <FormKit type="form" @submit="submitHandler" :actions="false">
        <FormKit
          type="text"
          label="Name"
          name="name"
          placeholder="Name"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          label="Description"
          placeholder="Description"
        />
      </FormKit>
    </div>
  </template>
  
  <script setup>
  const submitted = ref(false);
  
  const submitHandler = async (event) => {
    submitted.value = true;
  };
  
  </script>
  <style lang="scss" scoped>
  </style>
  
  