<template>
  <div>
    <v-toolbar class="indigo lighten-1 white--text px-5">
      <v-form ref="form" class="mx-2 my-2">
        <v-text-field v-model="filter" label="Search" required></v-text-field>
      </v-form>
    </v-toolbar>
    <div style="max-height: 130vh; overflow-y: auto; overflow-x: hidden">
      <input type="text" />
      <div class="my-5" v-if="hasPosts">
        <Post v-for="post in posts" :key="post._id" :post="post" />
      </div>
      <div class="my-5" v-if="!hasPosts">No posts</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Post from "./Posts/Post";
export default {
  name: "SearchBar",
  components: { Post },
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    getItems() {
      this.$store.dispatch("searchPosts", this.filter);
    },
  },
  created() {
    this.getItems();
  },
  watch: {
    filter: _.debounce(function () {
      this.getItems();
    }, 500),
  },
  computed: {
    loading() {
      return this.$store.getters.getPostsLoading;
    },
    posts() {
      return this.$store.getters.getSearchResults;
    },
    hasPosts() {
      return this.posts.length > 0;
    },
  },
};
</script>