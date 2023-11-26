import { createInput } from "@formkit/vue";
import Uppy from "@/components/formkit/Uppy.vue";

// When integrating tailwind add classes here
export default {
  inputs: {
    uppy: createInput(Uppy, {
      props: [
        "hideUploadButton",
        "allowedFileTypes",
        "maxNumberOfFiles",
        "maxFileSize",
        "minNumberOfFiles",
        "height"
      ],
    }),
  },
};
