<template>
  <div>
    <button @click="showModal = !showModal">Show modal</button>
    <Modal v-model="showModal">
      <template #title> Hello </template>
      hello
    </Modal>
    <FormLogin />
  </div>
</template>

<script lang="ts" setup>
const showModal = ref(false);
</script>
