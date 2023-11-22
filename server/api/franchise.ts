import useApiFetch from "~/composables/useApi";

export default defineEventHandler(async (event) => {
  const api = useApiFetch(event);
  const resp = await api("/get/franchise");

  return resp;
});
