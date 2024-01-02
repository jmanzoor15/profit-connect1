<template>
    <div
      class="user-dropdown-box openUserDropdown"
      @mouseenter="openUserDropdown = true"
      @mouseleave="openUserDropdown = false"
    >
      <div class="user-open-menu">
       <p class="facility">{{franchise?.franchise[0].name}} </p>
      </div>
   
      <div
        class="user-dropdown userDropdown"
        :class="openUserDropdown ? 'is-active' : ''"
      >
        <div class="name">Facilities </div>
        <!-- <div class="role">Admin</div> -->
  
        <ul v-for="facility in getFacilities" :key="facility.id">
          <li>
            <a href="/">
                
              <img src="/images/svg/header/schedule.svg" alt="Schedule" />
              {{facility.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  import { useFranchiseStore } from "~/store/franchise";

  const {   franchise  } = useFranchiseStore();
  const openUserDropdown = ref(false);
  const { initLogout } = useAuthStore();


  const getFacilities = computed(() => {
  try {
    const facilities = franchise?.franchise[0]
    
    return facilities?.facility.map(facility => {
      return { name: facility.name, id: facility.id };
    });
  } catch (error) {
    console.error("Error getting facilities:", error);
    return [];
  }
});

  </script>
  
  <style lang="scss" scoped>
  .user-dropdown-box {
    display: flex;
    align-items: center;
    position: relative;
  
    .user-open-menu {
    
      text-align: center;
      width: 100px;
      cursor: pointer;
      color: $main-blue;
      border-radius:5%;
      border: 1px solid $main-blue;
      overflow: hidden;
      background: $main-dark-blue;
    }
  .facility{
    position: relative;
    top: 8px;
  }
    .user-dropdown {
      position: absolute;
      top: -4px;
      background: #ffffff;
      right: -3px;
      border-radius: 6px 20px 6px 6px;
      width: 100px;
      box-shadow: 0 0 13px #00000026;
      opacity: 0;
      transition: $transitionSpeed;
      z-index: -1;
      transform: scale(0.8);
      width: 50px;
      height: 50px;
      overflow: hidden;
  
      &.is-active {
        opacity: 1;
        z-index: 50;
        transform: scale(1);
        width: 200px;
        height: unset;
      }
  
      .name {
        font-weight: bold;
        max-width: 110px;
        line-height: 1.4;
        margin-left: 20px;
        margin-top: 10px;
      }
  
     
  
      ul {
        list-style: none;
        margin: 20px 0 0;
        padding: 0;
  
        li {
          &:last-child {
            margin: 10px 0 20px;
          }
        }
  
        a {
          display: block;
          padding: 10px 20px;
          background: transparent;
          text-decoration: none;
          color: #000000;
          transition: $transitionSpeed;
  
          &:hover {
            background: #0000000d;
          }
  
          img {
            margin-right: 7px;
          }
        }
      }
    }
  }
  </style>
  