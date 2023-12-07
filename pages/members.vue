<template>
  <!-- Content section -->
  <section class="content-section">
    <div class="content-box">
      <div class="content__title-box">
        <h1>Member Search</h1>
          <!-- {{ getMembers }} -->
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
    <SidebarAddMember v-if="showAddSidebar" @close="handleSidebarClose" />
    <SidebarUpdateMember v-if="showEditSidebar" @close="handleSidebarClose" />
  </section>
</template>
  
<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";

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
const showAddSidebar = ref(false);
const showEditSidebar = ref(false);

const handleAddSidebar = () => {
  showAddSidebar.value = true;
  showEditSidebar.value = false;
};

const handleEditSidebar = () => {
  showAddSidebar.value = false;
  showEditSidebar.value = true;
};

const { currentUserType } = useAuthStore();

const { data, pending, refresh } = await useFetch("/api/member/all", {
  query: { facility_id: currentUserType?.id },
});

const getMembers = computed(() => {
  return data.value && data.value.members
    ? data.value.members
    : [];
});

const refreshData = () => {
  refresh();
};
</script>
<style lang="scss" scoped>
.content-section {
  display: flex;
  justify-content: center;
  margin: 0 15px;
}

// .content {
//   &__title-box {
//     display: flex;
//     align-items: center;
//     margin-bottom: 30px;

//     h1 {
//       width: 250px;
//       font-size: 22px;
//       margin-bottom: 0;
//     }
//   }
// }


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