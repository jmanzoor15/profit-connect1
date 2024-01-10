<template>
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <h1>Member Search</h1>
        <div class="content-filters">
          <MixToggleBtn v-model="sortingOrder" left="A-Z" right="Z-A" />
          <MixBtnGroup
            v-model="currentFilter"
            :labels="['All', 'Active', 'Inactive']"
          />
        </div>
      </div>
      <SearchBar @on-search="onSearch" />
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

const memberId = ref();
const showAddSidebar = ref(false);
const showEditSidebar = ref(false);
const { currentUserType } = useAuthStore();
const searchTerm = ref();
const sortingOrder = ref("A-Z");
const currentFilter = ref(1);

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
  (memberId.value = tab), (showAddSidebar.value = false);
  showEditSidebar.value = true;
};
const filterPackages = (data: any) => {
  switch (currentFilter.value) {
    case 1:
      return data;
    case 2:
      return data.filter((item: any) => item.membership_status === "Active");
    case 3:
      return data.filter((item: any) => item.membership_status === null);
    default:
      return data;
  }
};

const getMembers = computed(() => {
  const filteredData = searchTerm.value
    ? membersData.value.members.filter(
        (member) =>
          member.firstname
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          member.lastname.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    : membersData.value.members;

  let sortedData;
  if (sortingOrder.value === "A-Z") {
    sortedData = filteredData.sort((a, b) =>
      a.firstname.localeCompare(b.firstname)
    );
  } else if (sortingOrder.value === "Z-A") {
    sortedData = filteredData.sort((a, b) =>
      b.firstname.localeCompare(a.firstname)
    );
  } else {
    sortedData = filteredData;
  }

  return filterPackages(sortedData);
});

const refreshData = () => {
  refreshMembers();
};

const onSearch = (data: string) => {
  searchTerm.value = data;
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
