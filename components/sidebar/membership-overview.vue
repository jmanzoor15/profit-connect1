<template>
  <div class="content-main-box">
    <div class="content-box mb-3">
      <div class="content__title-box">
        <h1 class="content-title">Membership Overview</h1>
      </div>
      <div class="pre-text activePlanName"></div>

      <div class="joined-title">
        Joined - {{ formatDate(membersData.member.data[0].start_date) }}
      </div>

      <!-- <div v-if=" membersData.member.data[0].membership_status"  class="memberhip-graph d-flex">
      <div v-for="plan in  membersData.member.memberships" :key="plan.id">
        <div v-if="plan.status !== 'add-on'" 
        class="memberhip-graph__row1">
        <div class="graph-box" style="min-width: 276px; width: 276px; margin-left: initial">
         {{plan.plan_name}} 
          <div class="end-date-text">{{formatDate(plan.end_date) }}</div>
        </div>
        </div>
      
     

      <div v-else class="memberhip-graph__row2">
       
      </div>
    </div>
      <div class="today-line-box" style="margin-left: 367px;">
        <div class="text">Today</div>
        <div class="line"></div>
        <div class="text todayDatePreview">{{ formattedDate }}</div>
      </div>
      {{ plan }}
    </div>
    <div v-else class="no-active-plan">This member does not have a memberships</div> -->

      <!-- <div class="membership-graph ">
      <div class="d-flex">
    <div v-for="(plan, index) in sortedPlans" :key="plan.id">
      <div  v-if="plan.plan_type !== 'add-on'" class="membership-graph__row1 ">
       
       <div class="graph-box"
      :style="{
        minWidth: '276px',
        width: calculateWidth(getDaysDifference(plan.start_date, plan.end_date)) + 'px',
        marginLeft: calculateMarginOther(index, plan.plan_type) + 'px',
      }"
    >
    {{ plan.plan_name }} 
    <div class="start-date-text">{{ formatDate1(plan.start_date) }}</div>
    <div class="end-date-text">{{ formatDate1(plan.end_date) }}</div>
    </div>
      </div>
    </div>    
</div>
<div class="d-flex">
    <div v-for="(plan, index) in sortedPlans" :key="plan.id">
      <div  v-if="plan.plan_type === 'add-on'" class="membership-graph__row2 ">
      
        <div class="graph-box"
        
          :style="{
            minWidth: '276px',
            width: calculateWidth(getDaysDifference(plan.start_date, plan.end_date)) + 'px',
            marginLeft: calculateMarginAddon(index) + 'px',
          }"
        >
        
        {{ plan.plan_name }} 
        <div class="start-date-text">{{ formatDate1(plan.start_date) }}</div>
        <div class="end-date-text">{{ formatDate1(plan.end_date) }}</div>
    </div>
      </div>
     
    </div>
   

</div>
  </div> -->

      <div class="membership-graph">
        <apexchart
          type="rangeBar"
          :options="chartData.chartOptions"
          :series="chartData.series"
          height="600"
        ></apexchart>
        <div class="chart-legend">
    <ul>
      <li v-for="item in legendItems" :key="item.name" :style="{ color: item.color }">
        <span class="legend-color-box" :style="{ backgroundColor: item.color }"></span>
        {{ item.name }}
      </li>
    </ul>
  </div>
      </div>
    </div>

    <div class="content-box">
      <div class="content__title-box">
        <h1 class="content-title">Membership Packages</h1>

        <div class="filter-box packagesByStatus">
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'All' }"
            @click="selectFilter('All')"
            >All</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'Unlimited' }"
            @click="selectFilter('Unlimited')"
            >Unlimited</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'Credits' }"
            @click="selectFilter('Credits')"
            >Credits</a
          >
          <a
            href="#"
            class="filter-option"
            :class="{ 'is-active': selectedFilter === 'add-on' }"
            @click="selectFilter('add-on')"
            >Add-on</a
          >
        </div>
      </div>

      <div class="membership-packages">
        <div
          class="mm-package purchaseBoxBtn"
          v-for="(plan, index) in computedPlanDetails"
          :key="index"
          @click="selectPlan(plan.id)"
        >
          <div class="mmPackageAdd" @click="showCatrgoryForm = true">
            <img
              src="~/assets/images/svg/plus-icon.svg?timestamp=1701415748096"
            />
          </div>
          <div class="mm-package__title">{{ plan.name }}</div>
          <div class="mm-package__data">
            <img
              src="~/assets/images/svg/tag-icon.svg?timestamp=1701415748096"
            />
            AED {{ plan.price }}
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
    default: "",
  },
});
const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

