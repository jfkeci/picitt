<template>
  <v-card v-if="post || comment">
    <v-img
      height="200px"
      :src="
        action == 'delete-post'
          ? $apiUrl + post.selectedFile
          : 'https://picsum.photos/1500/1500'
      "
    >
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="text-h6 white--text pl-0">
          Delete {{ action == "delete-post" ? "post" : "comment" }}
        </v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
    </v-img>
    <v-card-text v-if="action == 'delete-post'">
      <h3>Are you sure you want to delete this post?</h3>
    </v-card-text>
    <v-card-text v-if="action == 'delete-comment'">
      <h3>Are you sure you want to delete this comment?</h3>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$store.commit('hideDialog')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="removeIt"> Delete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Delete",
  computed: {
    post() {
      return this.$store.getters.getDialogPost;
    },
    comment() {
      return this.$store.getters.getDialogComment;
    },
    action() {
      return this.$store.getters.getAction;
    },
  },
  methods: {
    removeIt() {
      switch (this.action) {
        case "delete-post":
          if (this.post) {
            this.$store.dispatch("deletePost", this.post._id);
          }
          break;
        case "delete-comment":
          if (this.comment) {
            this.$store.dispatch("deleteComment", this.comment);
          }
          break;
      }
    },
  },
};
</script>