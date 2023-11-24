<template>
  <div class="sidebar-box">
    <FormKit class="formEditMember" type="form" @submit="submitHandler" :actions="false">
    <!-- <form class="formEditMember" action="https://app.ihitreset.com/resetcrm/members/update/member"> -->
      <a href="~pages/membership-overview.php" class="sidebar-box__title text-center selectMemberId" data-selected-id title="View membership">
        <img src="https://app.ihitreset.com/resetcrm/upload/1/image/members/profile/2.jpg?timestamp=1700716647968" class="previewMemberAvatar avatar" alt="Member avatar" data-name="ABC XYZ">
        <h2 class="content-title-bold editUserName">junaid</h2>
        <div class="editUserOccupation"></div>
      </a>

      <div v-if="!toggleStates.isPersonalEditMode.value" class="personal-show data-block-show">
        <h3 class="small-title-bold">
          Personal
          <img  @click="() => startEdit('isPersonalEditMode')" class="editMemberData" data-edit="personal-edit" src="~assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text">
          <img src="~assets/images/svg/members-info/female.svg" alt="Female icon">
          <span class="showUserGender">Male</span>
        </div>

        <div class="icon-text">
          <img src="~assets/images/svg/members-info/birthday.svg" alt="Birthday icon">
          <span class="showUserBirthday">1981-12-17</span>
        </div>

        <div class="icon-text">
          <img src="~assets/images/svg/members-info/phone.svg" alt="Phone icon">
          <span class="showPhoneNumber">11646131646</span>
        </div>

        <div class="icon-text">
          <img src="~assets/images/svg/members-info/email.svg" alt="Email icon">
          <span class="showUserEmail">123@gmail.com</span>
        </div>
      </div>

      <div  v-if="toggleStates.isPersonalEditMode.value" class="personal-edit data-block-edit">
        <h3 class="small-title-bold">Personal<div class="goBackShowMode" data-show="personal-show" @click="() => cancelEdit('isPersonalEditMode')">Cancel</div>
        </h3>
        <div class="upload-image">
          <div id="uploadEditAvatar"></div>
        </div>
        <FormKit
        type="select"
        name="gender"
        :options="[
          'Male',
          'Female',
        ]"
      />
        <FormKit
          type="date"
          value="2011-01-01"
          label="Birthday"
          help="Enter your birth day"
          validation="required|date_before:2010-01-01"
          validation-visibility="live"
        />
      <FormKit
        type="tel"
        label=""
        placeholder="Phone number"
        validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
        :validation-messages="{
          required: 'Phone number is required',
          matches: 'Phone number must be in the format xxx-xxx-xxxx',
        }"
        validation-visibility="dirty"
      />
      <FormKit
        type="email"
        validation="required|email|"
        validation-visibility="live"
        placeholder="Email"
      />
        <div class="input-label-box d-none">
          <input type="password" class="passwordInput" placeholder="Password">

          <div class="password-status">
            <img class="showPassIcon" src="~assets/images/svg/show-eye-icon.svg" alt="Show password icon">
            <img class="hidePassIcon" src="~assets/images/svg/hide-eye-icon.svg" alt="Hide password icon">
          </div>
        </div>
      </div>

      <div v-if="!toggleStates.isSocialEditMode.value" class="social-show data-block-show">
        <h3 class="small-title-bold">
          Contact
          <img @click="() => startEdit('isSocialEditMode')" class="editMemberData" data-edit="social-edit" src="~assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div  class="social-show__icons">
          <div class="icon-text">
            <img src="~assets/images/svg/social/facebook.svg" alt="Phone icon">
            Facebook
          </div>

          <div class="icon-text">
            <img src="~assets/images/svg/social/instagram.svg" alt="Instagram icon">
            Instagram
          </div>

          <div class="icon-text">
            <img src="~assets/images/svg/social/linkedin.svg" alt="Linkedin icon">
            Linkedin
          </div>
        </div>
      </div>

      <div v-if="toggleStates.isSocialEditMode.value"  class="social-edit data-block-edit">
        <h3 class="small-title-bold">Social<div class="goBackShowMode" data-show="social-show" @click="() => cancelEdit('isSocialEditMode')">Cancel</div>
        </h3>
        <FormKit
        type="text"
        placeholder="Facebook"
      />
      <FormKit
        type="text"
        placeholder="Instagram"
      />
      <FormKit
        type="text"
        placeholder="Linkedin"
      />
      </div>

      <div v-if="!toggleStates.isAboutEditMode.value" class="about-show data-block-show">
        <h3 class="small-title-bold">
          About
          <img @click="() => startEdit('isAboutEditMode')" class="editMemberData" data-edit="about-edit" src="~assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text showMemberAbout">
        </div>
      </div>

      <div v-if="toggleStates.isAboutEditMode.value"  class="about-edit member-edit-box data-block-edit">
        <h3 class="small-title-bold">About<div class="goBackShowMode" data-show="about-show" @click="() => cancelEdit('isAboutEditMode')">Cancel</div>
        </h3>

        <FormKit
        type="text"
        placeholder="About"
        />
      </div>

      <div v-if="!toggleStates.isEmergencyEditMode.value" class="emergency-show data-block-show">
        <h3 class="small-title-bold">
          Emergency
          <img @click="() => startEdit('isEmergencyEditMode')" class="editMemberData" data-edit="emergency-edit" src="~assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="icon-text showMemberemergeny">
        </div>
      </div>

      <div v-if="toggleStates.isEmergencyEditMode.value" class="emergency-edit member-edit-box data-block-edit">
        <h3 class="small-title-bold">Emergency<div class="goBackShowMode" data-show="emergency-show" @click="() => cancelEdit('isEmergencyEditMode')">Cancel</div>
        </h3>
        <FormKit
        type="text"
        placeholder="Emergency contact name"
        />
        <FormKit
        type="text"
        placeholder="Emergency contact phone"
        />
      </div>

      <div v-if="!toggleStates.isTagsEditMode.value" class="tags-show data-block-show">
        <h3 class="small-title-bold">
          Tags
          <img  @click="() => startEdit('isTagsEditMode')" class="editMemberData" data-edit="tags-edit" src="~assets/images/svg/edit-icon-black.svg" alt="Edit icon">
        </h3>

        <div class="showTagsWithComma"></div>
      </div>

      <div v-if="toggleStates.isTagsEditMode.value" class="tags-edit data-block-edit">
        <h3 class="small-title-bold">Tags<div class="goBackShowMode" data-show="tags-show" @click="() => cancelEdit('isTagsEditMode')">Cancel</div>
        </h3>

        <!-- <div class="search-dropdown-input top"> -->
        <FormKit
        type="text"
        placeholder="Tags"
        />
      </div>
    <!-- </form> -->
    <FormKit type="submit" label="Save" class="EditSave" />
  </FormKit>

  <FormKit class="formCreateMember" type="form" @submit="submitHandler" :actions="false">
    <!-- <form class="formCreateMember" action="https://app.ihitreset.com/resetcrm/members/add/member"> -->
      <div>
        <div>
          <!-- <div id="uploadImg"></div> -->
          <div>
            <FormKit
          type="file"
          label="Documents"
          accept=".pdf,.doc,.docx,.xml,.md,.csv"
          multiple="true"
        />
          </div>
        
          <FormKit type="text" name="First name" id="First name"  placeholder="First name"/>
          <FormKit type="text" name="Last name" id="Last name"  placeholder="Last name"/>
        </div>

        <h3 class="small-title-bold">Personal</h3>
        <FormKit
        type="select"
        name="gender"
        :options="[
          'Male',
          'Female',
        ]"
      />
      <FormKit
          type="date"
          value="2011-01-01"
          label="Birthday"
          validation="required|date_before:2010-01-01"
          validation-visibility="live"
        />
      <FormKit
        type="tel"
        label=""
        placeholder="Phone number"
        validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
        :validation-messages="{
          required: 'Phone number is required',
          matches: 'Phone number must be in the format xxx-xxx-xxxx',
        }"
        validation-visibility="dirty"
      />
      <FormKit
        type="email"
        validation="required|email|"
        validation-visibility="live"
        placeholder="Email"
      />
       <FormKit
        type="password"
        name="password"
        label="password"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Password"
    
       
      />
      <h3 class="small-title-bold">Social</h3>
      <FormKit
        type="text"
        placeholder="Facebook"
      />
      <FormKit
        type="text"
        placeholder="Instagram"
      />
      <FormKit
        type="text"
        placeholder="Linkedin"
      />
      <h3 class="small-title-bold">Tags</h3>
      <FormKit
        type="text"
        placeholder="Tags"
      />
      </div>

      <FormKit type="submit" label="Save" class="EditSave" />

      
    </FormKit>
  </div>
  </template>
  
  <script lang="ts" setup>
