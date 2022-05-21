<template>
  <div class="my-5 mx-5">
    <div v-html="html"></div>
  </div>
</template>

<script>
import readmePath from "../../README.md";

import { marked } from "marked";
export default {
  name: "Home",
  components: {},
  data: () => ({
    markdown: "# Picture gallery",
  }),
  computed: {
    html() {
      return marked(readmePath);
    },
  },
};
</script>
