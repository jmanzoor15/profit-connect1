import { defineStore } from "pinia";
import type { IBreadcrumb } from "~/types/breadcrumb";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const breadcrumb = ref();
  const setBreadcrumb = (item: IBreadcrumb) => {
    breadcrumb.value = item;
  };
  const unsetBreadcrumb = () => {
    breadcrumb.value = undefined;
  };
  return {
    breadcrumb,
    setBreadcrumb,
    unsetBreadcrumb,
  };
});
