<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            class="form-control mb-5"
            placeholder="Email"
            v-model="login.email"
            required
          />

          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-5"
            placeholder="Password"
            v-model="login.password"
            required
          />

          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>

          <!-- Sign in button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Sign in
            </button>
          </center>
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
