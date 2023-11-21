import { useBreadcrumbStore } from "~/store/breadcrumb";

export default () => {
  const { setBreadcrumb, unsetBreadcrumb } = useBreadcrumbStore();

  onUnmounted(() => {
    unsetBreadcrumb();
  });

  return {
    setBreadcrumb,
  };
};
