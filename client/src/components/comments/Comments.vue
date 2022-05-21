<template>
  <v-card-text>
    <div v-if="comments">
      <div class="font-weight-bold ml-8 mb-2">Comments</div>

      <v-timeline align-top dense v-if="hasComments">
        <v-timeline-item
          v-for="item in comments"
          :key="item._id"
          color="deep-purple lighten-1"
          small
        >
          <div>
            <div class="font-weight-normal">
              <strong>{{ item.createdUsername }}</strong>
              @{{ item.createdAt }}
            </div>
            <div>{{ item.text }}</div>
            <div v-if="item.createdBy == user">
              <v-btn class="mx-2" @click="editComment(item)">Update</v-btn>
              <v-btn class="mx-2" @click="deletePrompt(item)">Delete</v-btn>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <v-timeline align-top dense v-if="!hasComments">
        <v-timeline-item color="deep-purple lighten-1" small>
          <div>
            <div class="font-weight-normal">
              <strong>Leave a comment</strong>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
    <div>
      <v-divider class="my-3 mx-3"></v-divider>
      <v-text-field
        v-model="comment"
        :counter="250"
        :rules="commentRules"
        label="Comment"
        required
      ></v-text-field>
      <v-divider class="my-3"></v-divider>
      <v-btn v-if="!editing" @click="addNewComment">Comment</v-btn>
      <v-btn v-if="editing" @click="updateComment">Update</v-btn>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: "Comments",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    comments() {
      return this.post.comments;
    },
    hasComments() {
      return this.comments.length > 0;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  data: () => ({
    comment: "New comment,",
    commentRules: [
      (v) => (v && v.length > 2) || "Write something",
      (v) =>
        (v && v.length <= 250) || "Comment must be less than 250 characters",
    ],
    editing: false,
    commentToEdit: null,
  }),
  methods: {
    createdByYou(item) {
      return item.createdBy == this.user;
    },
    addNewComment() {
      if (this.comment.length < 2) return;

      this.$store.commit("setLoading", true);
      let newComment = {
        postId: this.post._id,
        text: this.comment,
        createdBy: this.$store.getters.getUser,
      };
      this.$store.dispatch("commentPost", newComment);
      this.comment = "";
    },
    deletePrompt(comment) {
      comment["postId"] = this.post._id;
      this.$store.commit("setDialogComment", comment);
      this.$store.commit("setAction", "delete-comment");
      this.$store.commit("showDialog");
    },
    editComment(comment) {
      comment["postId"] = this.post._id;
      this.commentToEdit = comment;
      this.comment = this.commentToEdit.text;
      this.editing = true;
    },
    updateComment() {
      this.commentToEdit.text = this.comment;
      this.$store.dispatch("updateComment", this.commentToEdit);
      this.comment = "";
      this.editing = false;
    },
  },
};
</script>