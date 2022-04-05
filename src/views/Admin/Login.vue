<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
           class="max-w-lg mx-auto"
          style="margin-top: 70px; height: auto; padding-top: 100px !important"
          @submit.prevent="loginUser"
        >
          <div>
            <span class="wrong" v-if="loginError">Wrong Password or Email</span>
            <input
              type="text"
              id="email"
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
              placeholder="Email"
              v-model="login.email"
              required
            />
          </div>

          <div>
            <!-- Password -->
            <input
              type="password"
              id="password"
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
              placeholder="Password"
              v-model="login.password"
              required
            />
          </div>

          <!-- <p class="py-4 pl-2">
            Dont have an account? <router-link class="text-primary" to="/register"
              >click here</router-link
            >
          </p> -->

          <!-- Sign in button -->
   
            <button class="button block mt-2 primary ml-auto max-w-xs text-xs" type="submit">
              Sign in
            </button>
        
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  data() {
    return {
      loginError: false,
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      console.log(config.api_route + "/admin/login");
      try {
        axios
          .post(config.api_route + "/admin/login", this.login)
          .then(({ data }) => {
            localStorage.setItem("jwt", data.token);

            if (data.token) this.$router.push("/admin");
          })
          .catch((err) => {
            this.loginError = true;
            console.log(err);
          });
      } catch (err) {
        console.log("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    },
  },
};
</script>
<style scoped>
 .wrong {
   color: red;
 }
</style>