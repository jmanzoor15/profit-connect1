// composable
import { useBreadcrumbStore } from "~/store/breadcrumb";

export default () => {
  const {
    setBreadcrumb,
    unsetBreadcrumb,
    setBreadcrumbTab,
    unsetBreadcrumbTab,
  } = useBreadcrumbStore();

  onBeforeRouteLeave(()=>{
    unsetBreadcrumb();
    unsetBreadcrumbTab();
  })

  return {
    setBreadcrumb,
    setBreadcrumbTab,
  };
};
