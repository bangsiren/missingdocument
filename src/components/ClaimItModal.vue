<template>
  <!-- <div class="fixed inset-0 flex items-center justify-center"> -->
  <!-- <button
      type="button"
      @click="openModal"
      class="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open dialog
    </button>
  </div> -->
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="
            min-h-screen
            bg-white
            dark:bg-black dark:bg-opacity-25
            bg-opacity-25
            backdrop-filter backdrop-blur-sm
            px-4
            text-center
          "
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <form
              @submit.prevent="claimItem"
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Claim Lost items
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  To minimize spamming, please input the finder number
                </p>
              </div>

              <div class="my-3">
                <input
                  v-model="phone"
                  required
                  class="text-gray-500 border rounded-md p-2 w-full"
                  placeholder="Finder Number"
                />
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="submit"
                  class="
                    inline-flex
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    border border-transparent
                    rounded-md
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500
                  "
                >
                  Claim it
                </button>
              </div>
            </form>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
  import { ref } from "vue";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  } from "@headlessui/vue";

  export default {
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogOverlay,
      DialogTitle,
    },

    props: {
      modelValue: Boolean,
    },

    emits: ["update:modelValue"],

    setup(props, { emit }) {
      const phone = ref("");

      return {
        phone,

        closeModal() {
          emit("update:modelValue", false);
        },

        openModal() {
          emit("update:modelValue", true);
        },

        claimItem() {
          emit("update:modelValue", false);
          emit("submitted", phone.value);
        },
      };
    },
  };
</script>
