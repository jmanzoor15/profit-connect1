import { defineStore } from "pinia";
import type { IBreadcrumb } from "~/types/breadcrumb";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const breadcrumb = ref();
  const breadcrumbTab = ref();
  const setBreadcrumb = (item: IBreadcrumb) => {
    breadcrumb.value = item;
  };
  const unsetBreadcrumb = () => {
    breadcrumb.value = undefined;
  };
  const setBreadcrumbTab = (item: IBreadcrumb) => {
    breadcrumbTab.value = item;
  };
  const unsetBreadcrumbTab = () => {
    breadcrumbTab.value = undefined;
  };
  return {
    breadcrumb,
    breadcrumbTab,
    setBreadcrumb,
    unsetBreadcrumb,
    setBreadcrumbTab,
    unsetBreadcrumbTab,
  };
});