let currentDate = new Date();
let formattedDate =
  currentDate.getDate() +
  " " +
  currentDate.toLocaleString("default", { month: "long" }) +
  " " +
  currentDate.getFullYear();


  



const baseWidth = 10;

const plans = ref ([
  {
    id: "105",
    plan_name: "12 Credits for Tribe",
    plan_desc: "Join tribe for 12 credits",
    plan_type: "credits",
    plan_price: "1800",
    plan_status: "Future",
    start_date: "2023-07-01",
    end_date: "2023-08-01",
  },
  {
    id: "106",
    plan_name: "Monthly Unlimited",
    plan_desc: "Unlimited access for a month",
    plan_type: "unlimited",
    plan_price: "1500",
    plan_status: "Active",
    start_date: "2023-04-02",
    end_date: "2023-05-28",
  },
  {
    id: "107",
    plan_name: "6-Month Pass",
    plan_desc: "Access for 6 months",
    plan_type: "unlimited",
    plan_price: "8000",
    plan_status: "Expired",
    start_date: "2023-01-01",
    end_date: "2023-03-01",
  },
  {
    id: "108",
    plan_name: "Summer Special",
    plan_desc: "Special rates for the summer",
    plan_type: "add-on",
    plan_price: "2500",
    plan_status: "Future",
    start_date: "2023-07-01",
    end_date: "2023-07-31",
  },
  {
    id: "111",
    plan_name: "Weekend Warrior",
    plan_desc: "Weekend access for a month",
    plan_type: "unlimited",
    plan_price: "600",
    plan_status: "Active",
    start_date: "2023-07-01",
    end_date: "2023-07-31",
  },
  {
    id: "112",
    plan_name: "Couples Special",
    plan_desc: "Special plan for couples",
    plan_type: "add-on",
    plan_price: "3000",
    plan_status: "Expired",
    start_date: "2023-01-15",
    end_date: "2023-05-15",
  },
  // ... other plans ...
  {
    id: "113",
    plan_name: "New Year Challenge2",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "unlimited",
    plan_price: "2000",
    plan_status: "Future",
    start_date: "2023-09-01",
    end_date: "2023-11-31",
  },
  {
    id: "114",
    plan_name: "New Year Challenge",
    plan_desc: "Kickstart the year with a challenge",
    plan_type: "add-on",
    plan_price: "2000",
    plan_status: "Future",
    start_date: "2023-09-01",
    end_date: "2023-09-30",
  },
  // {
  //   id: "115",
  //   plan_name: "New Year Challenge 3",
  //   plan_desc: "Kickstart the year with a challenge",
  //   plan_type: "add-on",
  //   plan_price: "2000",
  //   plan_status: "Future",
  //   start_date: "2024-07-15",
  //   end_date: "2024-08-14",
  // },
  // {
  //   id: "105",
  //   plan_name: "12 Credits for Tribe",
  //   plan_desc: "Join tribe for 12 credits",
  //   plan_type: "credits",
  //   plan_price: "1800",
  //   plan_status: "Future",
  //   start_date: "2025-07-01",
  //   end_date: "2025-08-01",
  // },
]);

function formatPlansData(plans) {
  return plans.map(plan => {
    let color;

    // Check the plan status to determine the color
    switch (plan.plan_status) {
      case "Active":
        color = "#008FFB"; 
        break;
      case "Expired":
        color = "#FF4500"; 
        break;
      case "Future":
        color = "#00E396"; 
        break;
      
    }

    return {
      x: plan.plan_type, // Use plan_name as the x value
      y: [
        new Date(plan.start_date).getTime(),
        new Date(plan.end_date).getTime()
      ],
      fillColor: color
    };
  });
}


