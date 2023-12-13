<template>
    <div  v-if="items.length > 0"  class="member-scroll"  v-for="(item, key) in items"
        :key="key"   
        @click="onClickEdit(key)"
        >
        
  <div class="member-box allMembersBox">
       
    <div class="member-row">
      <div class="d-flex member-row-ava-box">
        <div>
          <img v-if="item.img_src" class="member-row__avatar avatar" :src="`https://app.ihitreset.com/resetcrm/${item.img_src}`" 
          >
            <div v-else class="member-row__avatar-placeholder">
              {{ item.firstname }} {{ item.lastname }}
            </div>
        </div>
  
        <div class="member-row__data">
           <div class="member-row__name">{{ item.firstname }} {{ item.lastname }}</div>
          <div class="d-flex">
            <div class="member-row__time">{{item.membership_status}}</div>
            <!-- <div>{{ member.occupation || '' }}</div> -->
            <div>occupation  </div>
          </div>
        </div>
      </div>

      <div class="member-row__phone">
        <img src="~/assets/images/svg/phone.svg" alt="Member phone">
        <div>{{item.contactno}} </div>
      </div>

      <div class="member-row__email">
        <img src="~/assets/images/svg/email.svg" alt="Member email">
        <div> {{item.email}} </div>
      </div>
    </div>
    
  </div>
      </div>
      <div v-else class="member-no-result d-none">
        <img src="~/assets/images/no-result.jpg" alt="No result icon">
        <div class="w-100">No results</div>
      </div>

  </template>
  
  <script lang="ts" setup>
  const props = defineProps({
 
  items: {
    type: Array<string>,
    default: [],
  },
});

const emit = defineEmits([ "edit"]);


const onClickEdit = (tab:number) => {
  emit("edit",tab);
};

  </script>


  <style lang="scss" scoped>


.member-scroll {
  max-height: calc(100vh - 300px);
  padding: 0 20px 20px 0;
  margin-right: -20px;
  overflow: auto;
  @include customScrollbar();

  .member-box {
    overflow: hidden;
  }

  .member-row {
    display: flex;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    background: transparent;
    transition: $transitionSpeed;
    justify-content: space-between;

    &:hover,
    &.is-active {
      background: #f2faff;
    }

    &__avatar {
      width: 60px;
      height: 60px;
      margin-right: 15px;
      border-radius: 50%;
    }

    .default-avatar {
      width: 60px;
      height: 60px;
      margin-right: 15px;
    }

    .member-row-ava-box {
      width: 50%;
    }

    &__data {
      .member-row__name {
        font: 22px $font-family-medium;
      }

      .member-row__time {
        color: $main-blue;
        margin-right: 7px;
      }
    }

    &__phone,
    &__email {
      display: flex;
      align-items: center;
      margin-left: 15px;
      width: 25%;

      img {
        width: 16px;
        margin-right: 5px;
      }
    }
  }

  .member-no-result {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    font-size: 22px;
    text-align: center;

    img {
      max-width: 200px;
    }
  }
}

.sidebar-box {
//   display: none;

  &__title {
    display: block;
    text-decoration: none;
    transition: $transitionSpeed;

    .editUserOccupation {
      color: #323a45;
    }

    .editUserName {
      transition: $transitionSpeed;
    }

    &:hover {
      .editUserName {
        color: $main-blue;
      }
    }
  }

  .formEditMember,
  .formCreateMember {
    display: none;
  }

  &.is-create {
    display: block;

    .formCreateMember {
      display: block;
    }
  }

  &.is-edit {
    display: block;

    .formEditMember {
      display: block;
    }
  }
}
</style>