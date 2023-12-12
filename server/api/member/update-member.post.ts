import useApiFetch from "~/composables/useApi";
import { cleanObjectL1 } from "@/utils/dataCleaner";

export default defineEventHandler(async ($event) => {
  const body = await readBody($event);
 
  const api = useApiFetch($event);
  const resp = await api("/members/update/member", {
    method: "POST",
    body: cleanObjectL1(body),
  });
  console.log(body)
  return resp;
});