function createTooltipFormatter(plans) {
  return function(val, opts) {
    if (opts && typeof opts.dataPointIndex !== 'undefined') {
      const plan = plans[opts.dataPointIndex];
      if (plan) {
        const startDate = new Date(plan.start_date);
        const endDate = new Date(plan.end_date);
        const dateRange = formatDate2(startDate) + ' - ' + formatDate(endDate);
        return `${plan.plan_name}<br>${dateRange}`;
      }
    }
    // Return an empty string when there's no valid plan data
    return '';
  };
}

function formatDate2(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

const legendItems = ref([
  { name: 'Active', color: '#008FFB' },
  { name: 'Expired', color: '#FF4500' },
  { name: 'Future', color: '#00E396' }
]);



const chartData = ref({
  chartOptions: {
    chart: {
    type: 'rangeBar',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
      autoSelected: 'zoom' // Default tool for selection
    },
  },
           plotOptions: {
              bar: {
                horizontal: true,
                barHeight: '50%',
              }
            },
            legend: {
      show: true,
      position: 'top'
    },
  
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                  var a = new Date(val[0]);
                  var b = new Date(val[1]);
                  var diff = (b - a) / (1000 * 60 * 60 * 24); // Convert milliseconds difference to days
                  diff = Math.round(diff); // Round off the result
                  return diff + (diff > 1 ? ' days' : ' day');
                }
              },
              tooltip: {
      enabled: true,
        show: true,
     x: {
      formatter: createTooltipFormatter(plans.value)
     }  
      },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
              }
            },
            xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM yyyy', // Format the labels to show month and year (e.g., Jan 2020)
      },
      // Enable scrolling if the data range is large
      tickAmount: 12, // Adjust this number based on how many labels you want to show at once
    },
            
          },
          
          series: [
        {
            name: 'Plan',
            data: formatPlansData(plans.value) // Incorporating formatted plans data
        }
    ]

});
// const sortedPlans = computed(() => {
//   return plans.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
// });
// function getPlanStyle(plan, index) {
//   const width = calculateWidth(
//     getDaysDifference(plan.start_date, plan.end_date)
//   );
//   const marginLeft =
//     plan.plan_type === "add-on"
//       ? calculateMarginAddon(index)
//       : calculateMarginOther(index, plan.plan_type);

//   return {
//     minWidth: "276px",
//     width: width + "px",
//     marginLeft: marginLeft + "px",
//   };
// }

// function calculateWidth(days) {
//   return days * baseWidth; // Use the base width to calculate the plan width
// }

// function calculateMarginOther(index, planType) {
//   // Skip margin calculation for 'add-on' plans
//   if (planType === "add-on") {
//     return 0;
//   }

//   let previousNonAddonPlan = null;
//   for (let i = index - 1; i >= 0; i--) {
//     if (sortedPlans.value[i].plan_type !== "add-on") {
//       previousNonAddonPlan = sortedPlans.value[i];
//       break;
//     }
//   }

//   if (!previousNonAddonPlan) {
//     return 0;
//   }

//   const gapDays = getDaysDifference(
//     previousNonAddonPlan.end_date,
//     sortedPlans.value[index].start_date
//   );

//   if (gapDays < 0) {
//     return 0;
//   }

//   return gapDays * 5;
// }

// function calculateMarginAddon(index) {
//   let previousPlan = null;
//   let closestOverlap = Infinity; // Start with a very large value

//   for (let i = index - 1; i >= 0; i--) {
//     const currentPlan = sortedPlans.value[index];
//     const comparedPlan = sortedPlans.value[i];

//     // Check if the comparedPlan overlaps with or is immediately before the currentPlan
//     if (new Date(comparedPlan.end_date) >= new Date(currentPlan.start_date)) {
//       const overlap = getDaysDifference(
//         comparedPlan.start_date,
//         currentPlan.start_date
//       );

//       // If the overlap is smaller than the closestOverlap found so far, update closestOverlap
//       if (overlap < closestOverlap) {
//         closestOverlap = overlap;
//         previousPlan = comparedPlan;
//       }
//     }
//   }

