<template>
    <div class="sidebar-box">
      <h4 class="text-center">Reset JIP</h4>
      <h6>Facilty Image</h6>
      <img src="https://app.ihitreset.com/resetcrm/upload/1/image/facility/1.jpg?timestamp=1703665298718" />
    
        <!-- <img :src="getImageUrl(upload/1/image/facility/1.jpg)" /> -->
   
      <FormKit
        class="formEditMember"
        type="form"
        :modelValue="getMemberInfo"
        @submit="editMember"
        :actions="false"
        #default="{ value }"
      >
        <div
          v-show="!toggleStates.isAddressEditMode.value"
          class="personal-show data-block-show"
        >
          <h3 class="small-title-bold mt-4">
            Address
            <img
              @click="() => startEdit('isAddressEditMode')"
              class="editgetMemberInfo"
              data-edit="personal-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>
          <div>
            <div class="icon-text">
              <img
                src="~assets/images/svg/location.svg"
                alt="Female icon"
              />
              <span class="showUserGender">jlt </span>
            </div>
  
            <div class="icon-text">
              <img
                src="~assets/images/svg/members-info/phone.svg"
                alt="Phone icon"
              />
              <span class="showPhoneNumber"
                >+971
                5466726726</span
              >
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
          v-show="toggleStates.isAddressEditMode.value"
          class="personal-edit data-block-edit"
        >
          <h3 class="small-title-bold mt-2">
            Personal
            <div
              class="goBackShowMode"
              data-show="personal-show"
              @click="() => cancelEdit('isAddressEditMode')"
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
          <FormKit type="text" placeholder="Location" name="location" />
          <FormKit
            type="date"
            name="dob"
            label="Birthday"
            validation="required|date_before:2010-01-01"
            validation-visibility="live"
          />
  
          <div class="row g-2">
            <div class="col-6">
              <FormKit
                type="select"
                name="country_code"
                :options="countryCodes"
              />
            </div>
            <div class="col-6">
              <FormKit
                type="tel"
                name="contactno"
                placeholder="Phone number"
                :validation-messages="{
                  required: 'Phone number is required',
                }"
                validation-visibility="dirty"
              />
            </div>
          </div>
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
          <h3 class="small-title-bold mb-4">
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
          v-show="!toggleStates.isWebsiteEditMode.value"
          class="about-show data-block-show"
        >
          <h3 class="small-title-bold">
            Website
            <img
              @click="() => startEdit('isWebsiteEditMode')"
              class="editgetMemberInfo"
              data-edit="about-edit"
              src="~assets/images/svg/edit-icon-black.svg"
              alt="Edit icon"
            />
          </h3>
          www.ihitreset.com
          <div class="icon-text showMemberAbout"></div>
        </div>
  
        <div
          v-show="toggleStates.isWebsiteEditMode.value"
          class="about-edit member-edit-box data-block-edit"
        >
          <h3 class="small-title-bold">
            Website
            <div
              class="goBackShowMode"
              data-show="about-show"
              @click="() => cancelEdit('isWebsiteEditMode')"
            >
              Cancel
            </div>
          </h3>
  
          <FormKit type="text" placeholder="About" name="about" />
        </div>
  
        <FormKit type="submit" label="Save" class="EditSave" />
        <!-- <pre wrap>{{ value }}</pre> -->
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
  import { getImage } from "~/utils/providers/boImage";
  const props = defineProps({
    memberId: {
      type: String,
      default: "",
    },
  });
  
  
  
  const { memberId } = toRefs(props);
  const memberInfoData = ref(null);
  const memberInfoPending = ref(false);
  const { tags } = storeToRefs(useTagStore());
  const { currentUserType } = useAuthStore();
  const { getUrl: getImageUrl } = useBoImage();
  const countryCodes = ref([]);
  

  
  type ToggleStates = {
    isAddressEditMode: Ref<boolean>;
    isSocialEditMode: Ref<boolean>;
    isWebsiteEditMode: Ref<boolean>;
 
  };
  
  const toggleStates: ToggleStates = {
    isAddressEditMode: ref(false),
    isSocialEditMode: ref(false),
    isWebsiteEditMode: ref(false),
  };
  
  const startEdit = (toggleKey: keyof ToggleStates) => {
    toggleStates[toggleKey].value = true;
  };
  
  const cancelEdit = (toggleKey: keyof ToggleStates) => {
    toggleStates[toggleKey].value = false;
  };
  
  const editMember = async (getMemberInfo: any) => {
    try {
      const { data } = await useFetch("/api/member/update-member", {
        method: "POST",
        body: {
          member_id: getMemberInfo.id,
          facility_id: currentUserType?.id,
          ...getMemberInfo,
        },
      });
      if (data.value.return) {
        emit("reload");
        alert("Member edited successfully!");
      } else {
        alert(data.value.message);
      }
    } catch (err) {
      console.log("Error:/api/Member/update", err);
    }
  };
  
  const computedTags = computed(() => {
    return tags.value
      ? tags.value.map((item: any) => ({ label: item.name, value: item.id }))
      : [];
  });
  const tagname = (tagIds: number) => {
    const labels = tagIds
      ?.map((tagId: number) => {
        const foundTag = computedTags.value.find(
          (tag: any) => tag.value === String(tagId)
        );
        return foundTag ? foundTag.label : null;
      })
      .filter((label) => label !== null);
    return labels?.join(", ");
  };
  
  const getMemberInfo = computed(() => {
    if (
      memberInfoData.value &&
      memberInfoData.value.member &&
      memberInfoData.value.member.data &&
      memberInfoData.value.member.data.length > 0
    ) {
      const memberData = memberInfoData.value.member.data[0];
      const socialData = memberInfoData.value.member.social || {};
      const aboutData = memberInfoData.value.member.about || {};
      const emergencyContactData =
        memberInfoData.value.member.emergency_contact || {};
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
        tags: tags?.map((tag: ITag) => tag?.id),
      };
    }
  
    return {};
  });
  
  watch(
    memberId,
    async () => {
      if (memberId.value) {
        const { data, pending } = await useFetch(`/api/franchise`, {
          query: { facility_id: currentUserType?.id, member_id: memberId.value },
        });
        memberInfoData.value = data.value;
        memberInfoPending.value = pending.value;
      }
    },
    { immediate: true }
  );
  
  onMounted(async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/CountryCodes.json"
      );
      if (response.ok) {
        const data = await response.json();
        countryCodes.value = data.map((country) => ({
          label: `${country.name} (${country.dial_code})`,
          value: country.dial_code,
        }));
      } else {
        console.error("Failed to fetch country codes");
      }
    } catch (error) {
      console.error("Error fetching country codes:", error);
    }
  });
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
  