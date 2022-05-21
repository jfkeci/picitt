import Message from "../components/Message";
import _ from "lodash";

export default {
  components: {
    Message,
  },
  methods: {
    setMessage(message, type) {
      if (!type) {
        type = "success";
      }
      let newMessage = { text: message, type: type };
      this.$store.commit("setMessage", newMessage);
    },
    emitMessage(message, type) {
      if (!type) {
        type = "success";
      }
      let newMessage = { text: message, type: type };
      this.$emit("emit-message", newMessage);
    },
  },
  watch: {
    message: {
      handler: _.debounce(function () {
        this.$store.commit("resetMessage");
      }, 5000),
      deep: true,
    },
  },
};