//   // If no overlapping or immediate plan is found, return 0
//   if (!previousPlan || closestOverlap < 0) {
//     let previousNonAddonPlan = null;
//     for (let i = index - 1; i >= 0; i--) {
//       if (sortedPlans.value[i].plan_type === "add-on") {
//         previousNonAddonPlan = sortedPlans.value[i];
//         break;
//       }
//     }
//     const gapDays = getDaysDifference(
//       previousNonAddonPlan.end_date,
//       sortedPlans.value[index].start_date
//     );
//     if (gapDays < 0) {
//       return 0;
//     }

//     return gapDays * 5;
//   }

//   // Use the overlap to calculate margin (adjust the multiplier as needed)
//   return closestOverlap * 4.4;
// }

// const getDaysDifference = (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   return (end - start) / (1000 * 60 * 60 * 24);
// };

// // Format date function (you can adjust the format as needed)
// const formatDate1 = (dateString) => {
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return new Date(dateString).toLocaleDateString(undefined, options);
// };

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
const selectedPlanId = ref("");
const selectedPlanDetails = ref(null);
const selectedFilter = ref("All");

defineEmits(["edit"]);

const { data: membersData, pending: membersPending } = await useFetch(
  "/api/member/info",
  {
    query: { facility_id: currentUserType?.id, member_id: props.memberId },
  }
);

const { data, pending } = await useFetch(`/api/member/overview`, {
  query: { facility_id: currentUserType?.id },
});

const ComputedPackage = computed(() => {
  if (data.value && data.value.packages) {
    return data.value.packages
      .filter((pkg) => pkg.status === "Active")
      .filter((pkg) => pkg.plans && pkg.plans.length > 0)
      .flatMap((pkg) => pkg.plans);
  }
  return [];
});
const computedPlanDetails = computed(() => {
  return ComputedPackage.value.reduce((acc, plan) => {
    if (
      plan !== null &&
      (selectedFilter.value === "All" || plan.type === selectedFilter.value)
    ) {
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
        exceptTags: plan.exceptTags,
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
  selectedPlanDetails.value = computedPlanDetails?.value.find(
    (plan) => plan.id === planId
  );
  showPurchaseForm.value = true;
};

const formatDate = (dateString: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
</script>
<style lang="scss" scoped>
.content-main-box .content-box {
  position: relative;
  width: 65vw;
  max-width: 950px;
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
  font-family: "Poppins Bold", sans-serif, Arial;
  margin-bottom: 10px;
}
.membership-graph {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 40px 30px 70px;
}
.membership-graph .membership-graph__row1 {
  display: flex;
  margin-bottom: 20px;
}

element.style {
  min-width: 276px;
  width: 276px;
  margin-left: initial;
}
.membership-graph .membership-graph__row1 .graph-box {
  height: 130px;
}
.membership-graph .graph-box {
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
  font-family: "Poppins Medium", sans-serif, Arial;
}
.membership-graph .memberhip-graph__row2 {
  display: flex;
}
.membership-graph .membership-graph__row2 .graph-box {
  height: 50px;
  margin-top: 20px;
}
.membership-graph .end-date-text {
  color: #84ceff;
  height: 23px;
  position: absolute;
  bottom: -30px;
  right: 0;
  font-family: "Poppins Regular", sans-serif, Arial;
}
.start-date-text {
  color: #84ceff;
  height: 23px;
  position: absolute;
  bottom: -30px;
  left: 10px;
  font-family: "Poppins Regular", sans-serif, Arial;
}
element.style {
  margin-left: 367px;
}
.membership-graph .today-line-box {
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
.membership-graph .today-line-box .text {
  width: 100%;
  display: flex;
  justify-content: center;
}
.membership-graph .today-line-box .line {
  height: 100%;
  width: 2px;
  background: #ffd500;
}
.membership-graph .today-line-box .text {
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
  transition: 0.35s;
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
  font: 14px "Poppins Bold", sans-serif, Arial;
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
.chart-legend ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.chart-legend li {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.legend-color-box {
  width: 15px;
  height: 15px;
  display: block;
  margin-right: 5px;
  border-radius: 3px;
}
</style>
