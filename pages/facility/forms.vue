<template>
       <section class="content-section">
      
        <FacilityUpdate   />
       
      <div class="content-box">
        <div class="d-flex align-items-center gap-3">
        <h1 style="font-size: 22px; margin-bottom: 0px">Forms</h1>
        <MixButton
          style="background-color: #f2faff"
          @click="showFacilityForm = true"
          size="sm"
          label="New Form"
        />
      </div>
      <Modal v-model="showFacilityForm" id="class-modal">
        <template #title>
            Create Waiver
        </template>
        <FormClass
          v-if="showFacilityForm"
        />
      </Modal>
      <h4 class="mt-4">Waivers</h4>
         <FacilityForms/>
      </div>
  
    </section>
   
  </template>
  <script lang="ts" setup>

  
  const { setBreadcrumb } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Control Panel", link: "/" },
      { label: "Classes", link: "/" },
    ],
  });

  const showFacilityForm = ref(false);
 
  

  </script>
  <style lang="scss" scoped>
  .content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
  }
  
 
  
  .content-box {
    position: relative;
    width: 70vw;
    max-width: 950px;
    margin: unset;
    height: fit-content;
    min-height: calc(100vh - 129px);
    margin-bottom: 50px;
  }
  
  

  </style>
  