<template>
  <div>
    <v-card
      v-if="post"
      class="mx-auto my-5"
      elevation="4"
      outlined
      shaped
      max-width="350"
      :hover="true"
    >
      <v-img
        class="white--text align-end"
        height="300px"
        :src="$apiUrl + post.selectedFile"
      >
      </v-img>

      <v-card-text class="text--primary mt-2">
        <h3 class="my-3">{{ post.title }}</h3>

        <div class="my-3">Description: {{ post.body }}</div>
      </v-card-text>
      <pre></pre>
      <v-card-actions>
        <v-btn color="orange" text @click="toggleLike">
          <v-icon v-if="!isLiked">mdi-thumb-up-outline</v-icon>
          <v-icon v-if="isLiked">mdi-thumb-down-outline</v-icon>
          <span>{{ likeCount }}</span>
        </v-btn>

        <v-divider class="mx-4"></v-divider>
        <v-btn v-if="canEdit" color="orange" text @click="promptDelete">
          Delete
        </v-btn>
        <v-btn v-if="canEdit" color="orange" text @click="promptUpdate">
          Edit
        </v-btn>
        <v-btn color="orange" text @click="showPost"> Show </v-btn>
        <v-divider class="mx-4"></v-divider>
      </v-card-actions>
      <br />
      <br />
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  methods: {
    toggleLike() {
      if (!this.$store.getters.isLoggedIn) {
        this.promptLogin();
      } else {
        if (this.isLiked) {
          let index = this.post.likes.indexOf(this.user);
          this.post.likes = this.post.likes.splice(index, 1);
        } else {
          this.post.likes.push(this.user);
        }
        this.$store.dispatch("toggleLike", this.post);
      }
    },
    promptDelete() {
      if (!this.$store.getters.isLoggedIn) {
        this.promptLogin();
      } else {
        this.$store.commit("setAction", "delete-post");
        this.$store.commit("setDialogPost", this.post);
        this.$store.commit("showDialog");
      }
    },
    promptUpdate() {
      if (!this.$store.getters.isLoggedIn) {
        this.promptLogin();
      } else {
        this.$store.commit("setAction", "update");
        this.$store.commit("setDialogPost", this.post);
        this.$store.commit("showDialog");
      }
    },
    showPost() {
      if (!this.$store.getters.isLoggedIn) {
        this.promptLogin();
      } else {
        if (this.$route.params.id != this.post._id) {
          this.$store.commit("setCurrentPost", this.post);
          this.$router.push({ name: "Single", params: { id: this.post._id } });
        }
      }
    },
    promptLogin() {
      this.$store.commit("setAction", "login");
      this.$store.commit("showDialog");
    },
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    user() {
      return this.$store.getters.getUser;
    },
    isLiked() {
      return this.post.likes.includes(this.user);
    },
    likeCount() {
      return this.post.likes.length;
    },
    canEdit() {
      return this.$store.getters.getUser == this.post.createdBy;
    },
  },
};
</script>