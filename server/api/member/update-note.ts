import useApiFetch from "~/composables/useApi";
import { cleanObjectL1 } from "@/utils/dataCleaner";

export default defineEventHandler(async ($event) => {
  const api = useApiFetch($event);
  const body = await readBody($event);
  console.log(body);
  const resp = await api("/members/update/notes", {
    method: "POST",
    body: cleanObjectL1(body),
  });
  return resp;
});
