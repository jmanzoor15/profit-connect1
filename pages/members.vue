<template>
    <!-- <div class="container bg-white h-full">This is for members</div> -->
    <!-- Content section -->
<section class="content-section">
  <div class="content-box">
    <div class="content__title-box">
      <h1>Member Search</h1>

      <div class="content-filters">
        <!-- *********** Filters  *********** -->
      <FilterSort />
      <FilterStatus />
      </div>
    </div>
   <!-- *********** <Search>    *************** -->
       <SearchBar />
    <!-- *************  <list of members>  ****************** -->
      <ListMembers />
    </div>
  

  <div class="sidebar-box">
    <form class="formEditMember" action="https://app.ihitreset.com/resetcrm/members/update/member">
      <a href="../pages/membership-overview.php" class="sidebar-box__title text-center selectMemberId" data-selected-id title="View membership">
        <img src="" class="previewMemberAvatar avatar d-none" alt="Member avatar">
        <h2 class="content-title-bold editUserName"></h2>
        <div class="editUserOccupation"></div>
      </a>

      <div class="personal-show data-block-show">
        <h3 class="small-title-bold">
          Personal
          <img class="editMemberData" data-edit="personal-edit" src="../assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text">
          <img src="../assets/images/svg/members-info/female.svg" alt="Female icon">
          <span class="showUserGender"></span>
        </div>

        <div class="icon-text">
          <img src="../assets/images/svg/members-info/birthday.svg" alt="Birthday icon">
          <span class="showUserBirthday"></span>
        </div>

        <div class="icon-text">
          <img src="../assets/images/svg/members-info/phone.svg" alt="Phone icon">
          <span class="showPhoneNumber"></span>
        </div>

        <div class="icon-text">
          <img src="../assets/images/svg/members-info/email.svg" alt="Email icon">
          <span class="showUserEmail"></span>
        </div>
      </div>

      <div class="personal-edit data-block-edit">
        <h3 class="small-title-bold">Personal<div class="goBackShowMode" data-show="personal-show">Cancel</div>
        </h3>

        <div class="upload-image">
          <div id="uploadEditAvatar"></div>
        </div>

        <div class="custom-select">
          <div class="customSelectToggle">
            <div class="custom-select__text customSelectText showUserGender2">Gender</div>
            <div class="select-arrow"></div>
          </div>

          <div class="custom-select__options">
            <div data-value="male">Male</div>
            <div data-value="female">Female</div>
          </div>

          <input class="selectValue editUserGender" name="gender" type="hidden">
        </div>

        <input type="text" placeholder="Birthday" class="editUserBirthday" name="dob">
        <input type="text" placeholder="Phone number" class="editPhoneNumber" name="contactno">
        <input type="email" placeholder="Email" name="email" class="editUserEmail">

        <div class="input-label-box d-none">
          <input type="password" class="passwordInput" placeholder="Password">

          <div class="password-status">
            <img class="showPassIcon" src="../assets/images/svg/show-eye-icon.svg" alt="Show password icon">
            <img class="hidePassIcon" src="../assets/images/svg/hide-eye-icon.svg" alt="Hide password icon">
          </div>
        </div>
      </div>

      <div class="social-show data-block-show">
        <h3 class="small-title-bold">
          Contact
          <img class="editMemberData" data-edit="social-edit" src="../assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="social-show__icons">
          <div class="icon-text">
            <img src="../assets/images/svg/social/facebook.svg" alt="Phone icon">
            Facebook
          </div>

          <div class="icon-text">
            <img src="../assets/images/svg/social/instagram.svg" alt="Instagram icon">
            Instagram
          </div>

          <div class="icon-text">
            <img src="../assets/images/svg/social/linkedin.svg" alt="Linkedin icon">
            Linkedin
          </div>
        </div>
      </div>

      <div class="social-edit data-block-edit">
        <h3 class="small-title-bold">Social<div class="goBackShowMode" data-show="social-show">Cancel</div>
        </h3>

        <input type="text" placeholder="Facebook" class="userEditFacebook" name="facebook">
        <input type="text" placeholder="Instagram" class="userEditInstagram" name="instagram">
        <input type="text" placeholder="Linkedin" class="userEditLinkedin" name="linkedin">
      </div>

      <div class="about-show data-block-show">
        <h3 class="small-title-bold">
          About
          <img class="editMemberData" data-edit="about-edit" src="../assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text showMemberAbout">
          -
        </div>
      </div>

      <div class="about-edit member-edit-box data-block-edit">
        <h3 class="small-title-bold">About<div class="goBackShowMode" data-show="about-show">Cancel</div>
        </h3>

        <input type="text" class="editMemberAbout" placeholder="About" name="about">
      </div>

      <div class="emergency-show data-block-show">
        <h3 class="small-title-bold">
          Emergency
          <img class="editMemberData" data-edit="emergency-edit" src="../assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text showMemberemergeny">
          -
        </div>
      </div>

      <div class="emergency-edit member-edit-box data-block-edit">
        <h3 class="small-title-bold">Emergency<div class="goBackShowMode" data-show="emergency-show">Cancel</div>
        </h3>

        <input type="text" class="editEmergencyContact" placeholder="Emergency contact name" name="emergency_contact_name">
        <input type="text" class="editEmergencyPhone" placeholder="Emergency contact phone" name="emergency_contact_no">
      </div>

      <div class="tags-show data-block-show">
        <h3 class="small-title-bold">
          Tags
          <img class="editMemberData" data-edit="tags-edit" src="../assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="showTagsWithComma"></div>
      </div>

      <div class="tags-edit data-block-edit">
        <h3 class="small-title-bold">Tags<div class="goBackShowMode" data-show="tags-show">Cancel</div>
        </h3>

        <div class="search-dropdown-input top">
          <input type="text" class="searchTags search" placeholder="tags">
          <ul class="list tagsOptions unique editMemberTagSelect" data-tag-box="members_tags_edit"></ul>
        </div>

        <div class="tags-box members_tags_edit">
          <input type="hidden" class="tagValue" name="tags" value="[]">
        </div>
      </div>

      <div class="sidebarSaveBtn mt-3 d-none text-center">
        <input class="facilityIdValue" type="hidden" name="facility_id">
        <input class="uploadEditAvatar" type="hidden" name="image">
        <input class="memberIdValue" type="hidden" name="member_id">
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>

    <form class="formCreateMember" action="https://app.ihitreset.com/resetcrm/members/add/member">
      <div>
        <div>
          <div id="uploadImg"></div>
          <input class="mt-3" type="text" name="firstname" placeholder="First name">
          <input type="text" name="lastname" placeholder="Last Name">
        </div>

        <h3 class="small-title-bold">Personal</h3>

        <div class="custom-select">
          <div class="customSelectToggle">
            <div class="custom-select__text customSelectText">Gender</div>
            <div class="select-arrow"></div>
          </div>

          <div class="custom-select__options">
            <div data-value="male">Male</div>
            <div data-value="female">Female</div>
          </div>

          <input class="selectValue" name="gender" type="hidden">
        </div>

        <input type="text" class="createMemberBirthday" placeholder="Birthday" name="dob" autocomplete="off">
        <input type="text" placeholder="Phone number" name="contactno" autocomplete="off">
        <input type="email" placeholder="Email" name="email" autocomplete="off">

        <div class="input-label-box">
          <input type="password" class="passwordInput" autocomplete="off" placeholder="Password" name="password">

          <div class="password-status">
            <img class="showPassIcon" src="../assets/images/svg/show-eye-icon.svg" alt="Show password icon">
            <img class="hidePassIcon" src="../assets/images/svg/hide-eye-icon.svg" alt="Hide password icon">
          </div>
        </div>
      </div>

      <div>
        <h3 class="small-title-bold">Social</h3>

        <input type="text" placeholder="Facebook" name="facebook" autocomplete="off">
        <input type="text" placeholder="Instagram" name="instagram" autocomplete="off">
        <input type="text" placeholder="Linkedin" name="linkedin" autocomplete="off">
      </div>

      <div>
        <h3 class="small-title-bold">Tags</h3>

        <div class="search-dropdown-input top">
          <input type="text" class="searchTags search" placeholder="tags">
          <ul class="list tagsOptions unique" data-tag-box="members_tags"></ul>
        </div>

        <div class="tags-box members_tags">
          <input type="hidden" class="tagValue" name="tags" value="[]">
        </div>
      </div>

      <div class="sidebarSaveBtn mt-3 text-center">
        <input class="facilityIdValue" type="hidden" name="facility_id">
        <input class="memberImgString" type="hidden" name="image">
        <button class="btn btn-primary w-100" type="submit">Save</button>
      </div>

    </form>
  </div>
</section>
  </template>
  
  <script lang="ts" setup>
  const { setBreadcrumb } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Manage", link: "/" },
      { label: "Members", link: "/" },
    ],
  });
  </script>
  <style lang="scss" scoped>
  /*****************************
 **** 1. Content section *****
 ****************************/
.content {
  &__title-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    h1 {
      width: 250px;
      font-size: 22px;
      margin-bottom: 0;
    }
  }
}


.content-section {
    display: flex;
    justify-content: center;
    margin: 0 15px;
}
.content-section .content-box {
    position: relative;
    width: 70vw;
    max-width: 950px;
    margin: unset;
    height: fit-content;
    min-height: calc(100vh - 129px);
}
.content__title-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}
.content-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 50px;
}

.content-section .sidebar-box {
  margin-right: 0;
  margin-left: 20px;
}



.addNewMember {
  font: 18px $font-family-medium;
  cursor: pointer;
  margin-left: 20px;

  .plusIcon {
    width: 40px;
    margin-right: 10px;
  }
}

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
    // display: none;
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