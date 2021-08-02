<template>
  <div class="container">
    <section
      class="bg-white dark:bg-gray-900 rounded-lg w-full py-4 my-8 md:my-16"
    >
      <div class="max-w-5xl mx-auto">
        <stepper @submitted="submitData" v-model="form" :steps="steps" />
      </div>
    </section>
  </div>
</template>
 

 <script>
  import Stepper from "@/components/Stepper";
  import One from "@/components/Steps/One";
  import Two from "@/components/Steps/Two";
  import axios from "axios";
  import config from "@/config";

  export default {
    components: {
      Stepper,
    },

    methods: {
      submitData() {
        let self = this;
        axios.post(config.api_route, this.form).then(() => {
          self.$notify({
            title: "Saved",
            type: "success",
            text: "Document saved succesfully",
          });

          return self.$router.push("/");
        });
      },
    },

    data: () => ({
      form: {},
      steps: [
        {
          name: "Ingresar datos del Auto",
          desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          icon: "fas fa-car",
          disabled: false,
          active: true,
          component: One,
        },
        {
          name: "Paso 2",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          disabled: false,
          active: false,
          component: Two,
        },
      ],
    }),
  };
</script>