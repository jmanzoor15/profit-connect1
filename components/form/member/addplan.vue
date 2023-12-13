<template>
  <div id="buyMembershipModal" class="modal-box buy-membership-modal is-active">
    <FormKit
      type="form"
      @submit="submitHandler"
      :actions="false"
      :modelValue="computedSelectedClass"
    >
    <div class="checkout-member">
      <div class="d-flex">
        <img class="member-avatar memberAvatarModal avatar" src="https://app.ihitreset.com/resetcrm/upload/1/image/members/profile/1.jpg?timestamp=1702466664153" alt="Member avatar" data-name="Michel Santana">
        <div class="member-name memberNameModal">Michel Santana</div>
      </div>

      <div class="d-flex">
        <FormKit
            name="type"
            type="radio"
            v-model="classType"
            :options="classOptions"
          />
      
        <!-- <label class="checkbox-container">
          <input type="checkbox" name="remember">
          <img class="cardIcon" src="../assets/images/master-card.png?timestamp=1702466663557" alt="Master card">

          <span>**** 1234</span>
        </label> -->
      </div>
    </div>

    <div class="membership-starts">
      Membership Starts:
      <input type="hidden" class="puchaseDatepicker flatpickr-input" placeholder="Today" name="start_date" value="2023-10-02"><input class="puchaseDatepicker form-control input" placeholder="Today" tabindex="0" type="text" readonly="readonly">
    </div>

    <div class="checkout-item-box">
      <div class="checkout-row">
        <div>
          <div class="checkout-row__title planNameModal">12 Credits for tribe</div>
          <div class="planDescModal">Join the tribe offers for 3 month validity</div>
        </div>

        <div class="checkout-row__price">AED <span class="originalPriceVal">1800</span></div>
      </div>
    </div>

    <div class="total-price">

      <div class="sub-total">
        <div class="title">Sub-total</div>
        <div class="price">AED <span class="originalPriceVal">1800</span></div>
      </div>

      <div class="info-box promo">
        <div class="d-flex">
          <div class="title">Promocode</div>
          <FormKit
                type="text"
                name="promocode"
                placeholder="Promocode"    
            />
        </div>

        <div class="promocode__price">- AED 10.00</div>
      </div>

      <div class="info-box total">
        <div class="d-flex">
          <div class="title">Total</div>
          <div class="price">AED <span class="originalPriceVal">1800</span></div>
        </div>
      </div>
    </div>
    <div class="mt-4 d-flex justify-content-center ">
        <FormKit type="submit">Purchase</FormKit>
      </div>
    <!-- Save & cancel -->
    <!-- <div class="save-cancel-box">
      <div>
        <input class="facilityIdValue" type="hidden" name="facility_id" value="1">
        <input class="memberIdValue" type="hidden" name="member_id" value="1">
        <input class="planIdValue" type="hidden" name="plan_id" value="5">

        <button class="btn btn-primary btnWithProgress">Purchase</button>
        <button type="button" class="btn btn-transparent cancelBtn">Cancel</button>
      </div>
    </div> -->
  
  </FormKit>
</div>
  </template>
  
  <script setup>
  import { classOptions, timeTypeSelect } from "@/constants/member";
  import { useTagStore } from "@/store/tag";
  import { useAuthStore } from "@/store/auth";
  import { storeToRefs } from "pinia";
  import { removeObjectKeys } from "@/utils/dataCleaner";
  
  const props = defineProps({
    categories: {
      type: Array,
      default: () => [],
    },
    category: {
      tye: Object,
      default: () => {},
    },
    classData: {
      type: Object,
      default: () => {},
    },
  });
  
  const selectedCategory = ref();
  const emit = defineEmits(["reload"]);
  
  const { currentUserType } = useAuthStore();
  const classType = ref("On-site");
  const availableTagsSelected = ref([]);
  const exceptTagsSelected = ref([]);
  
  const { tags } = storeToRefs(useTagStore());
  
  const exceptTags = computed(() => {
    return tags.value
      ? tags.value
          .filter(
            (item) =>
              availableTagsSelected.value &&
              !availableTagsSelected.value.includes(item.id.toString())
          )
          .map((item) => ({ label: item.name, value: item.id }))
      : [];
  });
  
  const computedSelectedClass = computed(() => {
    return props.classData
      ? {
          ...props.classData,
          available_tags: props.classData.available_tags
            .filter((item) => item)
            .map((item) => item.id),
          except_tags: props.classData.except_tags
            .filter((item) => item)
            .map((item) => item.id),
        }
      : {};
  });
  
  const availableTags = computed(() => {
    return tags.value
      ? tags.value
          .filter(
            (item) =>
              exceptTagsSelected.value &&
              !exceptTagsSelected.value.includes(item.id.toString())
          )
          .map((item) => ({ label: item.name, value: item.id }))
      : [];
  });
  
  const addClass = async (classData) => {
    try {
      const { data } = await useFetch("/api/class/add", {
        method: "POST",
        body: {
          ...classData,
          facility_id: currentUserType?.id,
        },
      });
      if (data.value.return) {
        alert("Class added successfully!");
        emit("reload");
      } else {
        alert(data.value.message);
      }
    } catch (err) {
      console.log("Error:/api/class/add", err);
    }
  };
  
  const updateClass = async (classData) => {
    try {
      const { data } = await useFetch("/api/class/edit", {
        method: "POST",
        body: {
          ...classData,
          facility_id: currentUserType?.id,
          class_id: computedSelectedClass.value?.id,
        },
      });
      if (data.value.return) {
        alert("Class edited successfully!");
        emit("reload");
      } else {
        alert(data.value.message);
      }
    } catch (err) {
      console.log("Error:/api/class/edit", err);
    }
  };
  
  const submitHandler = async (classData) => {
    let tempData = removeObjectKeys(classData, [
      "img_src",
      "img_video",
      "updated_date",
    ]);
    // remove disabled data
    if (classData.type === "On-site" || classData.type === "Online") {
      tempData = removeObjectKeys(tempData, ["location", "googlemaps"]);
    } else if (classData.type === "Off-site" || classData.type === "On-site") {
      tempData = removeObjectKeys(tempData, ["url"]);
    }
    computedSelectedClass.value?.id
      ? updateClass(classData)
      : addClass(classData);
  };
  </script>
  
  <style lang="scss" scoped>
