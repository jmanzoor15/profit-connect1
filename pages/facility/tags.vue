<template>
  <TemplatesFacility>
    <div>
      <div class="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div class="d-flex align-items-center gap-4">
          <h1 style="font-size: 22px; margin-bottom: 0px">Tags</h1>
          <MixButton
            style="background-color: #f2faff"
            size="sm"
            label="New tags"
            @Click="showTagModal = true"
          />
        </div>
        <div class="search ml-auto">
          <SearchBar />
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-between mb-5">
        <MixToggleBtn v-model="sortingOrder" left="A-Z" right="Z-A" />
        <div class="d-flex align-items-center gap-2">
          <p style="font-size: 12px; font-weight: bold">Created</p>
          <MixBtnGroup
            style="font-size: 12px; font-weight: bold"
            v-model="currentFilter"
            id="sort-2"
            :labels="['Recently', 'Oldest']"
          />
        </div>
      </div>
      <table class="tags-table w-full">
        <thead>
          <th>Name</th>
          <th>Count</th>
          <th>Created by</th>
          <th class="w-125px">Date created</th>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td>{{ tag.name }}</td>
            <td>{{ tag.count }}</td>
            <td>{{ tag.created_by }}</td>
            <td>
              {{ formatDate(tag.updated_date) }}
            </td>
          </tr>
        </tbody>
      </table>

      <Modal v-model="showTagModal">
        <template #title> New Tag </template>
        <h1>Hello world</h1>
      </Modal>
    </div>
  </TemplatesFacility>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
import { useTagStore } from "~/store/tag";
const { setBreadcrumb } = useBreadcrumb();
setBreadcrumb({
  items: [
    { label: "Control Panel", link: "/" },
    { label: "Facilities", link: "/" },
  ],
});
const { tags } = storeToRefs(useTagStore());

const sortingOrder = ref("A-Z");
const showFacilityForm = ref(false);
const memberId = ref("");
const showTagModal = ref(false);
const currentFilter = ref(1);
const { currentUserType } = useAuthStore();

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}
</script>

<style scoped>
.w-125px {
  width: 125px;
}
.tags-table {
  margin-top: 30px;
  color: #000000;

  tr {
    td,
    th {
      padding: 7px;
    }

    th {
      &:first-child {
        padding-left: 42px;
      }
    }
  }

  .cardIcon {
    height: 22px;
  }

  .downloadIcon {
    height: 22px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
