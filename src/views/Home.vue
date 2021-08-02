<template>
  <div class="container">
    <section class="bg-white dark:bg-black w-full py-4 my-8 md:my-16">
      <div
        class="
          flex flex-wrap
          md:flex-nowrap
          max-w-5xl
          mx-auto
          space-y-2
          md:space-y-0 md:space-x-3
        "
      >
        <input
          type="search"
          v-model="form.search"
          class="w-full dark:bg-transparent rounded-lg outline-none"
          placeholder="Search for Document by name, id number"
        />
        <custom-select class="w-full md:w-72"> </custom-select>
        <!-- <custom-select class="w-full md:w-72"> </custom-select> -->

        <button
          class="
            mx-auto
            md:w-auto
            button
            primary
            flex
            items-center
            justify-between
            space-x-1
          "
        >
          <span> Search </span> <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
    </section>

    <section class="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      <article
        v-for="document in documents"
        :key="document._id"
        class="
          bg-white
          dark:bg-gray-900 dark:bg-opacity-90
          mb-3
          rounded-lg
          shadow-lg
        "
      >
        <figure class="w-full">
          <img
            v-if="document.files.length > 0"
            class=""
            :src="'//localhost:3000/' + document.files[0].path"
            :alt="document.title"
          />
        </figure>

        <div class="w-full p-4">
          <span class="bg-primary text-white text-xs p-1 px-2 rounded-full">
            {{ document.type }}
          </span>
          <h3 class="text-lg relative mb-3">
            {{ "ID No" + document.number + " with name " + document.f_name }}
          </h3>

          <div class="space-y-3">
            <div class="mb-3">
              Uploaded
              <span class="text-primary">
                {{ new Date(document.updatedAt).toLocaleString() }}</span
              >
              by
              <span class="text-primary"> {{ document.name }} </span>
              <br />
              Found on the
              <span class="text-primary">
                {{ new Date(document.dateTime).toLocaleString() }}
              </span>
              at
              <span class="text-primary"> {{ document.address }} </span>
            </div>

            <p v-html="document.description"></p>
            <p>
              Contact through:
              <small class="text-primary">{{ document.f_number }}</small>
            </p>

            <div v-if="!document.claimAt">
              <button @click="claim(document._id)">Claim it</button>
            </div>

            <div v-else>
              <span class="bg-green-500 text-xs px-2 py-1 text-white">
                Claimed
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>



<script>
  import { debounce } from "lodash";
  import CustomSelect from "@/components/CustomSelect";
  import axios from "axios";
  import config from "@/config";

  export default {
    components: {
      CustomSelect,
    },

    methods: {
      claim(id) {
        if (
          window.confirm("Please confirm that you're the owner of the document. ")
        ) {
          let self = this;
          axios.put(config.api_route + "/claim/" + id).then(() => {
            self.fetchData();
          });
        }
      },
      fetchData: debounce(function () {
        axios.get(config.api_route, { params: this.form }).then((response) => {
          this.documents = response.data;
        });
      }, 100),
    },
    mounted() {
      this.fetchData();
    },

    data() {
      return {
        form: { search: "" },
        documents: [],
      };
    },

    watch: {
      "form.search"() {
        this.fetchData();
      },
    },
  };
</script>
