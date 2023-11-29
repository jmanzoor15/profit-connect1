import { defineStore, acceptHMRUpdate } from "pinia";
import { useAuthStore } from "./auth";

export const useTagStore = defineStore("tags", () => {
  const { currentUserType } = useAuthStore();
  const facility_id = currentUserType?.id;
  const tags = ref();

  const getAllTags = async () => {
    if (facility_id) {
      try {
        const data = await fetch(`/api/tags/?facility_id=${facility_id}`).then(
          (response) => response.json()
        );

        tags.value = data.tags;
      } catch (err) {
        console.log("Error:/api/tags", err);
      }
    }
  };

  getAllTags();

  return {
    tags,
    getAllTags,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTagStore, import.meta.hot));
}
