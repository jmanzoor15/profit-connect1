import { createInput } from "@formkit/vue";
import Uppy from "@/components/formkit/Uppy.vue";
import Multiselect from "@/components/formkit/Multiselect.vue";
import Switch from "@/components/formkit/Switch.vue";

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
        "height",
      ],
    }),
    multiselect: createInput(Multiselect, {
      props: ["openDirection", "options", "mode", "placeholder", "searchable","hideSelected"],
    }),
    switch: createInput(Switch, {
      props: [],
    }),
  },
};
