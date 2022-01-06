<template>
<div class="container">
    <h1 class="text-center text-2xl pt-20">Submit Your Information And Wait For Notification Once a new Missing Document Is submitted </h1>
    <section
      class="bg-white dark:bg-gray-900 rounded-lg w-full py-4 my-8 md:my-16"
    >
      <div class="max-w-2xl mx-auto">
          <input
      type="text"
      required
      name="type"
      placeholder="Type of document"
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
      required
      name="name"
      type="text"
      placeholder="Name on it"
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
      required
      name="name"
      type="text"
      placeholder="Location"
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
      placeholder="email"
      class="  w-full
        dark:bg-transparent
        rounded-lg
        outline-none
        p-4
        ml-2
        mb-4
        mt-4"
    />
      <button  class="button primary">
        Submit
      </button>
      </div>
    </section>
  </div>
</template>
