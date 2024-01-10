<template>
  <div class="member-attendance">
    <div class="d-flex justify-content-between my-4 gap-4">
      <h1 style="font-size: 22px; margin-bottom: 0px">Attendance</h1>
      <MixBtnGroup
        v-model="selectedDuration"
        :labels="['This Week', 'This Month', 'This Year']"
      />
      <div class="d-flex gap-2">
        <FormKit type="date" help="Start Date" v-model="startDate" />
        <FormKit type="date" help="End Date" v-model="endDate" />
      </div>
    </div>
    <div>
      <MixBtnGroup
        v-model="selectedClass"
        :labels="['All', 'Cardio', 'Combat', 'Shape', 'Strength']"
      />
      <div class="d-flex justify-content-between">
        <MemberInfo>
          <template #number>18 </template>
          <template #label>
            Workouts <br />
            Completed
          </template>
          <template #value>
            <span class="negative">-7%</span> Last Month<br />
            <span class="positive">+15%</span> Last Year
          </template>
        </MemberInfo>
        <MemberInfo>
          <template #number>3 </template>
          <template #label> No Shows / <br />Cancellations </template>
          <template #value>
            <span class="negative">-25%</span> Last Month<br />
            <span class="positive">+15%</span> Last Year
          </template>
        </MemberInfo>
        <MemberInfo>
          <template #number>35 </template>
          <template #label>
            Workouts <br />
            Year-to-date
          </template>
          <template #value>
            <span class="positive">+15%</span> Last Year
          </template>
        </MemberInfo>
      </div>

      <MemberAttendanceChart />
      <div class="row my-4">
        <div class="col-7">
          <MemberCommonPerCategory />
        </div>
        <div class="col-5">
          <MemberCommonInfoCard
            class="mb-2"
            title="Preferred Time Slot"
            :items="[
              { label: '7:30 AM', value: '55%' },
              { label: '8:30 AM', value: '25%' },
              { label: 'Other', value: '15%' },
            ]"
          />
          <MemberCommonInfoCard
            title="Preferred Days of the Week"
            :items="[
              { label: 'Monday', value: '24%' },
              { label: 'Wednesday', value: '23%' },
              { label: 'Other', value: '15%' },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  memberInfo: {
    type: Object,
    default: () => {},
  },
});

// const { memberId } = toRefs(props);
// const route = useRoute();
// const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

  
//       setBreadcrumb({
//         items: [
//           { label: "Manage", link: "/" },
//           { label: "Members", link: "/" },
//         ],
//       });
 
//       setBreadcrumbTab({
//         items: [
//           {
//             label: "Membership",
//             link: `/members/${memberId.value}/membership-overview`,
//           },
//           { label: "Payment", link: `/members/${memberId.value}/payment` },
//           {
//             label: "Attendance",
//             link: `/members/${memberId.value}/attendance`,
//           },
//           { label: "Wellness", link: `/members/${memberId.value}/wellness` },
//           {
//             label: "Assessments",
//             link: `/members/${memberId.value}/assessments`,
//           },
//           { label: "Nutrition", link: `/members/${memberId.value}/nutrition` },
//           {
//             label: "Transformation",
//             link: `/members/${memberId.value}/transformations`,
//           },
//           { label: "Friends", link: `/members/${memberId.value}/friends` },
//           { label: "Badges", link: `/members/${memberId.value}/badges` },
//           { label: "Notes", link: `/members/${memberId.value}/notes` },
//           { label: "Activity", link: `/members/${memberId.value}/activity` },
//         ],
//       });
definePageMeta({
  layout: "member",
});
const selectedDuration = ref(1);
const selectedClass = ref(1);
const startDate = ref("");
const endDate = ref("");
</script>