import { ref } from 'vue';

// Define the type for toggle states
type ToggleStates = {
  isPersonalEditMode: Ref<boolean>;
  isSocialEditMode: Ref<boolean>;
  isAboutEditMode: Ref<boolean>;
  isEmergencyEditMode: Ref<boolean>;
  isTagsEditMode: Ref<boolean>;
  // Add more toggle states for other sections as needed
};

// Initialize toggle states
const toggleStates: ToggleStates = {
  isPersonalEditMode: ref(false),
  isSocialEditMode: ref(false),
  isAboutEditMode: ref(false),
  isEmergencyEditMode: ref(false),
  isTagsEditMode: ref(false),
  
  // Add more toggle states for other sections as needed
};

// Function to start edit mode dynamically
const startEdit = (toggleKey: keyof ToggleStates) => {
  toggleStates[toggleKey].value = true;
  console.log("svjs");
};

// Function to cancel edit mode dynamically
const cancelEdit = (toggleKey: keyof ToggleStates) => {
  toggleStates[toggleKey].value = false;
};
  const { setBreadcrumb } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Manage", link: "/" },
      { label: "Members", link: "/" },
    ],
  });


  interface NodeProps {
  suffixIcon: string;
  type: string;
}

const handleIconClick = (node: { props: NodeProps }, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};

  
  </script>
  <style lang="scss" scoped>
