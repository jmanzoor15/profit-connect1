<template>
  <div class="sidebar-box">
    <!-- {{ memberId }}{{ getMemberInfo }} -->
    <FormKit
      class="formEditMember"
      type="form"
      :modelValue="getMemberInfo"
      @submit="editMember"
      :actions="false"
      #default="{value}"
    > 
      <nuxt-link
        :to="`/members/${ getMemberInfo.id }/membership-overview`"
        class="sidebar-box__title text-center "
        title="View membership"
      > 
        <img
          :src="`https://app.ihitreset.com/resetcrm/${getMemberInfo.image}`"
          class="previewMemberAvatar avatar"
          alt="Member avatar"
          data-name="ABC XYZ"
        />
        <h2 class="content-title-bold editUserName">
          {{ getMemberInfo.firstname }} {{ getMemberInfo.lastname }}
        </h2>
        <div class="editUserOccupation"></div>
      </nuxt-link>

      <div
        v-show="!toggleStates.isPersonalEditMode.value"
        class="personal-show data-block-show"
      >
        <h3 class="small-title-bold">
          Personal
          <img
            @click="() => startEdit('isPersonalEditMode')"
            class="editgetMemberInfo"
            data-edit="personal-edit"
            src="~assets/images/svg/edit-icon-black.svg"
            alt="Edit icon"
          />
        </h3>
        <div>
          <div class="icon-text">
            <img
              src="~assets/images/svg/members-info/female.svg"
              alt="Female icon"
            />
            <span class="showUserGender">{{ getMemberInfo.gender }} </span>
          </div>

          <div class="icon-text">
            <img
              src="~assets/images/svg/members-info/birthday.svg"
              alt="Birthday icon"
            />
            <span class="showUserBirthday">{{ getMemberInfo.dob }}</span>
          </div>

          <div class="icon-text">
            <img
              src="~assets/images/svg/members-info/phone.svg"
              alt="Phone icon"
            />
            <span class="showPhoneNumber">{{ getMemberInfo.contactno }}</span>
          </div>

          <div class="icon-text">
            <img
              src="~assets/images/svg/members-info/email.svg"
              alt="Email icon"
            />
            <span class="showUserEmail">{{ getMemberInfo.email }}</span>
          </div>
        </div>
      </div>

      <div
        v-show="toggleStates.isPersonalEditMode.value"
        class="personal-edit data-block-edit"
      >
        <h3 class="small-title-bold">
          Personal 
          <div
            class="goBackShowMode"
            data-show="personal-show"
            @click="() => cancelEdit('isPersonalEditMode')"
          >
            Cancel
          </div>
        </h3>
        <div class="upload-image">
          <div id="uploadEditAvatar"></div>
        </div>
        <FormKit
          type="uppy"
          label="Upload"
          name="image"
          :hideUploadButton="true"
        />
        <FormKit 
        type="select" 
        name="gender" 
        :options="['Male', 'Female']" 
        />
        <FormKit
          type="date"
          name="dob"
          label="Birthday"
          help="Enter your birth day"
          validation="required|date_before:2010-01-01"
          validation-visibility="live"
        />
        <FormKit
          type="tel"
          name="contactno"
          label=""
          placeholder="Phone number"
          
          :validation-messages="{
            required: 'Phone number is required',
          }"
          validation-visibility="dirty"
        />
        <FormKit
          type="email"
          name="email"
          validation="required|email|"
          validation-visibility="live"
          placeholder="Email"
        />
        <div class="input-label-box d-none">
          <input type="password" class="passwordInput" placeholder="Password" />
        </div>
      </div>

      <div
        v-show="!toggleStates.isSocialEditMode.value"
        class="social-show data-block-show"
      >
        <h3 class="small-title-bold">
          Contact
          <img
            @click="() => startEdit('isSocialEditMode')"
            class="editgetMemberInfo"
            data-edit="social-edit"
            src="~assets/images/svg/edit-icon-black.svg"
            alt="Edit icon"
          />
        </h3>

        <div class="social-show__icons">
          <div class="icon-text">
            <img
              src="~assets/images/svg/social/facebook.svg"
              alt="Phone icon"
            />
            Facebook
          </div>

          <div class="icon-text">
            <img
              src="~assets/images/svg/social/instagram.svg"
              alt="Instagram icon"
            />
            Instagram
          </div>

          <div class="icon-text">
            <img
              src="~assets/images/svg/social/linkedin.svg"
              alt="Linkedin icon"
            />
            Linkedin
          </div>
        </div>
      </div>

      <div
        v-show="toggleStates.isSocialEditMode.value"
        class="social-edit data-block-edit"
      >
        <h3 class="small-title-bold">
          Social
          <div
            class="goBackShowMode"
            data-show="social-show"
            @click="() => cancelEdit('isSocialEditMode')"
          >
            Cancel
          </div>
        </h3>
        <FormKit type="text" placeholder="Facebook" name="facebook" />
        <FormKit type="text" placeholder="instagram" name="instagram" />
        <FormKit type="text" placeholder="Linkedin" name="linkedin" />
      </div>

      <div
        v-show="!toggleStates.isAboutEditMode.value"
        class="about-show data-block-show"
      >
        <h3 class="small-title-bold">
          About  
          <img
            @click="() => startEdit('isAboutEditMode')"
            class="editgetMemberInfo"
            data-edit="about-edit"
            src="~assets/images/svg/edit-icon-black.svg"
            alt="Edit icon"
          />
        </h3>

        <div class="icon-text showMemberAbout"></div>
      </div>

      <div
        v-show="toggleStates.isAboutEditMode.value"
        class="about-edit member-edit-box data-block-edit"
      >
        <h3 class="small-title-bold">
          About
          <div
            class="goBackShowMode"
            data-show="about-show"
            @click="() => cancelEdit('isAboutEditMode')"
          >
            Cancel
          </div>
        </h3>

        <FormKit 
        type="text" 
        placeholder="About" 
        name="about" 
        />
      </div>

      <div
        v-show="!toggleStates.isEmergencyEditMode.value"
        class="emergency-show data-block-show"
      >
        <h3 class="small-title-bold">
          Emergency
          <img
            @click="() => startEdit('isEmergencyEditMode')"
            class="editgetMemberInfo"
            data-edit="emergency-edit"
            src="~assets/images/svg/edit-icon-black.svg"
            alt="Edit icon"
          />
        </h3>

        <div class="icon-text showMemberemergeny"></div>
      </div>

      <div
        v-show="toggleStates.isEmergencyEditMode.value"
        class="emergency-edit member-edit-box data-block-edit"
      >
        <h3 class="small-title-bold">
          Emergency
          <div
            class="goBackShowMode"
            data-show="emergency-show"
            @click="() => cancelEdit('isEmergencyEditMode')"
          >
            Cancel
          </div>
        </h3>
        <FormKit
          type="text"
          placeholder="Emergency contact name"
          name="emergency_name"
        />
        <FormKit
          type="text"
          placeholder="Emergency contact phone"
          name="emergency_contact"
        />
      </div>

      <div
        v-show="!toggleStates.isTagsEditMode.value"
        class="tags-show data-block-show"
      >
        <h3 class="small-title-bold">
          Tags
          <img
            @click="() => startEdit('isTagsEditMode')"
            class="editgetMemberInfo"
            data-edit="tags-edit"
            src="~assets/images/svg/edit-icon-black.svg"
            alt="Edit icon"
          />
        </h3>

        <div class="showTagsWithComma"></div>
      </div>

      <div
        v-show="toggleStates.isTagsEditMode.value"
        class="tags-edit data-block-edit"
      >
        <h3 class="small-title-bold">
          Tags
          <div
            class="goBackShowMode"
            data-show="tags-show"
            @click="() => cancelEdit('isTagsEditMode')"
          >
            Cancel
          </div>
        </h3>
        <FormKit
            type="multiselect"
            name="tags"
            mode="tags"
            openDirection="top"
            :options="computedTags"
            
          />
      </div>
      <FormKit type="submit" label="Save" class="EditSave" />
      <pre wrap>{{ value }}</pre>
    </FormKit>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useTagStore } from "@/store/tag";