.modal-box.is-active {
    visibility: visible;
    height: max-content;
    right: 0;
    padding-bottom: 160px;
    min-height: 100vh;
}
.modal-box {
    position: absolute;
    border-radius: 25px 0 0 25px;
    right: -100%;
    top: 0;
    bottom: 0;
    background: #fff;
    max-width: 953px;
    width: 90%;
    z-index: 110;
    padding: 30px;
    visibility: hidden;
    transition: 650ms;
}
.buy-membership-modal .checkout-member {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}
.buy-membership-modal .checkout-member .member-avatar {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 50%;
}
.buy-membership-modal .checkout-member .member-name {
    font: 22px "Poppins Medium",sans-serif,Arial;
    color: #000;
    display: flex;
    align-items: center;
}
.buy-membership-modal .checkout-member .checkbox-container {
    margin-right: 40px;
}
.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.membership-starts {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    font-family: "Poppins Bold",sans-serif,Arial;
}
.membership-starts .puchaseDatepicker {
    width: 120px;
    margin-left: 10px;
    margin-bottom: 0;
    background: 0 0;
    text-align: center;
    border-color: #84ceff;
    border-radius: 10px;
    cursor: pointer;
}
.modal-box.is-active {
    visibility: visible;
    height: max-content;
    right: 0;
    padding-bottom: 160px;
    min-height: 100vh;
}
.buy-membership-modal .checkout-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-box.is-active {
    visibility: visible;
    height: max-content;
    right: 0;
    padding-bottom: 160px;
    min-height: 100vh;
}
.buy-membership-modal .total-price .sub-total {
    display: flex;
    justify-content: flex-end;
}
.buy-membership-modal .total-price .title {
    font: 22px "Poppins Medium",sans-serif,Arial;
    margin-right: 40px;
    color: #000;
    display: flex;
    align-items: center;
}
.buy-membership-modal .total-price .price {
    font: 22px "Poppins Bold",sans-serif,Arial;
    color: #000;
}

element.style {
}
*, ::after, ::before {
    box-sizing: border-box;
}
.buy-membership-modal .total-price .price {
    font: 22px "Poppins Bold",sans-serif,Arial;
    color: #000;
}
.buy-membership-modal .total-price .info-box.promo {
    margin-top: 20px;
    margin-bottom: 20px;
}

.buy-membership-modal .total-price .info-box.promo {
    margin-top: 20px;
    margin-bottom: 20px;
}
.buy-membership-modal .total-price .info-box.promo {
    margin-top: 20px;
    margin-bottom: 20px;
}
.buy-membership-modal .total-price .info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.modal-box.is-active {
    visibility: visible;
    height: max-content;
    right: 0;
    padding-bottom: 160px;
    min-height: 100vh;
}
.buy-membership-modal .total-price .info-box.total {
    border-top: 1px solid #000;
    padding-top: 10px;
    justify-content: flex-end;
}
.modal-box .save-cancel-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-box .save-cancel-box div {
    width: 358px;
}
.btn {
    position: relative;
    padding: 0.3rem 1.5rem;
    height: 45px;
    font-weight: 500;
    letter-spacing: .025rem;
    border-radius: 10px;
    background: #ffd500;
    border-color: #ffd500;
    width: 100%;
    color: #000;
    transition: .35s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font: 22px "Poppins Medium",sans-serif,Arial;
}
.modal-box .save-cancel-box div button.btn {
    width: 100%;
}
.modal-box .save-cancel-box div .cancelBtn {
    margin: 20px 0;
    font-size: 14px;
}.btn.btn-transparent {
    background: 0 0;
    color: #000;
    border: 0;
}
</style>
  