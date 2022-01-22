<template>
<div class="container">
    <h1 class="text-center text-2xl pt-20">Submit Your Information And Wait For Notification Once a new Missing Document Is submitted </h1>
    <section
      class="bg-white dark:bg-gray-900 rounded-lg w-full py-4 my-8 md:my-16"
    >
      <div class="max-w-2xl mx-auto">
          <input
      v-model="info.type"
      type="text"
      required
      name="type"
      placeholder="Type of document"
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
         v-model="info.name"
      required
      name="name"
      type="text"
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
        <input
      v-model="info.location"
      required
      name="location"
      type="text"
      placeholder="Location"
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
      v-model="info.email"
      type="email"
      name="email"
      placeholder="email"
      class="  w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4"
    />
      <button type="button" @click.prevent="uploadFile"  class="button primary">
        Submit
      </button>
      </div>
    </section>
  </div>
</template>
<script>
    import axios from "axios";
    import config from "@/config";
   // import config from "@/config";
  export default {
    data: () => {
      return {
        info: {
          type: null,
          name: null,
          email: null,
          location: null
        },
      };
    },
  
    methods: {
      uploadFile() {
        let global = this;
        axios.post(`${config.api_route}/post`, this.info).then(() => {
          console.log("Response Came");
          
          this.info.type = "";
          this.info.name = "";
          this.info.email = "",
          this.info.location = "";
          global.$router.push("/");
        });
      },
    },
    
  };
</script>