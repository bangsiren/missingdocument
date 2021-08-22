<template>
  <div
    class="
      max-w-4xl
      mx-auto
      my-4
      bg-white
      dark:bg-gray-900
      rounded-lg 
      shadow-md
      p-4
    "
  >
    <div class="flex space-x-2 justify-between items-center pb-3">
      <template v-for="(step, key) in steps" :key="step.name">
        <div class="w-10 h-10">
          <div
            class="w-10 h-10 mx-auto rounded-full text-lg flex items-center"
            :class="{
              'bg-primary text-white': key <= current_step,
              'bg-white dark:bg-gray-900  border-2': !(key <= current_step),
            }"
          >
            <span class="text-center w-full">{{ key + 1 }}</span>
          </div>
        </div>
        <div class="px-2 text-xl w-1/3" v-show="current_step == key">
          {{ step.name }}
        </div>

        <div
          v-if="key + 1 != steps.length"
          class="
            w-full
            align-center
            items-center
            align-middle
            content-center
            flex
          "
        >
          <div class="rounded items-center align-middle align-center flex-1">
            <div
              :class="[
                { ' bg-primary w-full': key < current_step },
                { 'bg-gray-500': !(key < current_step) },
              ]"
              class="
                text-xs
                leading-none
                py-1
                text-center text-grey-darkest
                rounded
              "
              style="width: 100%"
            ></div>
          </div>
        </div>
      </template>
    </div>

    <main>
      <template v-for="(step, key) in steps" :key="step.name + 'body'">
        <component
          @change="mergeData"
          v-show="key == current_step"
          :is="step.component"
        ></component>
      </template>
    </main>

    <footer class="space-x-2 flex items-center justify-between">
      <button
        :disabled="current_step < 1"
        class="button outline"
        @click="current_step = current_step - 1"
      >
        Back
      </button>
      <button
        v-if="!current_step == steps.length - 1"
        class="button primary"
        @click="current_step = current_step + 1"
      >
        Next
      </button>
      <button v-else class="button primary" @click="$emit('submitted')">
        Save
      </button>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        current_step: 0,
      };
    },
    methods: {
      mergeData(data) {
        this.$emit("update:modelValue", { ...this.modelValue, ...data });
      },
    },
    props: {
      modelValue: {
        type: Object,
        default: () => {},
      },
      steps: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>