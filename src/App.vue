<template>
  <div>
    <notifications />
    <nav-bar class="mb-5" />
    <router-view />
  </div>
</template>



<script>
  import NavBar from "@/components/NavBar";
  export default {
    components: {
      NavBar,
    },
  };
</script>

<style >
body {
  background-image: url(./assets/id_bg.svg);
  background-position-y: center;
  background-size: auto 60%;
  @apply min-h-screen bg-no-repeat;
}
</style>