import { storeToRefs } from "pinia";
const emit = defineEmits(["reload", "update:categoryData"]);
import type { ITag } from "@/types/api/member/info";
const props = defineProps({
  memberId: {
    type: String,
    default: ''
  },
});

const { memberId } = toRefs(props);
const memberInfoData = ref(null);
const memberInfoPending = ref(false);
const { tags } = storeToRefs(useTagStore());
const { currentUserType } = useAuthStore();



const computedTags = computed(()=>{
  return tags.value? tags.value.map((item: any) => ({ label: item.name, value: item.id })) : []
});

watch(memberId, async () => {
  if (memberId.value) {
    const { data, pending } = await useFetch(`/api/member/info`, {
      query: { facility_id: currentUserType?.id, member_id: memberId.value },
    });
    memberInfoData.value = data.value;
    memberInfoPending.value = pending.value;
  }
}, { immediate: true });

const getMemberInfo = computed(() => {
 if (memberInfoData.value && memberInfoData.value.member && memberInfoData.value.member.data && memberInfoData.value.member.data.length > 0) {
        const memberData = memberInfoData.value.member.data[0];
      const socialData = memberInfoData.value.member.social || {};
      const aboutData = memberInfoData.value.member.about || {};
      const emergencyContactData = memberInfoData.value.member.emergency_contact || {};
      const tags = memberInfoData.value.member?.tags || [];
      // const tagNames = tags ? tags.map((tag: ITag) => tag && tag.name) : [];


      return {
      id: memberData.id,
      firstname: memberData.firstname,
      lastname: memberData.lastname,
      dob: memberData.dob,
      gender: memberData.gender,
      country_code: memberData.country_code,
      contactno: memberData.contactno,
      email: memberData.email,
      image: memberData.img_src,
      membership_status: memberData.membership_status,
      start_date: memberData.start_date,
      end_date: memberData.end_date,
      facebook: socialData.facebook,
      instagram: socialData.instagram,
      linkedin: socialData.linkedin,
      about: aboutData.about,
      emergency_name: emergencyContactData.name,
      emergency_contactno: emergencyContactData.contactno,
      tags:tags?.map((tag: ITag) => (
        tag?.id
       
      ))
     
    };
  }

  return {};
});


