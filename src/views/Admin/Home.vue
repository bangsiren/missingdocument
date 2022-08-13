<template>
  <div class="container">

<div class="flex items-center justify-between">

      <h1 class="text-xl font-bold">Administrator</h1>
      <form action="">
        
      <button @click="logout" class="button block  primary ml-auto max-w-xs text-xs">
          Logout
      </button>
      </form>
</div>
    <section class="bg-white dark:bg-black w-full py-4 my-8 md:my-16">
      <div
        class="
          flex flex-wrap
          md:flex-nowrap
          max-w-5xl
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
        class="dark:bg-gray-900 dark:bg-opacity-90 mb-3 rounded-lg shadow-lg"
      >
        <figure class="images-section h-64 overflow-hidden w-full">
          <img
            v-if="document.files.length > 0"
            class="images"
            :src="document.files[0].path"
            :alt="document.title"
            @click="claim(document._id)"
          />
        </figure>

        <div class="w-full p-4">
          <span class="bg-primary text-white text-xs p-1 px-2 rounded-full">
            {{ document.type }}
          </span>
          <h3 class="text-lg relative mb-3">
            {{ "ID No" + document.number + " with name " + document.name }}
          </h3>

          <div class="space-y-3">
            <div class="mb-3">
              Uploaded
              <span class="text-primary">
                {{ new Date(document.updatedAt).toLocaleString() }}</span
              >
              by
              <span class="text-primary"> {{ document.f_name }} </span>
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

            <div>
              <span
                class="bg-red-500 text-xs px-2 py-1 text-white"
                @click="deleteDoc(document._id)"
              >
                Delete it.
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { debounce } from "lodash";

import config from "@/config";

export default {
  data() {
    return {
      documents: [],
      form: { search: "" },
    };
  },
  methods: {
    fetchData: debounce(function () {
      axios.get(config.api_route, { params: this.form }).then((response) => {
        this.documents = response.data;
      });
    }, 100),

    logout(){
        localStorage.removeItem('jwt');

        this.$router.push('/admin/login');
    },

    deleteDoc(id) {
      if (window.confirm("Are you sure you want to deleted?")) {
        axios
          .delete(config.api_route + "/admin/documents/" + id, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          })
          .then(() => {
            this.fetchData();
          });
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
