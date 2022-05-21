import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import posts from "./posts";
import auth from "./auth";

export default new Vuex.Store({
  modules: {
    posts,
    auth,
  },
  state: {
    message: false,
    action: "show",
    loading: false,
    dialog: false,
    dialogComment: null,
  },
  mutations: {
    setMessage(state, message) {
      state.message = {
        text: message.text,
        type: message.type,
      };
    },
    resetMessage(state) {
      state.message = null;
    },
    setAction(state, action) {
      state.action = action;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    showDialog(state) {
      state.dialog = true;
    },
    hideDialog(state) {
      state.dialog = false;
    },
    setDialogState(state, value) {
      state.dialog = value;
    },
    setDialogComment(state, comment) {
      state.dialogComment = comment;
    },
  },
  getters: {
    getMessage: (state) => state.message,
    getAction: (state) => state.action,
    getLoading: (state) => state.loading,
    getDialogState: (state) => state.dialog,
    getDialogComment: (state) => state.dialogComment,
  },
});
