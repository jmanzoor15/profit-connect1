<template>
  <div>
    <NavigationHeader />
    <NavigationBreadcrumb />
    <main>
      <section class="container">
        <div class="row">
          <div class="col-4">
            <MemberUpdate :memberId="memberId.toString()" :memberInfoData="data" />
          </div>
          <div class="col-8 bg-white">
            <NuxtPage :memberInfo="data?.member" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const { currentUserType } = useAuthStore();
const memberId = useRoute().params.id;
const { data, pending } = await useFetch(`/api/member/info`, {
  query: { facility_id: currentUserType?.id, member_id: memberId },
});
</script>
