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
        <!-- <custom-select class="w-full md:w-72"> </custom-select> -->
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

    <section
      class="
        grid
        md:grid-cols-3
        lg:grid-cols-4
        gap-4
        animate__animated
        zoom-in-down
      "
    >
      <article
        v-for="document in documents"
        :key="document._id"
        class="dark:bg-gray-900 dark:bg-opacity-90 mb-3 rounded-lg shadow-lg"
      >
        <figure class="images-section h-64 overflow-hidden w-full">
          <vue-load-image v-if="document.files.length > 0">
            <template v-slot:image>
              <img
                class="images"
                :src="document.files[0].path"
                :alt="document.title"
                @click="claim(document._id, document.name, document.f_number)"
              />
            </template>
            <template v-slot:preloader>

              <span class="text-sm text-center">
                Loading
              </span>
              
            </template>
            <template v-slot:error>Image load fails</template>
          </vue-load-image>
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
            <!-- <p>
              Contact through:
              <small class="text-primary">{{ document.f_number }}</small>
            </p> -->

            <div v-if="!document.claimAt">
              <button @click="claim(document._id, document.name, document.f_number)" class="text-primary">
                Claim it
              </button>
            </div>

            <div v-else>
              <span class="bg-green-500 text-xs px-2 py-1 text-white">
                Claimed
              </span>
            </div>
          </div>
        </div>
      </article>
      <claim-it-modal v-model="showModal" @submitted="confirmClaim" />
    </section>
  </div>
</template>



<script>
import { debounce } from "lodash";
// import CustomSelect from "@/components/CustomSelect";
import axios from "axios";
import config from "@/config";
import ClaimItModal from "../components/ClaimItModal.vue";
import VueLoadImage from "vue-load-image";
export default {
  components: {
    // CustomSelect,
    ClaimItModal,
    "vue-load-image": VueLoadImage,
  },

  data() {
    return {
      showModal: false,
      form: { search: "" },
      documents: [],
      selected: null,
      claimData: {founderName: null, founderPhone: null, claimerName: null, claimerPhone: null}
    };
  },


  methods: {
    claim(id, name, phone) {
      this.selected = id;
      this.showModal = true;
      this.claimData.founderName = name;
      this.claimData.founderPhone = phone;
    },

    confirmClaim(phone, name) {
      console.log("Claimer Info Below");
      console.log(phone);
      console.log(name);
      this.claimData.claimerPhone = phone;
      this.claimData.claimerName = name;

      axios.post(config.api_route + "/claim", this.claimData).then(() => {
        alert("Request Submited We'll Get Back To You");
      })
        let self = this;
        axios.put(config.api_route + "/claim/" + this.selected).then(() => {
          self.fetchData();
        });
      
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


  watch: {
    "form.search"() {
      this.fetchData();
    },
  },
};
</script>
<style lang="css">
article {
  cursor: pointer;
}
.images-section:hover {
  position: relative;
  -webkit-animation: glide 2s ease-in-out alternate infinite;
}

@-webkit-keyframes glide {
  from {
    left: 0px;
    top: 0px;
  }

  to {
    left: 0px;
    top: 20px;
  }
}
</style>
