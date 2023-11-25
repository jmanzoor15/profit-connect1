<template>
  <div>
    <FormKit type="uppy" v-model="files" />
    {{ files }}
  </div>
</template>

<script lang="ts" setup>
const files = ref();
</script>