.sidebar-box {
    max-width: 400px;
    width: 30vw;
    margin-right: 20px;
    padding: 20px;
    height: fit-content;
    min-height: calc(100vh - 129px);
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .0784313725)
}
.sidebar-box__title img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%;
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
 

.sidebar-box__title {
    display: block;
    text-decoration: none;
    transition: .35s;
    margin-bottom: 25px;
}


.icon-text {
    display: flex;
    margin-bottom: 10px;
}
.icon-text img {
    display: block;
    margin-right: 10px;
}

.sidebar-box__title img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%
}

.sidebar-box__title .default-avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto 10px
}

.social-show__icons {
    display: flex;
    justify-content: space-around
}

.social-show__icons h3 {
    width: 100%
}

.social-show__icons .icon-text {
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column
}

.social-show__icons .icon-text img {
    margin-bottom: 10px;
    margin-right: 0
}

.upload-image {
    margin: 15px 0 10px
}
.small-title-bold {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.goBackShowMode {
    font: 14px "Poppins Regular", sans-serif, Arial;
    cursor: pointer;
    padding: 5px 12px;
    border: 1.5px solid #84ceff;
    border-radius: 5px;
    background: 0 0;
    transition: .35s
}
.data-block-show {
    margin-bottom: 30px;
}
.editMemberData {
    opacity: .4;
    cursor: pointer;
    transition: .35s;
}
}
</style>