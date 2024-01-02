<template>
     <h3 class="mt-2">Facility Timing</h3>
       <div class="facility"> 
        <FormKit
      type="form"
      :modelValue="selectedPlan"
      @submit="submitHandler"
      :actions="false"
    >
        <div class="general-timimg">
        <FormKit
          type="checkbox"
          name=""
          outer-class="m-10"
          label="Always Open"
          :value="false"
        />
       </div>
       <div class="schedule-container">
      <div v-for="(day, index) in scheduleDays" :key="index" class="day-schedule">
        <FormKit
          type="checkbox"
          :label="day.name"
          v-model="day.checked"
          :outer-class="{'day-checked': day.checked}"
        />
        <FormKit
          type="text"
          :placeholder="'From'"
          v-model="day.from"
          class="time-input"
          :disabled="!day.checked"
        />
        <span>to</span>
        <FormKit
          type="text"
          :placeholder="'To'"
          v-model="day.to"
          class="time-input"
          :disabled="!day.checked"
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
  import { ref } from 'vue';
  
  const scheduleDays = ref([
  { name: 'Tuesday', checked: false, from: '', to: '' },
    { name: 'Thursday', checked: false, from: '', to: '' },
    { name: 'Saturday', checked: false, from: '', to: '' },
    { name: 'Sunday', checked: false, from: '', to: '' },
    { name: 'Monday', checked: false, from: '', to: '' },
    { name: 'Tueday', checked: false, from: '', to: '' }
    // ... other days
  ]);
  
  // Add additional logic as needed
  </script>
  
  <style scoped>
  .general-timimg {
    margin-top: 40px;
    margin-bottom: 60px;
  }
  .schedule-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .day-schedule {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .day-checked label {
    color: #007bff; /* Bootstrap primary color */
  }
  
  .time-input {
    width: 100px;
    border: 1px solid #dee2e6; /* Bootstrap light grey border */
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
  }
  
  /* You will need to adjust the colors and sizes to match your design exactly */
  </style>
  