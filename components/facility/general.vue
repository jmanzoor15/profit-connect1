<template>
<form class="facilityForm" action="https://app.ihitreset.com/resetcrm/dashboard/update/facility" method="post">
      <div class="content__title-box">
        <h1 class="content-title">General</h1>
      </div>
      <div class="general__settings">
        <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span> Allow leads to register on the website or app</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span>     Schedule available to registered clients only</Span> 
    </div>

    <div class="row">
                <div class="d-flex align-items-center gap-2">
                    <Span class="mb-3"> Schedule displays</Span> 
                      <div class="col-1">
                    <FormKit type="number" name="duration"  />
                </div>
                <div class="col-3">
                  <FormKit
                    :classes="{
                      outer: 'w-100',
                    }"
                    type="multiselect"
                    name="period"
                    mode="single"
                    :options="periodType"
                  />
                </div>
                <Span class="mb-3"> of past and available</Span> 
                </div>
            </div>
      </div>

      <div class="booking__settings mt-4">
        <h2 class="content-title">Booking &amp; Cancellation</h2>

        <div class="row">
                <div class="d-flex align-items-center gap-2">
                    <FormKit
                        type="switch"
                        name="is_public"
                        @update:model-value="
                            $emit('on-planstatus-change', {
                            plan_id: id,
                            private: `${isPublic ? 'Yes' : 'No'}`,
                            })
                        "
                        v-model="isPublic"
                        />
                    <Span class="mb-3">      Booking closes</Span> 
                      <div class="col-1">
                    <FormKit type="number" name="duration"  />
                </div>
                <div class="col-3">
                  <FormKit
                    :classes="{
                      outer: 'w-100',
                    }"
                    type="multiselect"
                    name="period"
                    mode="single"
                    :options="periodType"
                  />
                </div>
                <Span class="mb-3"> of past and available</Span> 
                </div>
                <div class="d-flex align-items-center gap-2">
                  
                    <FormKit
                        type="switch"
                        name="is_public"
                        @update:model-value="
                            $emit('on-planstatus-change', {
                            plan_id: id,
                            private: `${isPublic ? 'Yes' : 'No'}`,
                            })
                        "
                        v-model="isPublic"
                        />
                    <Span class="mb-3"> Allow clients to bring</Span> 
                      <div class="col-1">
                    <FormKit type="number" name="duration"  />
                </div>
               
                <Span class="mb-3">Friends for FREE (one-time FOC per friend) at a time</Span> 
                </div>
            </div>
            <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span>Schedule available to registered clients only</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span>Late cancellations consume credits (for credit plans only)</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span> Late cancellation costs (for unlimited plans only)</Span> 
    </div>

      </div>

      <div class="plans__settings">
        <h2 class="content-title">Plans &amp; Packages</h2>
        <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span> Allow existing plans to be paused</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span>Allow renewal of inactive plans</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span> Allow credit sharing between Friends</Span> 
    </div>
    <div class="d-flex gap-2">
        <div class="col-">
            <FormKit
          type="switch"
          name="is_public"
          @update:model-value="
            $emit('on-planstatus-change', {
              plan_id: id,
              private: `${isPublic ? 'Yes' : 'No'}`,
            })
          "
          v-model="isPublic"
        />
       </div>
       <Span> Allow group/family plans</Span> 
    </div>

      </div>

      <input class="facilityIdValue" type="hidden" name="facility_id" value="1">
      <button class="btn btn-primary saveGeneral" type="submit">Save</button>
    </form>
  </template>
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/store/auth";
  import { useTagStore } from "@/store/tag";
  import { storeToRefs } from "pinia";
  import { periodType, planType, paymentCategory } from "@/constants/plan";
  const emit = defineEmits(["reload", "update:categoryData"]);
  import type { ITag } from "@/types/api/member/info";
  import { getImage } from "~/utils/providers/boImage";
  const props = defineProps({
    memberId: {
      type: String,
      default: "",
    },
  });
  
  const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();
  setBreadcrumb({
    items: [
      { label: "Control Panel", link: "/" },
      { label: "Facility", link: "/" },
    ],
  });
  
  const { memberId } = toRefs(props);
  const memberInfoData = ref(null);
  const memberInfoPending = ref(false);
  const { tags } = storeToRefs(useTagStore());
  const { currentUserType } = useAuthStore();
  const { getUrl: getImageUrl } = useBoImage();
  const countryCodes = ref([]);
  
  setBreadcrumbTab({
    items: [
      {
        label: "General",
        link: `/facility/general`,
      },
      { label: "Timing", link: `/members/${memberId.value}/timing` },
      { label: "Staff", link: `/members/${memberId.value}/staff` },
      { label: "Forms", link: `/members/${memberId.value}/forms` },
      { label: "Payments", link: `/members/${memberId.value}/payments` },
      { label: "Discount Codes", link: `/members/${memberId.value}/discount` },
      { label: "Tax", link: `/members/${memberId.value}/tax` },
      { label: "Activity", link: `/members/${memberId.value}/activity` },
    ],
  });
  
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
  
element.style {
}

.content__title-box {
    margin-bottom: 20px;
}
.plans__settings {
    margin-top: 60px;
}
  </style>
  