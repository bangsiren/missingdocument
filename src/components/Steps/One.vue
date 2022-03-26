<template>
  <div>
    <div>
      <select
        @change="toggleShowIdInput"
        v-model="form.type"
        class="
          w-full
          dark:bg-transparent
          rounded-lg
          outline-none
          p-4
          ml-2
          mb-4
          mt-4
        "
      >
        <option value="Select document type"></option>
        <option class="op" value="ID Card">ID Card</option>
        <option class="op" value="Birth Certificate">Birth Certificate</option>
        <option class="op" value="Others">Others</option>
        <option class="op" value="Others">Passport Card</option>
      </select>
    </div>
    <input
      type="number"
      v-model="form.number"
      v-if="showIdInput"
      name="number"
      placeholder="ID Number"
      class="
        w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4
      "
    />
    <input
      required
      name="datetime"
      v-model="form.dateTime"
      type="datetime-local"
      placeholder="Date of view"
      class="
        w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4
      "
    />
    <input
      required
      name="name"
      type="text"
      v-model="form.name"
      placeholder="Name on it"
      class="
        w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4
      "
    />
    <div class="border border-dashed mx-2 mt-4 mb-6 rounded-lg">
      <input
        @change="handleFileChange"
        type="file"
        ref="file"
        id="file"
        class="cursor-pointer hidden"
      />
      <ul class="flex space-x-2 p-8">
        <li v-for="file in form.files" :key="file.name">
          <img :src="file.path"  alt="" class="w-1/3">
        </li>
      </ul>
      <label v-if="form.files.length == 0"
        for="file"
        class="
          bg-blue-100
          dark:bg-transparent
          border-primary
          text-center
          w-full
          h-40
          p-10
          z-50
          block
          top-0
          right-0
          left-0
          m-auto
        "
        :class="[{'opacity-20': uploading}]"
      >
        <button
          type="button"
          @click="$refs.file.click()"
          class="button block mt-2 primary mx-auto max-w-xs text-xs"
        >
          Upload Picture Here
        </button>
        <small class="3">Or Select image on your device</small>
      </label>

     <div class="text-center" v-if="uploading">
       Uploading
     </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  emits: ["change"],
  data() {
    return {
      form: { files: [] },
      file: null,
      uploading: false,
      showIdInput: false,
    };
  },

  methods: {
    toggleShowIdInput() {
      if (this.form.type == "ID Card") {
        this.showIdInput = true;
      } else {
        this.showIdInput = false;
      }
    },
    uploadFile() {
      if (!this.file) {
        return;
      }

      this.uploading = true;

      let formData = new FormData();

      formData.append("file", this.file);
      formData.append("name", this.file?.name);

      axios
        .post(config.api_route + "/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.form.files.push(response.data);
          this.file = null;
        })
        .catch(function () {})
        .finally(() => {
          this.uploading = false;
        });
    },
    handleFileChange() {
      this.file = this.$refs.file.files[0];
      this.uploadFile();
    },
  },

  watch: {
    form: {
      handler(newForm) {
        this.$emit("change", newForm);
      },
      deep: true,
    },
  },
};
</script>
<style lang="css">
.op {
  background-color: white;
  color: black;
}
</style>