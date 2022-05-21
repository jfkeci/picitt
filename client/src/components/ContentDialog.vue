<template>
  <div>
    <Comments v-if="action == 'show-comments'" />
    <Login v-if="action == 'login'" />
    <Register v-if="action == 'register'" />
    <Create v-if="action == 'create'" />
    <Delete v-if="action == 'delete-post' || action == 'delete-comment'" />
    <Update v-if="action == 'update'" />
  </div>
</template>

<script>
import Login from "./forms/Login";
import Register from "./forms/Register";
import Create from "./forms/Create";
import Delete from "./forms/Delete";
import Update from "./forms/Update";
import Comments from "./comments/Comments";
export default {
  name: "ContentDialog",
  components: {
    Login,
    Register,
    Comments,
    Create,
    Delete,
    Update,
  },
  computed: {
    action() {
      return this.$store.getters.getAction;
    },
  },
};
</script>