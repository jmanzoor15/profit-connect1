<template>
  <div class="content-main-box">
    <div class="content-box1 mb-3">
      <div class="d-flex align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-4">
          <h1 style="font-size: 22px; margin-bottom: 0px">Notes</h1>
          <MixButton
            style="background-color: #f2faff"
            @click="showStoreForm = true"
            size="sm"
            label="New Note"
          />
        </div>
        <div class="search">
          <SearchBar />
        </div>
      </div>
      <div class="content-filters">
        <div class="d-flex align-items-center">
          <p style="font-size: 12px; font-weight: bold">Updated</p>
          <MixBtnGroup
            v-model="currentFilter"
            id="sort-1"
            style="font-size: 12px; font-weight: bold"
            :labels="['Newest', 'Oldest']"
          />
        </div>
        <div class="d-flex align-items-center">
          <p style="font-size: 12px; font-weight: bold">Created</p>
          <MixBtnGroup
            style="font-size: 12px; font-weight: bold"
            v-model="currentFilter"
            id="sort-2"
            :labels="['Newest', 'Oldest']"
          />
        </div>
      </div>

      <div v-if="getMemberInfo.length === 0" class="no-notes">
        <p
          style="
            font-size: 18px;
            font-weight: bold;
            position: absolute;
            top: 50%;
            margin-left: 100px;
          "
        >
          No notes available. Click the button below to add a new note.
        </p>
      </div>

      <div class="update-notes" v-else>
        <FormKit
          type="form"
          :modelValue="selectedPackage"
          @submit="submitHandler"
          :actions="false"
          #default="{ value }"
        >
          <div class="textarea" v-for="note in getMemberInfo" :key="note.id">
            <div
              v-show="!isEditingNote(note.id) && !isEditingReply(note.id, null)"
            >
              <div
                class="d-flex align-items-center justify-content-between gap-3"
              >
                <p
                  style="
                    font-size: 22px;
                    font-weight: bold;
                    margin-bottom: 10px;
                  "
                >
                  {{ note.title }}
                </p>
                <div class="d-flex align-items-center gap-2">
                  <p style="font-size: 10px">Update today</p>
                  <img
                    @click="() => startEditNote(note)"
                    class="editgetMemberInfo"
                    role="button"
                    src="~assets/images/svg/edit-icon-black.svg"
                    style="margin-bottom: 15px"
                  />
                </div>
              </div>
              <div class="notes">
                <h3 style="font-size: 14px; font-weight: bold">
                  {{ note.user_name }} &nbsp;
                  <span style="font-size: 8px">
                    {{
                      note.updated_date
                        ? calculateTimeSince(
                            note.updated_date,
                            note.updated_time
                          )
                        : calculateTimeSince(note.created_date)
                    }}</span
                  >
                </h3>
                <div class="description">
                  <p>{{ note.description }}</p>
                </div>
              </div>
            </div>
            <div v-show="isEditingNote(note.id)">
              <div class="d-flex justify-content-end gap-2 mb-2">
                <div
                  class="goBackShowMode"
                  data-show="personal-show"
                  @click="handleEdit"
                >
                  Edit
                </div>
                <div
                  class="goBackShowMode"
                  data-show="personal-show"
                  @click="cancelEdit"
                >
                  Cancel
                </div>
              </div>

              <FormKit
                type="text"
                placeholder="Edit a note title "
                v-model="editingState.heading"
                class="custom-input"
                style="background-color: white; padding-right: 80px"
              />
              <FormKit
                type="text"
                placeholder="Edit a note description "
                v-model="editingState.description"
                class="custom-input"
                style="background-color: white; padding-right: 80px"
              />
            </div>
            <div v-if="note.reply && note.reply.length">
              <div
                v-show="!isEditingReply(note.id, response?.id)"
                class="reply-container"
              >
                <MemberCommonReply
                  class="replies group-hover"
                  v-for="reply in note.reply"
                  :reply="reply"
                  :key="reply.id"
                  @reload="refresh"
                />
              </div>
            </div>

            <div v-show="isEditingReply(note.id, response?.id)">
              <div
                class="goBackShowMode"
                data-show="personal-show"
                @click="cancelEdit"
              >
                Cancel
              </div>
              <FormKit
                type="text"
                name="user_name"
                placeholder="Edit the Reply "
                style="background-color: white; padding-right: 80px"
              />
            </div>
            <FormKit
              type="form"
              :id="`replyid-${note.id}`"
              :modelValue="selectedPackage"
              @submit="submitReplayHandler"
              :actions="false"
              #default="{ value }"
            >
              <div style="position: relative">
                <FormKit
                  type="text"
                  name="reply"
                  placeholder="write a reply "
                  class="custom-input"
                  :value="userReply"
                  style="background-color: white; padding-right: 80px"
                />
                <FormKit name="notes_id" type="hidden" :value="note.id" />
                <FormKit name="user_id" type="hidden" :value="loggedUser.id" />
                <button
                  type="submit"
                  style="
                    border: none;
                    background: none;
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                  "
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 2 L18 10 L2 18 Z" fill="skyblue" />
                  </svg>
                </button>
              </div>
            </FormKit>
          </div>
          <div class="px-5"></div>
        </FormKit>
      </div>
      <div class="add-notes">
        <Modal v-model="showStoreForm" id="store-modal">
          <template #title> New Note </template>
          <FormMemberNotes
            @reload="refresh"
            v-model="showStoreForm"
            v-if="showStoreForm"
            :getCurrentMemberInfo="getCurrentMemberInfo"
            :loggedUser="loggedUser"
          />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { useTimeSince } from "~/composables/useTime";
