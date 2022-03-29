<template>
  <div class="container">
    <h1 class="text-center text-2xl pt-20">
      Submit Your Information And Wait For Notification <br> Once a new Missing
      Document Is submitted
    </h1>
    <section
      class="bg-white dark:bg-gray-900 rounded-lg w-full py-4 my-4 md:my-10"
    >
      <div class="max-w-2xl mx-auto">
        <div>
          <select
            v-model="info.type"
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
            <option :value="null" disabled>Select document name</option>
            <option class="op" value="ID Card">ID Card</option>
            <option class="op" value="Birth Certificate">
              Birth Certificate
            </option>
            <option class="op" value="Others">Others</option>
            <option class="op" value="Others">Passport Card</option>
          </select>
        </div>

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
          required
          v-model="info.email"
          type="email"
          name="email"
          placeholder="email"
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
        <button
          type="button"
          @click.prevent="uploadFile"
          class="button primary"
        >
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
        location: null,
      },
    };
  },

  methods: {
    uploadFile() {
      let global = this;
      axios.post(`${config.api_route}/post`, this.info).then(() => {
        global.$router.push({ name: "post-success" });
      });
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