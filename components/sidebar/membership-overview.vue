<template> 

<div class="content-main-box">
  <div class="content-box mb-3" >
    <div class="content__title-box">
      <h1 class="content-title">Membership Overview</h1>
    </div>
    <div class="pre-text activePlanName"></div>

    
    <div class="joined-title">Joined - {{ formatDate(membersData.member.data[0].start_date)}}</div>

    <div v-if=" membersData.member.data[0].membership_status"  class="memberhip-graph">
      <div v-for="plan in  membersData.member.memberships" :key="plan.id" class="memberhip-graph__row1">
        <div class="graph-box" style="min-width: 276px; width: 276px; margin-left: initial">
         {{plan.plan_name}}
          <div class="end-date-text">{{formatDate(plan.end_date) }}</div>
        </div>
        </div>

      <div class="memberhip-graph__row2"></div>

      <div class="today-line-box" style="margin-left: 367px;">
        <div class="text">Today</div>
        <div class="line"></div>
        <div class="text todayDatePreview">December 1</div>
      </div>
      {{ plan }}
    </div>
    <div v-else class="no-active-plan">This member does not have a memberships</div>

    <!-- {{ membersData.member.memberships }} -->
  </div>
  <div class=" content-box">
    <div class="content__title-box">
      <h1 class="content-title">Membership Packages</h1>

      <div class="filter-box packagesByStatus">
        <a href="#" class="filter-option" :class="{ 'is-active': selectedFilter === 'All' }" @click="selectFilter('All')">All</a>
        <a href="#" class="filter-option" :class="{ 'is-active': selectedFilter === 'Unlimited' }" @click="selectFilter('Unlimited')">Unlimited</a>
        <a href="#" class="filter-option" :class="{ 'is-active': selectedFilter === 'Credits' }" @click="selectFilter('Credits')">Credits</a>
        <a href="#" class="filter-option" :class="{ 'is-active': selectedFilter === 'add-on' }" @click="selectFilter('add-on')">Add-on</a>
      </div>
    </div>

    <div  class="membership-packages"  >   
      <div  class="mm-package purchaseBoxBtn" 
      v-for="(plan, index) in computedPlanDetails" :key="index"
          @click="selectPlan(plan.id)" >
          <div  class="mmPackageAdd"   @click="showCatrgoryForm = true">
            <img src="~/assets/images/svg/plus-icon.svg?timestamp=1701415748096" >
          </div>
          <div class="mm-package__title">{{plan.name}}  </div>
          <div class="mm-package__data">
            <img src="~/assets/images/svg/tag-icon.svg?timestamp=1701415748096" >
            AED {{plan.price}} 
          </div>
        </div>
      </div>
  </div>
</div>
<Modal v-model="showPurchaseForm" id="purchase-modal">
      <FormMemberAddplan 
        :member-info="membersData"
        :selected-plan-id="selectedPlanDetails"
       />
    </Modal>

</template>
  
<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
const { currentUserType } = useAuthStore();
const props = defineProps({
  memberId: {
    type: String,
    default: ''
  },
});
const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

  
      setBreadcrumb({
        items: [
          { label: "Manage", link: "/" },
          { label: "Members", link: "/" },
        ],
      });
 
      setBreadcrumbTab({
        items: [
          {
            label: "Membership",
            link: `/members/${memberId.value}/membership-overview`,
          },
          { label: "Payment", link: `/members/${memberId.value}/payment` },
          {
            label: "Attendance",
            link: `/members/${memberId.value}/attendance`,
          },
          { label: "Wellness", link: `/members/${memberId.value}/wellness` },
          {
            label: "Assessments",
            link: `/members/${memberId.value}/assessments`,
          },
          { label: "Nutrition", link: `/members/${memberId.value}/nutrition` },
          {
            label: "Transformation",
            link: `/members/${memberId.value}/transformations`,
          },
          { label: "Friends", link: `/members/${memberId.value}/friends` },
          { label: "Badges", link: `/members/${memberId.value}/badges` },
          { label: "Notes", link: `/members/${memberId.value}/notes` },
          { label: "Activity", link: `/members/${memberId.value}/activity` },
        ],
      });
    

const showPurchaseForm = ref(false);
const selectedPlanId = ref('');
const selectedPlanDetails = ref(null);
const selectedFilter = ref('All');

defineEmits(["edit"]);

    const { data: membersData, pending: membersPending} = await useFetch("/api/member/info", {
  query: { facility_id: currentUserType?.id, member_id: props.memberId  },
});
 

