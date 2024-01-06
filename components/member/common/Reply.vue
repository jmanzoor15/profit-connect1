<template>
  <div class="replies group-hover">
    <FormKit
      type="form"
      :modelValue="selectedPackage"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div>
        <div>
          <h3 style="font-size: 14px; font-weight: bold" class="mb-1">
            {{ reply.user_name }} &nbsp;
            <span style="font-size: 8px">{{
              calculateTimeSince(reply.updated_date, reply.updated_time)
            }}</span>
          </h3>
        </div>
        <div
          class="d-flex align-items-center justify-content-between gap-4"
          v-if="!isActivated"
        >
          <div class="description">
            {{ reply.reply }}
          </div>
          <img
            v-if="
              [loggedUser.firstname, loggedUser.lastname].includes(
                reply.user_name
              )
            "
            @click="setEditId(reply.id)"
            class="editgetMemberInfo hover-show"
            role="button"
            src="~assets/images/svg/edit-icon-black.svg"
          />
        </div>
        <div
          class="d-flex align-items-center justify-content-between gap-4"
          v-else
        >
          <FormKit
            type="text"
            placeholder="Edit a note reply "
            v-model="form.reply"
            input-class="bg-white "
            :classes="{
              outer: 'flex-grow-1',
            }"
            class="custom-input flex-grow-1"
          />

          <div class="d-flex gap-2 align-items-center">
            <FormKit
              variant="bg-primary text-white"
              size="sm"
              label="Update"
              type="submit"
            />
            <MixButton
              disableIcon
              variant="bg-secondary text-white mb-2"
              @click="closeEditMode"
              size="sm"
              label="Cancel"
            />
          </div>
        </div>
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const props = defineProps({
  reply: {
    type: Object,
    required: true,
  },
});

const form = ref({
  reply: props.reply.reply,
});
const { isActivated, closeEditMode, setEditId } = useEditMode();
const { calculateTimeSince } = useTimeSince();
const { loggedUser, currentUserType } = useAuthStore();
const emit = defineEmits();
const submitHandler = async () => {
  try {
    const { data } = await useFetch("/api/member/update-reply", {
      method: "POST",
      body: {
        ...form.value,
        notes_reply_id: props.reply.id,
        facility_id: currentUserType?.id,
      },
    });

    alert(data.value.message);
    await emit("reload");
    closeEditMode();
  } catch (err) {
    console.log("Error:/api/package/add", err);
  }
};
</script>

<style scoped>
.replies {
  border-left: 5px solid rgb(122, 122, 226);
  width: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>
