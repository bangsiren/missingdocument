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
      <div class="py-4 md:py-0 flex items-center space-x-3">
        <router-link to="/" class="w-full">
          <logo class="h-10 text-primary md:h-16" />
        </router-link>
        <router-link to="/security" class="text-primary"> Security </router-link>
        <router-link to="/donations" class="text-primary"> Donations </router-link>
      </div>
      <nav class="md:space-x-4 md:w-auto flex justify-between w-full">
        <router-link to="/upload-document" class="button primary"
          >Upload Document
        </router-link>

        <button
          @click="toggleTheme"
          class="border-none outline-none focus:outline-none"
        >
          <ion-icon name="contrast-outline"></ion-icon>
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
