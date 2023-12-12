<template>
  <!-- Content section -->
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <h1>Member Search</h1>
        <div class="content-filters">
          <!-- *********** Filters  *********** -->
          <FilterSort  />
          <FilterStatus />
        </div>
      </div>
      <!-- *********** <Search>    *************** -->
      <SearchBar />
      <!-- *************  <list of members>  ****************** -->
      <ListMembers   
      :items="getMembers"
      @add="handleAddSidebar"
      @edit="handleEditSidebar"
      />
     
    </div>
    <SidebarAddMember v-if="showAddSidebar" />
    <SidebarUpdateMember
     v-if="showEditSidebar"
     v-model:member-information="getMemberInfo"
     @reload="refreshData"
     />
  </section>
</template>
  
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import type { ITag } from "@/types/api/member/info";
const props = defineProps({
  modelValue: {
    type: Number,
  },
  items: {
    type: Array<string>,
    default: [],
  },
});
const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Manage", link: "/" },
    { label: "Members", link: "/" },
  ],
});

const selectedMember = ref();
const memberId = ref('');
const showAddSidebar = ref(false);
const showEditSidebar = ref(false);
const { currentUserType } = useAuthStore();


const { data: membersData, pending: membersPending, refresh: refreshMembers } = await useFetch("/api/member/all", {
  query: { facility_id: currentUserType?.id },
});
const handleAddSidebar = () => {
  showAddSidebar.value = true;
  showEditSidebar.value = false;
};

const { data: memberInfoData, pending: memberInfoPending, refresh: refreshMemberInfo } = await useFetch("/api/member/info", {
  query: { facility_id: currentUserType?.id, member_id: memberId},
});


const handleEditSidebar = (tab: number) => {
   memberId.value = membersData.value.members[tab].id,
  showAddSidebar.value = false;
  showEditSidebar.value = true;
};

const getMembers = computed(() => {
  return membersData.value && membersData.value.members
    ? membersData.value.members
    : [];
});
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
      tags:tags?.map((tag: ITag) => ({
        id: tag?.id,
        name: tag?.name,
        updated_date: tag?.updated_date
      }))
     
    };
  }

  return {};
});



watch(selectedMember, () => {
  // Fetch detailed member information based on the new selectedMember
  refreshMemberInfo();
});

const refreshData = () => {
  refreshMembers();
};
</script>

<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}




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
</style>