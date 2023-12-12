<template>
  <div class="sidebar-box">
   <FormKit class="formCreateMember" type="form" @submit="addMember"
     :v-model="addNewMember"
    :actions="false">
        <FormKit
            type="uppy"
            label="Upload Image"
            name="image"
            :hideUploadButton="true" 
          />
        
          <FormKit type="text" name="firstname" id="First name"  placeholder="First name"/>
          <FormKit type="text" name="lastname" id="Last name"  placeholder="Last name"/>
  

        <h3 class="small-title-bold">Personal</h3>
        <FormKit
        type="select"
        name="gender"
        :options="[
          'Male',
          'Female',
        ]"
      />
      <FormKit
          type="date"
          name="gender"
          value="2011-01-01"
          label="Birthday"
          validation="required|date_before:2010-01-01"
          validation-visibility="live"
        />
      <FormKit
        type="tel"
        name="contactno"
        label=""
        placeholder="Phone number"
        validation="required|matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
        :validation-messages="{
          required: 'Phone number is required',
          matches: 'Phone number must be in the format xxx-xxx-xxxx',
        }"
        validation-visibility="dirty"
      />
      <FormKit
        type="email"
        name="email"
        validation="required|email|"
        validation-visibility="live"
        placeholder="Email"
      />
       <FormKit
        type="password"
        name="password"
        label="password"
        prefix-icon="password"
        suffix-icon="eyeClosed"
        @suffix-icon-click="handleIconClick"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Password"
    
       
      />
      <h3 class="small-title-bold">Social</h3>
      <FormKit
        type="text"
        placeholder="Facebook"
      />
      <FormKit
        type="text"
        placeholder="Instagram"
      />
      <FormKit
        type="text"
        placeholder="Linkedin"
      />
      <h3 class="small-title-bold">Tags</h3>
      <FormKit
        type="text"
        placeholder="Tags"
      />
      <FormKit type="submit" label="Save" class="EditSave" />

    </FormKit>
  </div>
  </template>
  
  <script lang="ts" setup>
import { ref } from 'vue';
import type { IAddMember } from "@/types/api/member/info";
import { useAuthStore } from "@/store/auth";
  interface NodeProps {
  suffixIcon: string;
  type: string;
}

const handleIconClick = (node: { props: NodeProps }, e: Event) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};

const { currentUserType } = useAuthStore();
const addNewMember = ref({});
const emit = defineEmits(["reload", "add:addNewMember"]);

const addMember = async (addNewMember: IAddMember) => {
  console.log(addNewMember);
  try {
    const { data } = await useFetch("/api/member/update-member", {
      method: "POST",
      body: {
        ...addNewMember,
        facility_id: currentUserType?.id,
     
      },
    });
    if (data.value.return) {
      emit("reload");
      alert("Member edited successfully!");
    } else {
      alert(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/Member/add", err);
  }
};


  
  </script>
  <style lang="scss" scoped>
.sidebar-box {
    max-width: 400px;
    width: 30vw;
    margin-left: 20px;
    padding: 20px;
    height: fit-content;
    min-height: calc(100vh - 129px);
    background: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .0784313725)
}

</style>