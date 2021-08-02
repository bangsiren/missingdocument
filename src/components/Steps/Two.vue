<template>
  <div>
    <div class=""></div>
    <input
      type="text"
      v-model="form.f_name"
      placeholder="Name"
      autocomplete="name"
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
      autocomplete="tel"
      type="number"
      v-model="form.f_number"
      placeholder="number"
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
      type="email"
      v-model="form.f_email"
      autocomplete="email"
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
    <input
      type="text"
      v-model="form.address"
      autocomplete="address"
      placeholder="Address"
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
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        form: {},
      };
    },

    emits: ["change"],
    watch: {
      form: {
        handler(newForm) {
          this.$emit("change", newForm);
        },
        deep: true,
      },
    },
  };
</script>