const { data, pending } = await useFetch(`/api/member/overview`, {
      query: { facility_id: currentUserType?.id },
    });

    const ComputedPackage = computed(() => {
  if (data.value && data.value.packages) {
    return data.value.packages
      .filter(pkg => pkg.status === 'Active')
      .filter(pkg => pkg.plans && pkg.plans.length > 0) 
      .flatMap(pkg => pkg.plans);
  }
  return []; 
});
const computedPlanDetails = computed(() => {
  return ComputedPackage.value.reduce((acc, plan) => {
    if (plan !== null && (selectedFilter.value === 'All' || plan.type === selectedFilter.value)) {
      acc.push({
        id: plan.id,
        name: plan.name,
        description: plan.desc,
        private: plan.private,
        price: plan.price,
        card: plan.card,
        gift: plan.gift,
        type: plan.type,
        duration: plan.duration,
        period: plan.period,
        category: plan.category,
        creditCount: plan.creditCount,
        paymentDuration: plan.paymentDuration,
        paymentPeriod: plan.paymentPeriod,
        paymentCycle: plan.paymentCycle,
        chargeOnFirst: plan.chargeOnFirst,
        autoRenew: plan.autoRenew,
        firstClassFree: plan.firstClassFree,
        updatedDate: plan.updatedDate,
        promotionPrice: plan.promotionPrice,
        displayOriginalPrice: plan.displayOriginalPrice,
        promotionStart: plan.promotionStart,
        promotionEnd: plan.promotionEnd,
        joiningFee: plan.joiningFee,
        featured: plan.featured,
        classes: plan.classes,
        room: plan.room,
        availableTags: plan.availableTags,
        exceptTags: plan.exceptTags
      });
    }
    return acc;
  }, []);
});

const selectFilter = (filterType) => {
  selectedFilter.value = filterType;
};

const selectPlan = (planId) => {
  selectedPlanId.value = planId;
  selectedPlanDetails.value = computedPlanDetails?.value.find(plan => plan.id === planId);
  showPurchaseForm.value = true;
};

const formatDate = (dateString :Date)=>{
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

</script>
<style lang="scss" scoped>
.content-main-box .content-box {
    position: relative;
    width: 65vw;
    max-width: 950px
}
.content-main-box .content-box {
    position: relative;
    width: 65vw;
    max-width: 950px;
    min-height: 300px;
}
.content-main-box .content__title-box {
    justify-content: space-between;
    margin-bottom: 15px;
}
.content__title-box h1 {
    font-size: 22px;
    margin-bottom: 0;
}
.content-main-box .pre-text {
    margin-bottom: 20px;
}
.content-main-box .no-active-plan {
    text-align: center;
    margin-top: 70px;
}
.joined-title {
    font-family: "Poppins Bold",sans-serif,Arial;
    margin-bottom: 10px;
}
.memberhip-graph {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 40px 30px 70px;
}
.memberhip-graph .memberhip-graph__row1 {
    display: flex;
}

element.style {
    min-width: 276px;
    width: 276px;
    margin-left: initial;
}
.memberhip-graph .memberhip-graph__row1 .graph-box {
    height: 130px;
}
.memberhip-graph .graph-box {
    position: relative;
    background: #f2faff;
    border: 1px solid #84ceff;
    border-radius: 7px;
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Poppins Medium",sans-serif,Arial;
}
.memberhip-graph .end-date-text {
    color: #84ceff;
    height: 23px;
    position: absolute;
    bottom: -30px;
    right: 0;
    font-family: "Poppins Regular",sans-serif,Arial;
}

element.style {
    margin-left: 367px;
}
.memberhip-graph .today-line-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    position: absolute;
    top: 0;
    bottom: 70px;
    color: #ffd500;
    text-align: center;
    width: 2px;
}
.memberhip-graph .today-line-box .text {
    width: 100%;
    display: flex;
    justify-content: center;
}
.memberhip-graph .today-line-box .line {
    height: 100%;
    width: 2px;
    background: #ffd500;
}
.memberhip-graph .today-line-box .text {
    width: 100%;
    display: flex;
    justify-content: center;
}

// second content box 

.filter-box {
    display: flex;
}
.filter-box .filter-option.is-active {
    color: #000;
    border: 2px solid #84ceff;
}
.filter-box .filter-option {
    color: #ccc;
    padding: 8px 12px;
    margin-right: 10px;
    border: 2px solid #f1f2f2;
    border-radius: 10px;
    text-decoration: none;
    transition: .35s;
    height: fit-content;
}
.membership-packages {
    display: flex;
    flex-wrap: wrap;
}
.mm-package {
    display: flex;
    align-items: center;
    background: #f2faff;
    max-width: 260px;
    margin: 0 7px;
    width: calc(33% - 20px);
    height: 60px;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 7px;
}
.mm-package .mmPackageAdd {
    padding-right: 12px;
}
.mm-package .mmPackageAdd img {
    min-width: 20px;
    width: 20px;
    height: 20px;
}
.mm-package__title {
    font: 14px "Poppins Bold",sans-serif,Arial;
    width: 200px;
    padding-right: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mm-package__data {
    display: flex;
    min-width: fit-content;
    margin-left: auto;
}
.mm-package__data img {
    margin-right: 10px;
}
</style>