import { reset } from "@formkit/core";
const { calculateTimeSince } = useTimeSince();
const { currentUserType } = useAuthStore();
const { loggedUser } = useAuthStore();
const showStoreForm = ref(false);
const currentFilter = ref(1);
const sortingOrder = ref("A-Z");
const userReply = ref("");
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});
const {
  data: memberInfoData,
  pending: membersPending,
  refresh,
} = await useFetch("/api/member/info", {
  query: { facility_id: currentUserType?.id, member_id: props.memberId },
});

const getMemberInfo = computed(() => {
  if (!memberInfoData.value?.member?.notes) {
    return [];
  }

  return memberInfoData.value.member.notes
    .filter((note) => note != null) // Filter out null or undefined notes
    .map((note) => ({
      id: note.id,
      title: note.header,
      description: note.description,
      user_id: note.user_id,
      user_name: note.user_name,
      created_date: note.created_date,
      updated_date: note.updated_date,
      updated_time: note.updated_time,
      reply: note.reply ? note.reply.filter((r) => r !== null) : [],
    }));
});

const getCurrentMemberInfo = computed(() => {
  if (!memberInfoData.value?.member?.data) {
    return null;
  }
  return memberInfoData.value.member.data.find(
    (member) => member.id === props.memberId
  );
});

const defaultValue = () => ({
  notes_id: null,
  replyId: null,
  heading: null,
  description: null,
});
const editingState = ref(defaultValue());

const startEditNote = (note) => {
  const notes_id = note.id;
  console.log(note, "note");
  editingState.value = {
    notes_id,
    heading: note.title,
    description: note.description,
  };
};

const startEditReply = (notes_id, replyId) => {
  editingState.value = { ...editingState.value, notes_id, replyId };
};

const cancelEdit = () => {
  editingState.value = defaultValue();
};

const isEditingNote = (notes_id) => {
  return (
    editingState.value.notes_id === notes_id && !editingState.value.replyId
  );
};

const isEditingReply = (notes_id, replyId) => {
  return (
    editingState.value.notes_id === notes_id &&
    editingState.value.replyId === replyId
  );
};

const handleEdit = async () => {
  try {
    const { data } = await useFetch("/api/member/update-note", {
      method: "POST",
      body: {
        ...editingState.value,
        facility_id: currentUserType?.id,
      },
    });
    await refresh();
    cancelEdit();
    alert(data.value.message);
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

const submitReplayHandler = async (packageData) => {
  console.log(packageData);
  try {
    const { data } = await useFetch("/api/member/add-reply", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: currentUserType?.id,
      },
    });
    await refresh();
    packageData.reply = "";
    reset(`replyid-${packageData.notes_id}`);
    alert(data.value.message);
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};

// type ToggleStates = {
//   isNotesEditMode: Ref<boolean>;
//   isReplyEditMode: Ref<boolean>;
// };

// const toggleStates: ToggleStates = {
//   isNotesEditMode: ref(false),
//   isReplyEditMode: ref(false),
// };

// const startEdit = (toggleKey: keyof ToggleStates) => {
//   toggleStates[toggleKey].value = true;
// };

// const cancelEdit = (toggleKey: keyof ToggleStates) => {
//   toggleStates[toggleKey].value = false;
// };
// const filterPackages = (data: any) => {
//   switch (currentFilter.value) {
//     case 1:
//       return data;
//     case 2:
//       return data.filter((item: any) => item.status === "Active");
//     case 3:
//       return data.filter((item: any) => item.status === "Inactive");
//     default:
//       return data;
//   }
// // };
// const computedData = computed(() => {
//   if (sortingOrder.value === "A-Z") {
//     return filterPackages(data.value.packages);
//   } else {
//     return filterPackages(
//       useOrderBy(
//         data.value.packages,
//         [(item) => item.name.toLowerCase()],
//         ["desc"]
//       )
//     );
//   }
</script>
<style lang="scss" scoped>
.content-box1 {
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.0784313725);
  padding: 20px;
  margin: 0 auto;
}

.search {
  position: relative;
  top: 7px;
}
.content-box .FormMemberNotes {
  padding: 0;
}
.update-notes {
  margin-top: 30px;
}
.textarea {
  position: relative;
  width: 800px;
  padding: 16px;
  color: #000;
  font-size: 0.875rem;
  line-height: 1.15;
  border: 1px solid #f2faff;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  background: #f2faff;
  margin-bottom: 30px;
}
.no-notes {
  position: relative;
  width: 800px;
  height: 400px;
  padding: 16px;
  color: #000;
  font-size: 0.875rem;
  line-height: 1.15;
  border: 1px solid #f2faff;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  background: #f2faff;
  margin-bottom: 30px;
}

.content-filters {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.goBackShowMode {
  font: 14px "Poppins Regular", sans-serif, Arial;
  cursor: pointer;
  padding: 5px 12px;
  border: 1.5px solid #84ceff;
  border-radius: 5px;
  background: 0 0;
  transition: 0.35s;
  width: 80px;
}

.reply-container {
  max-height: 300px;
  overflow: auto;
  margin: 30px 0;
}
</style>
