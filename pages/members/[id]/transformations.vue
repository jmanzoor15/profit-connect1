<template>
  <div class="member-attendance">
    <div class="d-flex justify-content-between my-4 gap-4">
      <h1 style="font-size: 22px; margin-bottom: 0px">Transformation</h1>

      <div class="d-flex gap-3">
        <div class="py-3 fw-bold">99 Days</div>
        <FormKit type="date" help="Start Date" v-model="startDate" />
        <FormKit type="date" help="End Date" v-model="endDate" />
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between">
        <MemberInfo>
          <template #number>11 </template>
          <template #label>
            Weight <br />
            Loss (kg)
          </template>
          <template #value>
            <span class="positive">-16%</span>
          </template>
        </MemberInfo>
        <MemberInfo>
          <template #number>12 </template>
          <template #label>
            Fat <br />
            Loss (kg)
          </template>
          <template #value>
            <span class="positive">-34%</span>
          </template>
        </MemberInfo>
        <MemberInfo>
          <template #number>4 </template>
          <template #label> Muscle <br />Gain (kg) </template>
          <template #value>
            <span class="negative">-17%</span>
          </template>
        </MemberInfo>
      </div>
      <MemberTransformationBeforeAfter/>
      <div class="row my-4">
        <div class="col-7">
          <MemberCommonPerCategory />
        </div>
        <div class="col-5">
          <MemberCommonInfoCard
            class="mb-2"
            title="Caloric Intake"
            titleValue="Target 2000 kcal"
            :items="[
              { label: 'Overall Average', value: '1450 kcal' },
              { label: 'Average This Week', value: '1620 kcal' },
              { label: 'Average Last Week', value: '1515 kcal' },
            ]"
          />
          <MemberCommonInfoCard
            title="Hydration"
            titleValue="Target 3000 ml"
            :items="[
              { label: 'Overall Average', value: '2850 ml' },
              { label: 'Average This Week', value: '2705 ml' },
              { label: 'Average Last Week', value: '3105 ml' },
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
definePageMeta({
  layout: "member",
});
const selectedDuration = ref(1);
const selectedClass = ref(1);
const startDate = ref("");
const endDate = ref("");
</script>
