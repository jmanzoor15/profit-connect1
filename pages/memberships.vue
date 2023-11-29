<template>
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <div class="content-left">
        <div>
            <h1>Membership Packages</h1>
        </div> 
        <div class="addNewBtn addNewPackage createRow">
        <div class="plus">+</div>
        <div class="text-add">Add a Package</div>
      </div>
    </div>
    <div>
         <!-- *********** <Search>    *************** -->
      <SearchBar />     
    </div>
      </div>
    
      <!-- *************  <list of members>  ****************** -->
        <div class="content-filters">
          <!-- *********** Filters  *********** -->
          <FilterSort />
          <FilterStatus />
        </div>
        <ListMemberships />
    </div>
  
  </section>


  </template>
  
  <script lang="ts" setup>
  const { setBreadcrumb } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Control Panel", link: "/" },
      { label: "Membership", link: "/" },
    ],
  });
  </script>
  
  <style lang="scss" scoped>
  /*****************************
   **** 1. Content section *****
   ****************************/
  
  .content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
  }
  
//   .content {
//     &__title-box {
//       display: flex;
//       align-items: center;
//       margin-bottom: 30px;
  
//       h1 {
//         width: 250px;
//         font-size: 22px;
//         margin-bottom: 0;
//       }
//     }
//   }
  
  
 
  
  .content-box {
    position: relative;
    width: 70vw;
    max-width: 1396px;
    margin: unset;
    height: fit-content;
 
  }
 
  .content__title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .content-left {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    // margin-bottom: 30px;
  }
  
  .content-filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
  }
  .content__title-box .addNewBtn {
    width: 150px;
    height: 40px;
    margin-top: 0;
    margin-left: 15px;
}

.content__title-box .addNewBtn {
    width: 150px;
    height: 40px;
    margin-top: 0;
    margin-left: 15px;
}
.addNewBtn .plus {
    border: 1px solid #84ceff;
    width: 14px;
    height: 14px;
    color: #84ceff;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}
.addNewBtn {
    display: flex;
    background: #f2faff;
    height: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    cursor: pointer;
    margin-right: 12px;
    transition: .35s;
}
.addNewBtn .text-add {
    margin-left: 5px;
}
  </style>