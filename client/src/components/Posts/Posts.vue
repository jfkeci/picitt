<template>
  <div style="max-height: 130vh; overflow-y: auto; overflow-x: hidden">
    <input type="text" />
    <Post v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>

<script>
import Post from "./Post";
export default {
  components: { Post },
  name: "Posts",
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },
    post() {
      return this.$store.getters.getCurrentPost;
    },
  },
};
</script>