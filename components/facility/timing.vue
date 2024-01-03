<template>
     <h3 class="mt-2">Facility Timing</h3>
       <div class="facility"> {{ generalInfo.always_open }}
        <FormKit
      type="form"
      :modelValue="selectedPlan"
      @submit="submitHandler"
      :actions="false"
    >
        <div class="general-timimg">
        <FormKit
          type="checkbox"
          name="always_open"
          outer-class="m-10"
          label="Always Open"
          :value="false"
        />
       </div>
       <div class="schedule-container" v-if="generalInfo.always_open === 'No'">
      <div v-for="(day, index) in generalTiming" :key="index" class="day-schedule">
       
        <FormKit
          type="text"
          :placeholder="'From'"
          v-model="day.start_time"
          class="time-input"
        
        />
        <span>to</span>
        <FormKit
          type="text"
          :placeholder="'To'"
          v-model="day.end_time"
          class="time-input"
    
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
  
  const props = defineProps({
  generalInfo: {
    type: Object,
    default: ()=>{},
  },
  generalTiming: {
    type: Array,
    default: ()=>[],
  }
})


  
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
  