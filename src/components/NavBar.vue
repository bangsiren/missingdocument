<template>


  <header
    class="
      bg-white
      dark:bg-black
      bg-opacity-90
      backdrop-filter backdrop-blur-sm
      sticky
      top-0
    "
  >
    <div
      class="
        flex flex-wrap
        md:flex-nowrap
        items-center
        py-2
        md:py-2
        lg:py-3
        xl:py-4
        mb:3
        :md-5
        :mb-8
        justify-between
        container
        mx-auto
      "
    >
      <div class="py-4 md:py-0 md:w-50 flex items-center space-x-5">
        <router-link to="/" class="w-full">
          <logo class="h-10 text-primary md:h-16" />
        </router-link>
        <router-link router-link-active="active" to="/security" class="text-primary changetx navlink">How_It_Works </router-link>
         <router-link router-link-active="active" to="/post" class="text-primary changetx navlink"> Missing_Request </router-link>
      </div>
      <nav class="md:space-x-2 md:w-auto flex justify-between w-full">
        <router-link to="/upload-document" class="btn button primary"
          >Upload Document
        </router-link>

        <button
          @click="toggleTheme"
          class="button btn outline white"
        >
         Display
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
  import Logo from "./Logo";
  export default {
    methods: {
      toggleTheme() {
        if (localStorage?.theme == "dark") {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          localStorage.theme = "light";
        } else {
          document.documentElement.classList.add("dark");
          document.documentElement.classList.remove("light");
          localStorage.theme = "dark";
        }
      },
    },

    components: {
      Logo,
    },
  };
</script>

<style scoped>

.navlink {
  font-weight: 900;
  text-decoration-color: rgb(18, 158, 158);
  text-decoration-thickness: 1px;
  padding: 7px;
  border: 1px solid rgb(9, 54, 94);
  border-radius: 5px;
}
.navlink:hover {
  font-weight: 900;
  text-decoration: underline;
  text-decoration-color: rgb(14, 81, 81);
  text-decoration-thickness: 2px;
  -moz-text-decoration-line: unset;
  text-decoration-style: dotted;
  text-underline-position: above;

}
.active {
   padding: 7px;
  border: 1px solid rgb(192, 27, 32);
  border-radius: 5px;
}
   .btn {
   position:relative;
   -webkit-animation:glide 3s ease-in-out alternate infinite;
}


@media only screen and (max-width: 388px) {
 .button.primary {
    font-size: 12px;
    --tw-bg-opacity: 1;
    background-color: rgba(130, 130, 232, var(--tw-bg-opacity));
    --tw-border-opacity: 1;
    border-color: rgba(130, 130, 232, var(--tw-border-opacity));
    border-width: 2px;
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
   }
   .button.outline {
    font-size: 14px;
    --tw-border-opacity: 1;
    border-color: rgba(130, 130, 232, var(--tw-border-opacity));
    border-width: 2px;
    --tw-text-opacity: 1;
    color: rgba(130, 130, 232, var(--tw-text-opacity));
   }

}
@media only screen and (max-width: 360px) {
   .changetx {
     font-size: 13px;
   
   }
}


</style>
