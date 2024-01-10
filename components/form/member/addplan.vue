<template>
  <div id="buyMembershipModal" class="modal-box buy-membership-modal is-active" v-if="selectedPlanId">
    <h3 class="text-center">Purchase Item</h3>
    <FormKit
      type="form"
      #default="{value}"
      @submit="submitHandler"
      :actions="false"
    >
    <div class="checkout-member">
      <div class="d-flex">
        <img class="member-avatar" :src="getImageUrl(getMemberInfo.image)"    />
        <div class="member-name memberNameModal">{{ getMemberInfo.firstname }} {{ getMemberInfo.lastname }}</div>
      </div>

      <div class="d-flex">
        <!-- <FormKit
            name="type"
            type="radio"
            v-model="classType"
            :options="classOptions"
          /> -->
        
        <!-- <label class="checkbox-container">
          <input type="checkbox" name="remember">
          <img class="cardIcon" src="../assets/images/master-card.png?timestamp=1702466663557" alt="Master card">

          <span>**** 1234</span>
        </label> -->
      </div>
    </div>
    <div class="col-4">
      <FormKit
        type="date"
        name="date"
        :value="today"
        @input="updateDate"
        validation-visibility="live"
      />
      <!-- <FormKit
        type="hidden"
        v-model="selectedPlanId.price"
        name="price"
      /> -->
    </div>
    <div class="membership-starts">
      Membership Starts:
      <!-- <input type="hidden" class="puchaseDatepicker flatpickr-input" placeholder="Today" name="start_date" :value=" getMemberInfo.start_date "> -->
      
      <input class="puchaseDatepicker form-control input" placeholder="Today" tabindex="0" type="text" readonly="readonly" :value="displayDate" >
    </div>
    <div class="checkout-item-box">
      <div class="checkout-row">
        <div>
          <div class="checkout-row__title planNameModal">{{ selectedPlanId.name }}</div>
          <div class="planDescModal">{{selectedPlanId.desc}}</div>
        </div>

        <div class="checkout-row__price">AED <span class="originalPriceVal">{{ selectedPlanId.price }}</span></div>
      </div>
    </div>

    <div class="total-price">

      <div class="sub-total">
        <div class="title">Sub-total</div>
        <div v-if="selectedPlanId.promotionPrice" class="price">AED
          <span class="originalPriceVal">{{selectedPlanId.promotionPrice}}</span>
        </div>
        <div v-else class="price">AED <span class="originalPriceVal">{{selectedPlanId.price}} </span>
        </div>
      </div>

      <div class="info-box promo">
        <div class="d-flex">
          <div class="title">Promocode</div>
          <!-- <FormKit
                type="text"
                name="promocode"
                placeholder="Promocode"    
            /> -->
        </div>

        <div class="promocode__price">- AED 10.00</div>
      </div>

      <div class="info-box total">
        <div class="d-flex">
          <div class="title">Total</div>
          <div  v-if="selectedPlanId.promotionPrice" class="price">AED 
            <span class="originalPriceVal">{{selectedPlanId.promotionPrice}}</span>
          </div>
          <div  v-else class="price">AED <span class="originalPriceVal">{{selectedPlanId.price}}</span></div>
        </div>
      </div>
    </div>
    <div class="save mt-4 d-flex justify-content-center ">
        <FormKit type="submit">Purchase</FormKit>
      </div>
  <pre>{{ value }}</pre>
  </FormKit>
</div>
  </template>

<script lang="ts" setup>
  import { useAuthStore } from "@/store/auth";
  const { $toast } = useNuxtApp();
  
  const emit = defineEmits();
  const { getUrl: getImageUrl } = useBoImage();
  const props = defineProps({
    memberInfo: {
      type: Object,
    default: () => {},
  },
  selectedPlanId: {
    type: Object,
    default: () => {},
  },
  });
  const { currentUserType } = useAuthStore();

  const submitHandler = async (purchaseData : any) => {    
  try {
    const { data } = await useFetch("/api/member/add-plan", {
      method: "POST",
      body: {
        
        start_date: purchaseData.date,
        facility_id: currentUserType?.id,
        plan_id: props.selectedPlanId.id,
        member_id: getMemberInfo.value.id
      },
    });
    if (data.value.return) {
      emit("reload");
      $toast("Plan added successfully!");
    } else {
      $toast(data.value.message);
    }
  } catch (err) {
    console.log("Error:/api/member/add-plan", err);
  }

};

  const classType = ref("Card");
             

          const today = new Date().toISOString().split('T')[0];
          const selectedDate = ref(today);
      
          const displayDate = computed(() => {
            return selectedDate.value === today ? 'Today' : selectedDate.value;
          });

          const updateDate = (newDate) => {
            selectedDate.value = newDate;
          };

       const getMemberInfo = computed(() => {

       if (props.memberInfo && props.memberInfo.member && props.memberInfo.member.data && props.memberInfo.member.data.length > 0) {
        const memberData = props.memberInfo.member.data[0];
       
    
      return {
      id: memberData.id,
      firstname: memberData.firstname,
      lastname: memberData.lastname,
      image: memberData.img_src,
      membership_status: memberData.membership_status,
     
     
    };
  }

  return {};
});
  

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
.buy-membership-modal .total-price {
    background: #fff;
    position: absolute;
    bottom: 150px;
    right: 30px;
    left: 30px;
}
.save {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
}
.buy-membership-modal .checkout-member {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    margin-top: 30px;
}
.buy-membership-modal .checkout-row__title {
    color: #000;
    font: 22px "Poppins Medium",sans-serif,Arial;
}
.buy-membership-modal .checkout-member .member-avatar {
    width: 60px;
    height: 60px;
    margin-right: 15px;
    border-radius: 50%;
}
.buy-membership-modal .checkout-row__price {
    font-size: 22px;
    font-family: "Poppins Medium",sans-serif,Arial;
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
  