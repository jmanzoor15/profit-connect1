<template>
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <h1>Member Search</h1>
        <div class="content-filters">
          <FilterSort />
          <FilterStatus />
        </div>
      </div>
      <SearchBar />
      <div class="addNewMember" @click="handleAddSidebar()">
        <img
          class="plusIcon"
          src="~/assets/images/svg/plus-icon.svg"
          alt="Plus icon"
        />
        Add New
      </div>
      <ListMembers
        :items="getMembers"
        @add="handleAddSidebar"
        @edit="handleEditSidebar"
      />
    </div>

    <SidebarAddMember v-if="showAddSidebar" />
    <SidebarUpdateMember
      v-if="showEditSidebar"
      v-model:member-id="memberId"
      @reload="refreshData"
    />
  </section>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Manage", link: "/" },
    { label: "Members", link: "/" },
  ],
});

const memberId = ref("");
const showAddSidebar = ref(false);
const showEditSidebar = ref(false);
const { currentUserType } = useAuthStore();

const {
  data: membersData,
  pending: membersPending,
  refresh: refreshMembers,
} = await useFetch("/api/member/all", {
  query: { facility_id: currentUserType?.id },
});
const handleAddSidebar = () => {
  showAddSidebar.value = true;
  showEditSidebar.value = false;
};

const handleEditSidebar = (tab: number) => {
  (memberId.value = membersData.value.members[tab].id),
    (showAddSidebar.value = false);
  showEditSidebar.value = true;
};

const getMembers = computed(() => {
  return membersData.value && membersData.value.members
    ? membersData.value.members
    : [];
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
.addNewMember {
  font: 18px $font-family-medium;
  cursor: pointer;
  margin-left: 20px;

  .plusIcon {
    width: 40px;
    margin-right: 10px;
  }
}
</style>