type ToggleStates = {
  isPersonalEditMode: Ref<boolean>;
  isSocialEditMode: Ref<boolean>;
  isAboutEditMode: Ref<boolean>;
  isEmergencyEditMode: Ref<boolean>;
  isTagsEditMode: Ref<boolean>;
};

const toggleStates: ToggleStates = {
  isPersonalEditMode: ref(false),
  isSocialEditMode: ref(false),
  isAboutEditMode: ref(false),
  isEmergencyEditMode: ref(false),
  isTagsEditMode: ref(false),
};

const startEdit = (toggleKey: keyof ToggleStates) => {
  toggleStates[toggleKey].value = true;
};

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

const editMember = async (getMemberInfo: any) => {
  try {
    const body = JSON.stringify({
      member_id: getMemberInfo.id,
      facility_id: currentUserType?.id,
      ...getMemberInfo,
    });

    const { data } = await useFetch("/api/member/update-member", {
      method: "POST",
      body: body
    });
    if (data.value.return) {
      emit("reload");
      alert("Member edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Member/add", err);
  }
};


</script>

<style lang="scss" scoped>
.sidebar-box {
  max-width: 400px;
  width: 30vw;
  margin-right: 20px;
  margin-left: 20px;
  padding: 20px;
  height: fit-content;
  min-height: calc(100vh - 129px);
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.0784313725);
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
    transition: 0.35s;
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
    border-radius: 50%;
  }

  .sidebar-box__title .default-avatar {
    width: 100px;
    height: 100px;
    margin: 0 auto 10px;
  }

  .social-show__icons {
    display: flex;
    justify-content: space-around;
  }
  .social-show__icons h3 {
    width: 100%;
  }
  .social-show__icons .icon-text {
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
  }
  .social-show__icons .icon-text img {
    margin-bottom: 10px;
    margin-right: 0;
  }
  .upload-image {
    margin: 15px 0 10px;
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
    transition: 0.35s;
  }
  .data-block-show {
    margin-bottom: 30px;
  }
  .editgetMemberInfo {
    opacity: 0.4;
    cursor: pointer;
    transition: 0.35s;
  }
}
</style>
