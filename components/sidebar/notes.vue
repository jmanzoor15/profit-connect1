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
      <div class="update-notes">
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
                    @click="() => startEditNote(note.id)"
                    class="editgetMemberInfo"
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
                placeholder="Edit a note title "
                class="custom-input"
                style="background-color: white; padding-right: 80px"
              />
              <FormKit
                type="text"
                name="description"
                placeholder="Edit a note description "
                class="custom-input"
                style="background-color: white; padding-right: 80px"
              />
            </div>

            <div v-if="note.reply && note.reply.length">
              <div v-show="!isEditingReply(note.id, response?.id)">
                <div class="replies" v-for="response in note.reply">
                  <h3 style="font-size: 14px; font-weight: bold">
                    {{ response.user_name }} &nbsp;
                    <span style="font-size: 8px">{{
                      calculateTimeSince(
                        response.updated_date,
                        response.updated_time
                      )
                    }}</span>
                  </h3>
                  <div class="description">
                    <p>{{ response.reply }}</p>
                  </div>
                </div>
                <div
                  class="d-flex align-items-center justify-content-end gap-2"
                >
                  <img
                    @click="startEditReply(note.id, response?.id)"
                    class="editgetMemberInfo"
                    src="~assets/images/svg/edit-icon-black.svg"
                    style="margin-bottom: 15px"
                  />
                </div>
                <FormKit
                  type="form"
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
                      style="background-color: white; padding-right: 80px"
                    />
                    <FormKit name="notes_id" type="hidden" :value="note.id" />
                    <FormKit
                      name="user_id"
                      type="hidden"
                      :value="getCurrentMemberInfo.user_id"
                    />
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
                placeholder="Edit a note title "
                style="background-color: white; padding-right: 80px"
              />
            </div>
          </div>
          <div class="px-5"></div>
        </FormKit>
      </div>
      <div class="add-notes">
        <Modal v-model="showStoreForm" id="store-modal">
          <template #title> New Note </template>
          <FormMemberNotes
            v-model="showStoreForm"
            v-if="showStoreForm"
            :getCurrentMemberInfo="getCurrentMemberInfo"
          />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { useTimeSince } from "~/composables/useTime";

const { calculateTimeSince } = useTimeSince();
const { currentUserType } = useAuthStore();
const showStoreForm = ref(false);
const currentFilter = ref(1);
const sortingOrder = ref("A-Z");
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
  if (
    memberInfoData.value &&
    memberInfoData.value.member &&
    memberInfoData.value.member.notes &&
    memberInfoData.value.member.notes.length > 0
  ) {
    return memberInfoData.value.member.notes.map((note) => ({
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
  }

  return [];
});

const getCurrentMemberInfo = computed(() => {
  return getMemberInfo.value.find((mem) => mem.id === props.memberId);
});

const editingState = ref({
  noteId: null,
  replyId: null,
});

const startEditNote = (noteId) => {
  editingState.value = { noteId, replyId: null };
};

const startEditReply = (noteId, replyId) => {
  editingState.value = { noteId, replyId };
};

const cancelEdit = () => {
  editingState.value = { noteId: null, replyId: null };
};

const isEditingNote = (noteId) => {
  return (
    editingState.value.noteId === noteId && editingState.value.replyId === null
  );
};

const isEditingReply = (noteId, replyId) => {
  return (
    editingState.value.noteId === noteId &&
    editingState.value.replyId === replyId
  );
};

const submitReplayHandler = async (packageData) => {
  try {
    const { data } = await useFetch("/api/member/add-reply", {
      method: "POST",
      body: {
        ...packageData,
        facility_id: +currentUserType?.id,
      },
    });
    await refresh();
    packageData.reply = "";
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
  width: 100%;
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
.replies {
  border-left: 5px solid rgb(122, 122, 226);
  width: auto;
  padding: 10px;
  box-sizing: border-box;
}
.replies:last-child {
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
  position: relative;
  left: 85%;
  bottom: 10px;
}
</style>
