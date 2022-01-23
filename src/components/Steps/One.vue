<template>
  <div>
       <div>
           <select   v-model="form.type"  class="
        w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4
      ">  
            <option value="" disabled selected>Select Document Type</option>
            <option class="op" value="ID Card">ID Card</option>
            <option class="op"  value="Birth Certificate">Birth Certificate</option>
            <option class="op"  value="Others">Others</option>
          </select>
        </div>
    <input
      type="number"
      v-model="form.number"
      required
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
      <ul>
        <li v-for="file in form.files" :key="file.name">
          {{ file.name }}
        </li>
      </ul>
      <label
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

      <button type="button" @click="uploadFile" v-if="file">Upload</button>
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
      };
    },

    methods: {
      uploadFile() {
        if (!this.file) {
          return;
        }

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
          .catch(function () {});
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